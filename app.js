const express = require('express')
const app = express()

const logger = require('morgan')
const bodyParser = require('body-parser')

// import routes
const lab = require('./routes/lab')
const charge = require('./routes/charge')
process.title = 'mockapi'

// CORS All Request
const allowCrossDomain = (req, res, next) => {
  // let allowedOrigins = ['http://localhost:8081', 'http://127.0.0.1:8081']
  // let origin = req.headers.origin
  // if (allowedOrigins.includes(origin)) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-XSRF-TOKEN, True-Client-IP')
  next()
}

app.use(
  logger(
    ':date[iso] => :method :url :status :res[content-length] - :response-time ms',
    {
      skip: function (req, res) {
        return req.method.toUpperCase() === 'OPTIONS'
      }
    }
  )
)
app.use(bodyParser.json({ limit: 1024 * 1024 * 5, type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(allowCrossDomain)

// set welcome route
const router = express.Router()
router.get('/', function (req, res) {
  res.send('Yo.. This is React.js Lab Mock API!')
})
app.use('/', router)

// set other route
app.use('/api/lab', lab)
app.use('/api/charge', charge)

// 创建http服务器
if (process.env.PORT) {
  // 在 vercel 加入環境變數 PORT 5000 即可
  app.listen(process.env.PORT)
} else {
  // 使用nodejs自带的http、https模块
  const https = require('https')
  const http = require('http')
  const fs = require('fs')

  // 根據項目的路徑傳入生成的證書文件
  const privateKey = fs.readFileSync('./certificate/privateC.pem', 'utf8')
  const certificate = fs.readFileSync('./certificate/caC.cer', 'utf8')
  const credentials = { key: privateKey, cert: certificate }

  // 创建http与HTTPS服务器
  const httpServer = http.createServer(app)
  const httpsServer = https.createServer(credentials, app)

  // 可以分别设置http、https的访问端口号
  var PORT = 8888
  var SSLPORT = 4999

  httpServer.listen(PORT, function () {
    // eslint-disable-next-line no-console
    console.log('HTTP Server is running on: http://localhost:%s', PORT)
  })

  // 创建https服务器
  httpsServer.listen(SSLPORT, function () {
    // eslint-disable-next-line no-console
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT)
  })
}

// 可以根据请求判断是http还是https
app.get('/currentProtocol', function (req, res) {
  if (req.protocol === 'https') {
    res.status(200).send('This is https visit!')
  } else {
    res.status(200).send('This is http visit!')
  }
})

// Export the Express API
module.exports = app
