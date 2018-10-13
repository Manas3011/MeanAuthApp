const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/users");
const config = require("../config/database");

module.exports = function(passport){
    let options = {};
    options.jwtFromRequest =  ExtractJwt.fromAuthHeaderWithScheme("jwt");
    options.secretOrKey = config.secret;
    passport.use(new JwtStrategy(options, (jwt_Payload, done) =>{
        User.getUserById(jwt_Payload._id, (err, user) => {
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        });
    }))
}
