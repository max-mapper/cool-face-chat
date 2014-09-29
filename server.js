var net = require('http')
var child = require('child_process')
var WebSocketServer = require('ws').Server
var WebSocketStream = require('websocket-stream')

var server = net.createServer()
var wss = new WebSocketServer({server: server})

var clients = {}

wss.on('connection', function(socket) {
  var socket = WebSocketStream(socket)
  console.log(socket)
  var ip = socket.socket._socket.remoteAddress
  console.log('Client IP', ip)
  clients[ip] = socket
  
  socket.on('close', function() {
    delete clients[ip]
  })
  
  socket.on('data', function(chunk) {
    console.log('CHAT:', chunk.toString())
    Object.keys(clients).forEach(function(clientIP) {
      if (ip === clientIP) return
      clients[clientIP].write(chunk)
    })
  })
})

setInterval(function() {
  child.exec('cool-face', function(err, stdout) {
    Object.keys(clients).forEach(function(clientIP) {
      clients[clientIP].write('server gives u a face: ' + stdout)
    })
  })
}, 5000)

server.listen(9000)