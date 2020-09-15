const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var User = new Schema({
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    }
});


User.plugin(passportLocalMongoose);
/*
const userSchema = new Schema({
    username: {
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    }
},
    {
        timestamps:true
});
*/
module.exports = mongoose.model('User',User);
