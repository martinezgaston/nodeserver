var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/users");
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
require('dotenv').config()

//For local authentication
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Builds the token with the parameter 'user', could be only the _id or more attributes
exports.getToken = function(user) {

    return jwt.sign({_id:user._id}, process.env.TOKEN_SECRET,
        {expiresIn: 60000});
  
};

var opts = {};
//This means that the token will come in Header: Authorization Bearer TOKEN
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SECRET;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    //verify func to relate user and token sended
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

//this loads req.user
exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = function(req,res,next){
    console.log("Verifying");
   if(req.user.admin === true){
       console.log("its an admin");
        next();
        return;
   }
    var err = new Error('You are not authorized to perform this operation!');
    err.status = 403;
    next(err);
};
  