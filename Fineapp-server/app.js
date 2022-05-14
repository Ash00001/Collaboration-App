var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let cors= require('cors')

let mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let chatRouter = require('./routes/chats.route');
let messageRouter = require('./routes/message.route');
let groupsRouter = require('./routes/groups.route');
let groupmessagesRouter = require('./routes/groupmessages.route');
let usernameRouter = require('./routes/username.route');

const Pusher = require('pusher');

var app = express();

app.use(cors())

require('dotenv').config()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




let connectionUrl ='mongodb+srv://admin:syYFhLMpDdSZ3P6U@cluster0.n3diu.mongodb.net/FineApp?retryWrites=true&w=majority'


mongoose.connect(connectionUrl, {
  //useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch((error)=>{
 console.log("error ", error)
})

var pusher = new Pusher({
  appId: "1403765",
  key: "518a0507aa243bc6cdfb",
  secret: "3d71ccffd85a48052840",
  cluster: "ap2",
  useTLS: true

})


const db = mongoose.connection;
db.once('open',()=>{
  console.log('db connected');
  const messageCollection = db.collection('messages');
  const changeStream = messageCollection.watch();
  changeStream.on('change', (change)=>{
    //console.log("what is in change ", change)
    if(change.operationType == 'insert'){
      const messageDetails = change.fullDocument;
      pusher.trigger(
        'message', 'inserted', {
          message: messageDetails.message,
          chat_id: messageDetails.chat_id,
          from: messageDetails.from,
          time: messageDetails.time
        }
      )
    }
  })
})


//routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chats', chatRouter);
app.use('/status', groupsRouter);
app.use('/messages', messageRouter);
app.use('/username', usernameRouter);
app.use('/groupmessages', groupmessagesRouter);

// app.post('/chat', (req, res)=>{
//   //save the chat
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.render('index', {title:'FineApp'});
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;