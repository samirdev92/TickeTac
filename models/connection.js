// --------------------- BDD -----------------------------------------------------
const mongoose = require('mongoose'); 

var user = 'admin';
var password = 'admin';
var bddname = 'ticketac';

// useNewUrlParser ;)
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
 };

mongoose.connect(`mongodb+srv://${user}:${password}@ticketac.j0oal.mongodb.net/${bddname}?retryWrites=true&w=majority`,
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Ticketac connection : Success ***');
    }
   }
);
