var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let signupControl = require('../controller/signupcontrol');
let loginControl = require('../controller/logincontrol');
let movieSearch = require('../controller/moviecontrol');

/*route for signup*/
router.get('/signup', signupControl.addNewUser);
/*route for logging in*/
router.get('/login', loginControl.login);
/*routes for movies add,delete,search,view*/
router.get('/search', movieSearch.search);
router.post('/addtofav', movieSearch.favourite);
router.get('/viewfav', movieSearch.viewfavourite);
router.get('/deletefavourite', movieSearch.delfavourite);

module.exports = router;