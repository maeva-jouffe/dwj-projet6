const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({
    userId: { type: String, required: true},
    name: { type: String, required: true},
    manufacturer: { type: String, required: true},
    description: { type: String, required: true},
    mainPepper: { type: String, required: true},
    imageUrl: { type: String, required: true},
    heat: { type: Number, required: true},
    likes: { type: Number, defaultValue: 0},
    dislikes: { type: Number, defaultValue: 0},
    usersLiked: { type: [String], defaultValue: 0},
    usersDisliked: { type: [String], defaultValue: 0},
});

module.exports = mongoose.model('sauce', saucesSchema);