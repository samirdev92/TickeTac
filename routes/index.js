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
    email_address: newUser.email_address,
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
  console.log("userExist :" + userExist)
  
  if(userExist != null) {
    res.render('homepage', {})
  } else {
    res.redirect('/')
  }
});

/* POST pour la Homepage */
router.post('/journey', async function (req, res, next) {
  let journeyExist = await journeyModel.find({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date
  });

  for(i=0; i<journeyExist.length; i++){
    journeyExist[i].departureTime = journeyExist[i].departureTime.replace(":", "")
  }
  journeyExist.sort(
    ((a, b) => a.departureTime - b.departureTime));

console.log(journeyExist[0].departureTime)

for(i=0; i<journeyExist.length; i++){
  if(journeyExist[i].departureTime.length === 3){
    journeyExist[i].departureTime = journeyExist[i].departureTime.charAt(0)+":" + journeyExist[i].departureTime.charAt(1) + journeyExist[i].departureTime.charAt(2)
  } else {journeyExist[i].departureTime = journeyExist[i].departureTime.charAt(0) + journeyExist[i].departureTime.charAt(1)+":"+journeyExist[i].departureTime.charAt(2)+
  journeyExist[i].departureTime.charAt(3)
  }
}
  console.log("CONSOLE LOG", journeyExist)

  res.render('homepage', {journeyExist})
})

module.exports = router;
