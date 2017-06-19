let loginschema = require('../models/signup');

let loginControl = {

    /*this login method is called in route*/
    login: function(req, res) {

        /*query to check whether the email is already in db or not.if data is null it will insert in to db*/
        loginschema.findOne({
            email: req.query.email
        }, function(err, data) {
            if (data != null) {
                if (req.query.email == data.email && req.query.password == data.password) {
                    res.redirect('/movie.html');
                } else {
                    res.redirect('/message.html');
                }
            } else {
                res.redirect('/index.html');
            }
        });
    }
};
module.exports = loginControl;