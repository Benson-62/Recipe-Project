const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    review: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true }
}, { timestamps: true });

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients:{type: String,required :true},
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    reviews: [reviewSchema] 
}, { timestamps: true });

const RecipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = RecipeModel;



