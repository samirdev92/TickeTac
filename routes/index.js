var express = require('express');
var router = express.Router();
var userModel = require('../models/users')
var journeyModel = require('../models/journey');
const { text } = require('express');


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
