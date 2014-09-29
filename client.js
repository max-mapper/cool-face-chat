var ws = require('websocket-stream')

connect()

function connect() {
  var client = ws('ws://localhost:9000')
  
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
    setTimeout(connect, 5000)
  })
  
  setInterval(function() {
    client.write('hello' + Math.random())
  }, 1000)
}
