const http = require('http')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createServer({
  target: `http://${process.env.TARGET_HOST}:${process.env.TARGET_PORT}`,
  secure: false
})

const server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
  } else {
    proxy.web(req, res)
  }
})

server.listen(process.env.SERVER_PORT)
