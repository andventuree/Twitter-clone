const express = require( 'express' ),
      app = express(), //creates instance of express app
      morgan = require('morgan'), //creates logging middle-ware
      nunjucks = require('nunjucks'),
      routes = require('./routes'), //assumes its looking for an index.js file
      fs = require('fs'),
      path = require('path'),
      bodyParser = require('body-parser'),
      socketio = require('socket.io');

nunjucks.configure('views', {noCache : true}); // point nunjucks to the proper directory for templates
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

app.use(morgan('dev'));
//after passing through morgan, then run through routes too
app.use(bodyParser.urlencoded({extended: true})); //for html form submits
app.use(express.static(path.join(__dirname, 'public'))) //serves up files from public folder

var server = app.listen(3000, function(){
  console.log('Server 3000 is running');
});
var io = socketio.listen(server);

//moved down to have access to io instance
app.use('/', routes(io)); //for any incoming requests, plug them into this 1 stand alone router
//which then refers to the index.js file!

// ***************************************************************
// If we did not have EXPRESS! //helps to route http requests
// let http = require('http');

// let server = http.createServer(function(req, res){
//   console.log('a request has been made');
//   response.writeHead(200, { 'Content-Type' : 'text/plain'});
//   repsonse.write('here is some plain text');
//   response.end();
// });

// server.listen(3000, function(){console.log('server 3000 has started')});

// ***************************************************************
// Replaced by MORGAN! //creates logging middle-ware
// app.use(function(req, res, next){
//   //Everytime you use a middleware function,
//   //you need to explicitly say to call the next function,
//   //otherwise it stops in this callback with next();
//   //This explicitness gives us greater control because say
//   //we run an async function, and this CB doesnt have the next(),
//   //the code will move on without our async function finishing.
//   res.on('finish', function(){
//     //listen for finish event fired by node for every requestk
//     console.log('responded:',res.statusCode, req.method, req.path);
//   })
//   next();
// })

