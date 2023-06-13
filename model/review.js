const mongoose = require('mongoose');
// Define the rating schema
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books',
        required: true
      },
      comment: {
        type: String,
        required: true,
        
      },
      date: {
        type: Date,
        default: Date.now
      }

})

reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:'book',
        select:'title',
    }).populate({
        path:"user",
        select:'f_name '
    })
    next();
})

// Create the rating model
const review = mongoose.model('Review',reviewSchema);
module.exports = review;