const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const Schema = mongoose.Schema;

const promotionSchema = new Schema({
    price: {
        type:Currency,
        min:0,
        required:true
    },
    label:{
        type:String,
        default:"",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},
    {
        timestamps:true
});

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = {Promotions};
