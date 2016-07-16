var path = require('path')
var express = require('express')

var app = express()

app.use('/static', express.static(path.join(__dirname, 'dist')))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'src/index.html'))
})

app.listen(8080, 'localhost', function(err) {
  if (err) {
    console.log(err)
    return;
  }

  console.log('Listening at http://localhost:8080')
})
