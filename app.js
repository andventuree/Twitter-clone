const express = require( 'express' ),
      app = express(), //creates instance of express app
      morgan = require('morgan'), //creates logging middle-ware
      nunjucks = require('nunjucks'),
      routes = require('./routes'); //assumes its looking for an index.js file

nunjucks.configure('views', {noCache : true}); // point nunjucks to the proper directory for templates
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

app.use(morgan('dev'));
//after passing through morgan, then run through routes too
app.use('/', routes); //for any incoming requests, plug them into this 1 stand alone router
//which then refers to the index.js file!

// let locals = {
//   title : 'booger',
//   people: [
//     {name : 'ling ling'},
//     {name : 'wai wai'}
//   ]
// };

// app.get('/', function(req, res){ //all routing moved to index.js
//   res.render('index', locals)
// })

app.listen(3000, function(){
  console.log('Server 3000 is running');
});


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

