var net = require('http')
var child = require('child_process')

var server = net.createServer(onConnection)

var clients = {}

function onConnection(req, res) {
  var ip = req.connection.remoteAddress
  console.log('Client IP', ip)
  clients[ip] = res
  
  req.on('close', function() {
    delete clients[ip]
  })
  
  req.on('data', function(chunk) {
    console.log('CHAT:', chunk.toString())
    Object.keys(clients).forEach(function(clientIP) {
      if (ip === clientIP) return
      clients[clientIP].write(chunk)
    })
  })
}

setInterval(function() {
  child.exec('cool-face', function(err, stdout) {
    Object.keys(clients).forEach(function(clientIP) {
      clients[clientIP].write('server gives u a face: ' + stdout)
    })
  })
}, 5000)

server.listen(9000)