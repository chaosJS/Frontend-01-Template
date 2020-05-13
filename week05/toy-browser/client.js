// 模拟浏览器的实现

// 引入net包
const net = require('net')
// const client = net.createConnection({ port: 8787, host: '127.0.0.1' }, () => {
//   // 'connect' listener.
//   console.log('connected to server!')

//   const request = new Request({
//     method: 'POST',
//     host: '127.0.0.1',
//     port: 8787,
//     headers: {
//       'X-Foo2': 'bar2'
//     },
//     body: { age: 18 }
//   })
//   // console.log(request.toString())
//   client.write(request.toString())
// })
// client.on('data', data => {
//   console.log('data---', data.toString())
//   client.end()
// })
// client.on('end', () => {
//   console.log('disconnected from server')
// })
class Request {
  constructor(options) {
    this.method = options.method || 'GET'
    this.host = options.host
    this.path = options.path || '/'
    this.port = options.port || 80
    this.body = options.body || {}
    this.headers = options.headers || {}
    // 兜底Content-Type 类型
    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    // 支持 application/json 类型 把body的东西 JSON.stringify
    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    }
    // 支持application/x-www-form-urlencoded 类型 把body对象parse 成 字符串
    if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.keys(this.body)
        .map(key => {
          return `${key}=${encodeURIComponent(this.body[key])}`
        })
        .join('&')
    }
    // 计算Content-Length
    this.headers['Content-Length'] = this.bodyText.length
  }

  // 重写toString()方法 返回http协议的主要内容
  toString() {
    // \r 后的要紧跟着写，否则报错
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers)
  .map(key => {
    return `${key}: ${this.headers[key]}`
  })
  .join('\r\n')}
\r
${this.bodyText}`
  }
  send(connection) {
    return new Promise((resolve, reject) => {
      // 解析
      const parser = new ResponseParser()

      if (connection) {
        connection.write(this.toString())
      } else {
        connection = net.createConnection(
          { port: this.port, host: this.host },
          () => {
            connection.write(this.toString())
          }
        )
      }
      connection.on('data', data => {
        parser.receive(data.toString())
        console.log('parser.statusLine----', parser.statusLine)
        console.log(parser.headers)
        // 解析完成，resolve出结果
        if (parser.isFinished) {
          resolve(parser.response)
        }
        connection.end()
      })
      connection.on('error', err => {
        reject(err)
        console.log('connection err')
      })
      connection.on('end', () => {
        console.log('disconnected from server')
      })
    })
  }
}

class ResponseParser {
  // 主要解析服务器响应回来的数据流,包括协议，头，body 用有限状态机
  constructor() {
    this.WAITING_STATUS_LINE = 0
    this.WAITING_STATUS_LINE_END = 1
    this.WAITING_HEADER_NAME = 2
    this.WAITING_HEADER_SPACE = 3
    this.WAITING_HEADER_VALUE = 4
    this.WAITING_HEADER_LINE_END = 5
    this.WAITING_HEADER_BLOCK_END = 6
    this.WAITING_BODY = 7

    this.current = this.WAITING_STATUS_LINE
    this.statusLine = ''
    this.headers = {}
    this.headerName = ''
    this.headerValue = ''
    this.bodyParser = null
  }
  // 解析body结束，就算所有的response都解析结束了
  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished
  }
  // 返回 所有http请求的东西
  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('').replace('\r\n', '')
    }
  }
  receive(str) {
    for (let i = 0; i < str.length; i++) {
      this.receiveChar(str.charAt(i))
    }
  }
  receiveChar(char) {
    // 使用有限状态机一个个解析除了body实体之外的东西，包括 协议/line/header
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_STATUS_LINE_END
      } else if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      } else {
        this.statusLine += char
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END
      } else if (char === ':') {
        this.current = this.WAITING_HEADER_SPACE
      } else {
        this.headerName += char
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.WAITING_HEADER_VALUE
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END
        this.headers[this.headerName] = this.headerValue
        this.headerName = ''
        this.headerValue = ''
      } else {
        this.headerValue += char
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (char === '\n') {
        this.current = this.WAITING_BODY
        if (this.headers['Transfer-Encoding'] === 'chunked') {
          this.bodyParser = new ChunkedBodyParser()
        }
      }
    } else if (this.current === this.WAITING_BODY) {
      this.bodyParser.receiveChar(char)
    }
  }
}
class ChunkedBodyParser {
  // 解析body Chunk 流
  constructor() {
    this.CHUNK_SIZE = 0
    this.CHUNK_SIZE_LINE = 1
    this.CHUNK_DATA = 2
    this.CHUNK_DATA_LINE = 3
    this.CHUNK_DATA_LINE_END = 4
    this.CHUNK_DATA_BLOCK_END = 5
    this.LAST_CHUNK_DATA = 6

    this.size = 0
    this.content = []
    this.isFinished = false
    this.current = this.CHUNK_SIZE
  }
  receiveChar(char) {
    if (this.current === this.CHUNK_SIZE) {
      //通过判断字符是否为'0'判断是 chunk 还是 lastchunk
      if (char === '0') {
        this.current = this.LAST_CHUNK_DATA
        this.isFinished = true
      } else if (char === '\r') {
        this.current = this.CHUNK_SIZE_LINE
      } else {
        //size 为十六进制数而不是十进制
        this.size *= 16
        this.size += parseInt(char, 16)
      }
    } else if (this.current === this.CHUNK_SIZE_LINE) {
      if (char === '\n') {
        this.current = this.CHUNK_DATA
      }
    } else if (this.current === this.CHUNK_DATA) {
      this.content.push(char)
      //判断字符所占字节数
      let charCode = char.charCodeAt()
      let byteNum = 1
      if (charCode <= 0x007f) {
        //占一个字节
        byteNum = 1
      } else if (charCode <= 0x07ff) {
        //占两个字节
        byteNum = 2
      } else if (charCode <= 0xffff) {
        //占三个个字节
        byteNum = 3
      } else if (charCode <= 0x10ffff) {
        byteNum = 4
      }
      this.size -= byteNum //减去字符长度
      if (this.size === 0) {
        this.current = this.CHUNK_DATA_BLOCK_END
      }
    } else if (this.current === this.CHUNK_DATA_BLOCK_END) {
      if (char === '\n') {
        this.current = this.CHUNK_SIZE
      }
    }
  }
}
;(async function() {
  const request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: 8787,
    headers: {
      'X-Foo2': 'bar2'
    },
    body: { age: 18 }
  })
  let response = await request.send()
  console.log('reponse---', response)
})()

class Response {}
