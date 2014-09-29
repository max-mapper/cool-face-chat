var request = require('request')
var log = require('single-line-log').stderr

connect()

function connect() {
  var client = request.post('http://localhost:9000')
  
  client.on('request', onConnected)
  
  function onConnected() {
    console.log('Welcome to cool-face-chat!')
  }

  client.on('data', function(chunk) {
    console.log(chunk.toString())
  })
  
  client.on('error', function(err) {
    log('Got a connection error. Trying again...')
  })

  client.on('end', function() {
    process.stdin.unpipe(client)
    setTimeout(connect, 5000)
  })
  
  process.stdin.pipe(client)
}
