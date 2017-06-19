let movieschema = require('../models/movie');

let request = require('request');

let searchmovie = {
  
    /*this function is called in route to search the movie data from tmdb api*/
    search: function(req, res) {
      
        request.get('https://api.themoviedb.org/3/search/movie?api_key=360fb236234213ff65f11eac623fb645&language=en-US&query=' + req.query.name + '&page=1&include_adult=false', function(err, response, body) {
            res.send(JSON.parse(response.body));
        });
    },
  
    /*this will add the movie into db when add to favourite button is clicked*/
    favourite: function(req, res) {

        var newfav = {
            title: req.body.title,
            poster: req.body.poster,
            release_date: req.body.release_date
        };

        movieschema.findOne({
            title: req.body.title
        }, function(err, data) {
            if (data == null) {
                var db = new movieschema(newfav);
                db.save().then((doc) => {
                    res.redirect('/');
                }, (err) => {
                    res.send(err);
                });
            } else {
                res.redirect('/index.html');
            }
        });
    },
  
    /*this get all the data from the favourite db*/
    viewfavourite: function(req, res) {
      
        movieschema.find(function(err, data) {
            if (err)
                throw err;
            else {
                res.send(data);
            }
        });
    },
  
    /*delete the movie from the favourite db*/
    delfavourite: function(req, res) {
      
        var title = req.query.title;
      
        movieschema.remove({
            title: title
        }, function(err, data) {
            if (err)
                throw err;
            else {
                res.send("success");
            }
        });
    }
};
module.exports = searchmovie;