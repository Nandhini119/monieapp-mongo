var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let signupControl = require('../controller/signupcontrol');
let loginControl = require('../controller/logincontrol');
let movieSearch = require('../controller/moviecontrol');

 
 router.get('/signup',signupControl.addNewUser);
 router.get('/login',loginControl.login);
 router.get('/search',movieSearch.search);
 router.post('/addtofav',movieSearch.favourite);
 router.get('/viewfav',movieSearch.viewfavourite);
 router.get('/deletefavourite',movieSearch.delfavourite);
module.exports = router;
