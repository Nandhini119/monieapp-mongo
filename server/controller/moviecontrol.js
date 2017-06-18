let movieschema = require('../models/movie');
let request = require('request');

let searchmovie = 
{
    search : function(req,res)
    {
          request.get('https://api.themoviedb.org/3/search/movie?api_key=360fb236234213ff65f11eac623fb645&language=en-US&query='+req.query.name+'&page=1&include_adult=false', function(err, response, body) {
          res.send(JSON.parse(response.body));
          });

    },
    favourite : function(req,res)
    {
        var newfav = {
             title : req.body.title,
           poster : req.body.poster,
           release_date : req.body.release_date 
        };
         movieschema.findOne({title : req.body.title},function(err,data)
         {
             console.log("insidefav");
             if(data == null )
        {
             var db = new movieschema(newfav);
        db.save().then((doc) => {
          res.redirect('/');
       }, (err) => {
           res.send(err);
       });
        }
        else
        {
            res.redirect('/index.html');
        }
        
         });
    },
    
    viewfavourite : function(req,res)
    {
          movieschema.find(function(err,data){
        if (err)
          throw err;
        else{
            res.send(data);
        }
    });
        
    },
    
    delfavourite : function(req,res)
    {
         var title = req.query.title;     
    movieschema.remove({title:title},function(err,data){
        if(err)
        throw err;
        else
         {   
         res.send("success");
    }
});

    }
};
module.exports = searchmovie;