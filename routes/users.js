const express = require("express");
const router = express.Router();
const users = require("../models/users");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");

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
    const userName = req.body.userName;
    console.log(userName);
    const password =  req.body.password;
    users.getUserByUserName(userName, (err, user) =>{
        if(err)
            throw err;
        if(!user)
            return res.json({success: false, msg: "No User Found"});
        
        users.comparePassword(password, user.password, (err, checkMatch) =>{
            if(err)
                throw err;
            if(checkMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 //1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: users._id,
                        name: users.name,
                        userName: users.userName,
                        email: users.email
    
                    }
                });
            } else {
                return res.json({success: false, msg: "Password Incorrect"});
            }
            

        });
    });
});

//Profile Route Protected Route
router.get('/profile',passport.authenticate('jwt', {session:false}), (req, res, next)=>{
    res.json({user : req.user})
});

//Validate Route
router.get('/validate', (req, res, next)=>{
    res.send('VALIDATE');
});

module.exports = router;