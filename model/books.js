const mongoose = require("mongoose")


const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required']
    },
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Author name is requried'],
        ref: "author"
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Book category is required'],
        ref: 'Category'
    },
    description: {
        type: String,
        required: [true, 'Book description is requried']
    },
    publication_date: {
        type: Date
    },
    imageUrl: {
        type: 'string'
    },
    publicID: {
    type: 'string'
    },
    average_rating: {
        type: 'string'
    },
    ratings_count: {
        type: "string"
    },
    reviews_count: {
        type: "string"
    }

});

booksSchema.pre(/^find/,function(next){
    this.populate({
        path:'authorID',
        select:'firstName'
    }).populate({
        path:'categoryID',
        select:'name'
    })
    next();
})



const books = mongoose.model('books', booksSchema);
module.exports = books