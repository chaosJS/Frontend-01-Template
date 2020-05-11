// 用来启动一个模拟服务器
const http = require('http')
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('X-Foo', 'bar')
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  // console.log(req.headers)
  res.end('ok')
})

server.listen('8787', () => {
  console.log('listen in port: 8787')
})
