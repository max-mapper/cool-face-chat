var net = require('net')

connect()

function connect() {
  var client = net.connect(9000, 'localhost', onConnected)
  
  function onConnected() {
    console.log('Welcome to cool-face-chat!')
  }

  client.on('data', function(chunk) {
    console.log(chunk.toString())
  })
  
  client.on('error', function(err) {
    console.log('Got a connection error.')
  })

  client.on('close', function() {
    console.log('Lost connection. Reconnecting...')
    process.stdin.unpipe(client)
    setTimeout(connect, 5000)
  })
  
  process.stdin.pipe(client)
}
