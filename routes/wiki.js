'use strict';

const models = require('../models');
const Page = models.Page;
const User = models.User;

const express = require('express');
const router = express.Router();


router.post('/', (req, res, next) => {
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function (values) {

    var user = values[0];

    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    });

    return page.save().then(function (page) {
      return page.setAuthor(user);
    });

  })
  .then(function (page) {
    res.redirect(page.route);
  })
  .catch(next);
});

router.get('/add', (req, res, next) => {
  res.render('addpage');
});

router.get('/', function(req, res, next){
  res.redirect('/');
});

router.get('/:urlTitle', function(req, res, next){
  // res.send('hit dynamic route at ' + req.params.urlTitle);
  var thisUrl = Page.findOne({
    where: {
      urlTitle: req.params.urlTitle,
    }
  });
  // var thisAuthor = User.findOne({
  //   where: {

  //   }
  // })
  // console.log(thisUrl);
  thisUrl
    .then((data) => {
      // console.log(data);
      res.render('wikipage', {data: data});
    })
    .catch(next);
});


router.get('/users/:id', (req, res, next) => {
  Page.findAll({
    where: {
      authorId: req.params.id
    }
  })
    .then((newdata) => {
      res.render('user', {newdata: newdata});
    })
    .catch(console.error);
});

router.get('/users', (req, res, next) => {
  User.findAll({})
    .then((data) => {
      // console.log('Users data: ', data);
      res.render('users', data);
    })
    .catch(console.error);
});



module.exports = router;
