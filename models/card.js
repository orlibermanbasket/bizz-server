const { string } = require("joi");
const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    buisnessName:{
        type : String,
        minlength: 2,
        required: true,
    },
    buisnessDescription:{
        type: String,
        required: true,
    },
    buisnessAdress:{
        type: String,
        required: true
    },
   buisnessPhone:{
        type: Number,
        required: true
    },
    buisnessImage:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required:true
    }
})
const Card = mongoose.model("cards", cardSchema);
module.exports = Card;
