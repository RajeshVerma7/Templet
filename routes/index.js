var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cool, huh!'});
});

/* GET users listing. */
router.post('/users', function(req, res, next) {
  res.send('users pages is okay... ' + req);
});

module.exports = router;
