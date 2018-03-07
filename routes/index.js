const express = require('express'),
      router = express.Router(),
      tweetBank = require('../tweetBank'); // .. means look up 1 folder above

router.get('/', function(req, res, next){
  var tweets = tweetBank.list();
  res.render('index', { title : 'Twitter Clone', tweets : tweets}) //tweets object is going to passed into index.js
})


module.exports = router;
