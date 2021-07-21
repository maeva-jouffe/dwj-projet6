const mongoose = require('mongoose');
const validator = require('validator');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String,
            required: true,
            unique: true,
            validate:{
            validator: function(value){
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;},
            message: "Veuillez rentrer une adresse email valide"
            },},
            password: { type: String, required: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);