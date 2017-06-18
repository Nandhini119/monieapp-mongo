var mongoose = require('mongoose');


module.exports = mongoose.model('movies',{
     title: String,
    poster: String,
    release_date: String
  
});