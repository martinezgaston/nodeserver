const mongoose = require("mongoose");
require('dotenv').config()

const url = "mongodb+srv://" + process.env.MONGOUSER + ":"+ process.env.MONGOPASS+ process.env.MONGOURL+"/" + process.env.MONGODB + "?retryWrites=true&w=majority";
const connect = mongoose.connect(url);

//funca -> es el then
const MongoDBConnect = new Promise((funca,funcb) =>{

    connect.then((db)=>{
        //Llama a la funcion pasada por parametro, con el parametro 1, esto se tiene q obtener del otro lado, en el then
        //funca es la señalizacion de fin
        console.log("Connected to MongoDB");
        funca('OK');
      });

      

});



module.exports = MongoDBConnect;