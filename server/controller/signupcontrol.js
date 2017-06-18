let signupschema = require('../models/signup');

let signupController = {
    
    addNewUser : function(req,res){
      
        console.log("lname"+req.query.lname);
        var newUser = {
            fname  : req.query.fname,
            lname : req.query.lname,
            username : req.query.username,
            email : req.query.email,
            password : req.query.password,
           
        };
        
        signupschema.findOne({email : req.query.email},function(err,data)
    {
        if(data == null )
        {
             var db = new signupschema(newUser);
        db.save().then((doc) => {
          res.redirect('/movie.html');
       }, (err) => {
           res.send(err);
       });
        }
        else
        {
            res.redirect('/index.html');
        }
        
    });

       
    }
    
};

module.exports = signupController;