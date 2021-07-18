const mongoose = require('mongoose');
const validator = require('validator');

const saucesSchema = mongoose.Schema({
    userId:{ type: String, required: true},
    name: { 
        type: String,
        required: true,
        validate:{
            validator: function(value){
                return /^[^@&"<>!_$*€£`+=\/';?#-]+$/.test(value);
            },
            message: "Les caractères spéciaux ne sont pas autorisés"
        }},
    manufacturer:{
        type: String,
        required: true,
        validate:{
            validator: function(value){
                return /^[^@&"<>!_$*€£`+=\/';?#-]+$/.test(value);
            },
            message: "Les caractères spéciaux ne sont pas autorisés"
        }},
    description:{
        type: String,
        required: true,
        validate:{
            validator: function(value){
                return /^[^@&()_$*€£`+=\/;?#]+$/.test(value);
            },
            message: "Les caractères spéciaux ne sont pas autorisés"
        }},
    mainPepper:{
        type: String,
        required: true,
        validate:{
            validator: function(value){
                return /^[^@&"<>!_$*€£`+=\/';?#-]+$/.test(value);
            },
            message: "Les caractères spéciaux ne sont pas autorisés"
        }},
    imageUrl:{ type: String, required: true},
    heat: { type: Number, required: true},
    likes: { type: Number, defaultValue: 0},
    dislikes: { type: Number, defaultValue: 0},
    usersLiked: { type: Array, default: [] },
    usersDisliked: { type: Array, default: [] },
});

module.exports = mongoose.model('sauce', saucesSchema);