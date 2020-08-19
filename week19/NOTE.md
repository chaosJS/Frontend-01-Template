# 每周总结可以写在这里

### yeoman 脚手架工具

1. 设计目录结构
2. 初始化工具 🔧
3. 使用 yeoman

### 打包发布的流程和架构 通信机制 流的传输和处理

1. 发布系统，实现一个线上 web 服务
   1. server
   2. 发布工具 publish-tool
   3. 发布服务器 publish-server 链接 server 和 publish-tool ，
   4. publish-server 收到 publish-tool 的请求，将文件发布到线上的 server 中
2. 要点
   1. stream
   2. archiver
   3. gzip/unzip 压缩解压
