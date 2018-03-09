const express = require('express'),
      router = express.Router(),
      tweetBank = require('../tweetBank'); // .. means look up 1 folder above

//If we pass an io instance into this function, we will be able to use it in our routes.
module.exports = function(io) {
  router.get('/', function(req, res, next){
    var tweetData = tweetBank.list();
    res.render('index', { title : 'Twitter Clone', tweets : tweetData, showForm : true}) //tweets object is going to passed into index.js
  });

  router.get('/users/:name', function(req, res, next){
    var tweetsForName = tweetBank.find({ name: req.params.name});
    res.render('index', {title: 'Twitter Clone', tweets: tweetsForName, showForm: true, username: req.params.name })
  });

  router.get('/tweets/:id', function(req, res, next){
    var tweetsId = tweetBank.find({ id: +req.params.id});
    res.render('index', {title: 'Twitter Clone', tweets: tweetsId })
  });

  //adds a new tweet
  router.post('/tweets', function(req, res, next){
    // tweetBank.add(req.body.name, req.body.content);
    var newTweet = tweetBank.add(req.body.name, req.body.content)
    io.sockets.emit('new_Tweet', newTweet);
    res.redirect('/'); //give instructions to browser to go to diff page
  });

  return router;
};

// Express.static under the hood
// function staticMiddleware(req,res,next){
//   //finds the associated file in our file system
//   //if err, move on (call next)
//   //if found, res.send that file with the correct headers (HTML <header>)
// }

// //Manually-written static file middle-ware grabs multiple files
// // Should be in the app.js file
// const mime = require('mime'); //npm install mime
// app.use(function(req, res, next){
//   var mimeType = mime.lookup(req.path); //based on file time of the end of path, figure out the header time it should be set to - know the content type
//   fs.readFile('./public' + req.path, function(err, fileBuffer){
//     if(err) return next(); //if err, means there's no file at that spot
//     res.header('Content-Type', mimeType);
//     res.send(fileBuffer); //if file found, serve it up
//   });
// });

// //Static grab for 1 file
// router.get('/stylesheets/style.css', function(req, res, next){
//   res.sendfile('/stylesheets/style.css', { root: __dirname + '/../public/'});
// });
