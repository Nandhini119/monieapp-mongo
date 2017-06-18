let loginschema = require('../models/signup');

let loginControl = {
   login : function(req,res)
   {
       loginschema.findOne({email : req.query.email},function(err,data){
          
           if(data != null)
           {
            if(req.query.email == data.email && req.query.password == data.password  ){
           res.redirect('/movie.html');
             }
       else
       {
           res.redirect('/message.html');
       }
   }
  

       else {
           res.redirect('/index.html');
       }
       });

       }
   };

module.exports = loginControl;