const mongoose = require('mongoose');

// Define the shelf schema
const shelfSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ['read', 'reading', 'want to read'],
    required: true
  }
});

shelfSchema.pre(/^find/,function(next){
    this.populate({
        path:'book',
        select:'title',
    }).populate({
        path:"user",
        select:'f_name '
    })
    next();
})

// Create the Shelf model
const shelf = mongoose.model('Shelf', shelfSchema);

module.exports = shelf;
