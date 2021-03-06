const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");


//User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }


});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUserName = function(userName, callback){
    const query = {userName: userName};
    User.findOne(query, callback);    
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
            if(err)
                throw err;
            newUser.password =  hash;
            newUser.save(callback);
        })
    });
}

module.exports.comparePassword = function(candidatepassword, hash, callback){
    bcrypt.compare(candidatepassword, hash, (err, checkMatch) => {
        if(err)
            throw err;
        callback(null, checkMatch)
    });
}