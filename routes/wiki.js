'use strict';

var express = require('express');
var router = express.Router();

console.log('hi', router);
router.get('/wiki', (req, res, next) => {
  // res.send('got to GET /wiki/');
});

router.post('/', (req, res, next) => {

});

router.get('/add', (req, res, next) => {
  res.render('addpage');
});

module.exports = router;
