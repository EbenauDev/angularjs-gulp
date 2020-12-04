const express = require('express')
const serveStatic = require('serve-static')
const app = express()
const path = require('path')

const port = 5001

app.use(serveStatic(path.join(__dirname, '/')))

app.listen(port, function () {
  console.log('http://teste.localhost:' + port)
})