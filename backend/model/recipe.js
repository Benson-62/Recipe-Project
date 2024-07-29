const mongoose = require('mongoose');
const UserModel = require('./user');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Image, required: true},
    review: { type: String },
    rating:{type: Number},
    createdBy:{}
},{timestamps:true});

const recipeModel = mongoose.model('recipe', recipeSchema);




module.exports = recipeModel;
