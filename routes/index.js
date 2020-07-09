var express = require('express');
var router = express.Router();
var userModel = require('../models/users')
var journeyModel = require('../models/journey');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

/* POSTS pour le Sign up */ 
router.post('/sign-up', async function(req, res, next) {

  var newUser = await new userModel({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email,
    password: req.body.password,
  });
  await newUser.save()
  console.log(newUser)
  let userSession = {
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    id: newUser._id
  }
  console.log(userSession)
  res.render('homepage'), {userSession};
})

/* POSTS pour le Sign in */ 
router.post('/sign-in', async function (req, res, next) {
  userExist = await userModel.findOne({
    email_address: req.body.email,
    password: req.body.password
  })
  console.log(userExist)
  if(userExist != null) {
    res.render('homepage')
  } else {
    res.redirect('/')
  }
});


module.exports = router;
