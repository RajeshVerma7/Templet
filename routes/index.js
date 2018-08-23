var express = require('express');
var router = express.Router();

// var scrapCss = require('../controller/scrapCss/withPuppeter');
var scrapCss = require('../controller/scrapCss/withXHR');
var modifyCss = require('../controller/replaceInternalCssLinks/replaceCssLink');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cool, huh!'});
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  if(req.query.webRes){
    scrapCss.scrap(req.query.webRes).then((result)=>{
      // console.log(result);
      var modifiedCss = modifyCss.modify(result , req.query.webRes);
      res.send(modifiedCss);
    }).catch((err)=>{
      console.log(err);
      res.send("Error")
    });
  }
});

module.exports = router;
