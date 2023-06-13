const mongoose = require('mongoose');
// Define the rating schema
const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
      },
      rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
      }

})

ratingSchema.pre(/^find/,function(next){
    this.populate({
        path:'book',
        select:'name',
    }).populate({
        path:"user",
        select:'name'
    })
    next();
})

// Create the rating model
const rating = mongoose.model('Rating',ratingSchema);
module.exports = rating;