var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const axios = require('axios');


const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/reactdb', {
  useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true
});;

//Setting up express and adding socketIo middleware
const app = express();
const http = require("http").Server(app);
clientPort = 3001;

const connectSocket = http.listen(clientPort);

const io = require('socket.io')(connectSocket);

io.on("connection", socket => {

  socket.on('send-message', data => {

    console.log('Socket send-message >', data);

    socket.broadcast.emit("received", { content: data.data });
    io.emit('receive-message', data);

    // function connect(connect) {
    //   console.log("connected correctly to the server");
      
    //   let  chatMessage  =  new Chat({ message: msg, sender: "Anonymous"}) ;
    //   chatMessage.save();

    //   console.log('data db socket >', connect);
      
    // };
    // connect()
  
  });
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

module.exports = app;
