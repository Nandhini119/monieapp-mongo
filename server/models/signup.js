var mongoose = require('mongoose');


module.exports = mongoose.model('signup',{
     fname: String,
    lname: String,
    username: String,
    password: String,
    email: String  
    
});