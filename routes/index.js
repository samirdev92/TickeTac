var express = require('express');
var router = express.Router();
var userModel = require('../models/users')
var journeyModel = require('../models/journey');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/homepage', function(req, res, next) {
  if(req.session.user == null){
    res.redirect('/')
  } else {
    res.render('homepage')
  }
})

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

  req.session.user = {
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    email_address: newUser.email_address,
    id: newUser._id
  }
 
  res.render('homepage');
})

/* POSTS pour le Sign in */ 
router.post('/sign-in', async function (req, res, next) {
  userExist = await userModel.findOne({
    email_address: req.body.email,
    password: req.body.password
  })
  console.log('ggfgbfbgfbgf', userExist)
  if(userExist != null) {
  req.session.user = {
    first_name: userExist.first_name,
    last_name: userExist.last_name,
    id: userExist._id
  }
    res.redirect('/homepage')
  } else {
    res.redirect('/')
  }
});

/* POST pour choisir son voyage */
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
  } else {journeyExist[i].departgitureTime = journeyExist[i].departureTime.charAt(0) + journeyExist[i].departureTime.charAt(1)+":"+journeyExist[i].departureTime.charAt(2)+
  journeyExist[i].departureTime.charAt(3)
  }
}
req.session.journeyExist = {

}
  console.log("CONSOLE LOG", journeyExist)

  res.render('homepage', {journeyExist})
})

// route pour afficher mes tickets


module.exports = router;
