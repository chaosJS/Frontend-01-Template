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
        // resolve(data.toString())
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

    this.currentStatus = this.WAITING_STATUS_LINE
    this.statusLine = ''
    this.headers = {}
    this.headerName = ''
    this.headerValue = ''
  }
  receive(str) {
    for (let i = 0; i < str.length; i++) {
      this.receiveChar(str.charAt(i))
    }
  }
  receiveChar(char) {
    // 字符一个个进来解析
    // 处理 第一行 协议部分 HTTP/1.1 200 OK
    if (this.currentStatus === this.WAITING_STATUS_LINE) {
      if (char === '\r') {
        this.currentStatus = this.WAITING_STATUS_LINE_END
      }
      if (char === '\n') {
        this.currentStatus = this.WAITING_HEADER_NAME
      } else {
        this.statusLine += char
      }
    }

    // 处理之间的换行
    else if (this.currentStatus === this.WAITING_STATUS_LINE_END) {
      if (char === '\n') {
        this.currentStatus = this.WAITING_HEADER_NAME
      }
    }
    // 处理header的键值对 的键 包括冒号
    else if (this.currentStatus === this.WAITING_HEADER_NAME) {
      if (char === ':') {
        this.currentStatus = this.WAITING_HEADER_SPACE
      } else if (char === '\r') {
        this.currentStatus = this.WAITING_BODY
      } else {
        this.headerName += char
      }
    }
    // 键值对冒号之后的空格
    else if (this.currentStatus === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.currentStatus = this.WAITING_HEADER_VALUE
      }
    }
    // 处理header的键值对 的值
    else if (this.currentStatus === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.currentStatus = this.WAITING_HEADER_LINE_END
        // headers 有多个
        this.headers[this.headerName] = this.headerValue
        this.headerName = ''
        this.headerValue = ''
      } else {
        this.headerValue += char
      }
    }
    // headers 部分结束后的空行
    else if (this.currentStatus === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.currentStatus = this.WAITING_HEADER_LINE_END
        // headers 有多个
        this.headers[this.headerName] = this.headerValue
      } else {
        this.headerValue += char
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
