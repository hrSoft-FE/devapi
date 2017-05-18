var express = require('express')
var path = require('path')
var cors = require('cors')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var index = require('./routes/index')
var users = require('./routes/users')

var app = express()

/*--------------- add something start ----------------------------*/
// routes setup
var apiRoutes = express.Router()
apiRoutes.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Token,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  // 应该设置Allow字段用来支持复杂请求的预检
  res.header("Allow","GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH")
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.type === 'OPTIONS') {
    res.send(200)
  }else{
    next();
  }
});
apiRoutes.post('/login', function (req, res, next) {
  res.json({
    'code': 0,
    'data': {
      'user': {
        'userId': 14,
        'mobile': '15076051320'
      },
      'token': '72267e2616dc4abeae99c9ce40dcd562'
    }
  })
})
apiRoutes.post('/register', function (req, res, next) {
  res.json({
    'code': 0,
    'data': {
      'mobile': '15678945120',
      'password': '123456',
      'code': '1234'
    }
  })
})

// strings type
apiRoutes.get('/book', function (req, res, next) {
  res.send('book')
})
// string model
apiRoutes.get('/usr/*man', function (req, res, next) {
  res.send('usr')
})
// reg type
apiRoutes.get(/animals?$/, function (req, res, next) {
  res.send('animals')
})
// args
apiRoutes.get('/employee/:uid/:age', function (req, res, next) {
  res.json(req.params)
})
app.use('/api', apiRoutes)
/*--------------- add something end ----------------------------*/
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use('/', index)
app.use('/users', users)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
