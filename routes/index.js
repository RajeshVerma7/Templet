var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cool, huh!'});
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  if(req.query.webRes){
    res.send('users pages is okay... '+req.query.webRes);
  }
});

module.exports = router;
