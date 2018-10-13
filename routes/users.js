const express = require("express");
const router = express.Router();
const users = require("../models/users");
const passport = require("passport");
const jwt = require("jsonwebtoken");


//Register Route
router.post('/register', (req, res, next)=>{
    let newUser = new users({
        name: req.body.name,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password
    
    });

    users.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: "Failed to Register User"});
        }else{
            res.json({success: true, msg: "Registered new User"});
        }
    });
});

//Authenticate Route
router.post('/authenticate', (req, res, next)=>{
    res.send('AUTHENTICATE');
});

//Profile Route
router.get('/profile', (req, res, next)=>{
    res.send('PROFILE');
});

//Validate Route
router.get('/validate', (req, res, next)=>{
    res.send('VALIDATE');
});

module.exports = router;