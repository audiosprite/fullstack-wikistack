var morgan = require('morgan');
var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
// var wikiRouter = require('./routes/wiki');
var models = require('./models');
// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

router.get('/wiki', (req, res, next) => {
  // res.send('got to GET /wiki/');
});

router.post('/', (req, res, next) => {

});

router.get('/add', (req, res, next) => {
  res.render('addpage');
});

// app.use('/wiki', wikiRouter);

// models.User.sync({})
//   .then(function() {
//     return models.Page.sync({});
//   })
//   .then(function() {
    console.log('Starting server');
    app.listen(3000);
  // })
  // .catch(console.error);


// app.get("/", function(req, res){
//     res.send(200);
// })
