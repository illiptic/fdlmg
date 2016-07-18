var path = require('path')
var express = require('express')

var app = express()

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.use('/static', express.static(path.join(__dirname, 'dist')))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'src/index.html'))
})

app.listen(port, ip_address, function(err) {
  if (err) {
    console.log(err)
    return;
  }

  console.log('Listening at http://' + ip_address + ':' + port)
})
