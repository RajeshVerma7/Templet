var express = require('express');
var router = express.Router();

var scrapCss = require('../controller/scrapCss/withPuppeter');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cool, huh!'});
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  if(req.query.webRes){
    // scrapCss.scrap(decodeURI(req.query.webRes)).then((result)=>{
    scrapCss.scrap(new Buffer(req.query.webRes, 'binary').toString('utf8')).then((result)=>{
      res.send(result);
    }).catch((err)=>{
      res.send("Error")
    });
  }
});

module.exports = router;
