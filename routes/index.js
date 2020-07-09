var express = require('express');
var router = express.Router();
var userModel = require('./models/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POSTS pour le Sign up */ 
router.post('/sign-up', async function(req, res, next) {

  var newUser = new userModel({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email,
    password: req.body.password,
  });
  await userModel.save()

  let userSession = req.session.userSession = {
    first_name: req.session.first_name,
    last_name: req.session.last_name,
    id: newUser._id
  }

  res.render('homepage'), {userSession};
})

/* POSTS pour le Sign in */ 
router.post('/sign-in', async function (req, res, next) {
  userExist = await userModel.findOne({
    email_address: req.body.email,
    password: req.body.password
  }
  );
  if(userExist != null) {
    res.render('/homepage')
  } else {
    res.redirect('/signup ')
  }
});


module.exports = router;
