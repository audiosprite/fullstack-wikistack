var morgan = require('morgan');
var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var wikiRouter = require('./routes/wiki');
var models = require('./models');
var path = require('path');

const Page = models.Page;
const User = models.User;

// app.use(express.static(path.join(__dirname, '/stylesheets')));

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});

// have res.render work with html files
app.set('view engine', 'html');

// when res.render works with html files, have it use nunjucks to do so

app.engine('html', nunjucks.render);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.get('/', function(req,res,next){
  var homePageLinks = Page.findAll({});
  homePageLinks
    .then((data) => {
      var newdata = data.map(element => element.dataValues);
      // console.log(newdata);
      res.render('index', {newdata: newdata});
    });
});

app.use('/wiki', wikiRouter);

app.use(express.static('public'));

models.User.sync()
  .then(function() {
    return models.Page.sync();
  })
  .then(function() {
    console.log('Starting server');
    app.listen(3000);
  })
  .catch(console.error);

