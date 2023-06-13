const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({


    firstName: {
        type: String,
        required: [true, 'This Field Is Required'],
        min: [3, 'Please Enter A Valid Name']
    },

    lastName: {
        type: String,
        required: [true, 'This Field Is Required'],
        minlengh: [3, 'Please Enter A Valid Name']
    },

    dateOfBirth: {
        type: Date,
        required: [true, 'This Field Is Required']
    },
    photo: {
        type: String
    }
});

const authorModel = mongoose.model('author', authorSchema)
module.exports = authorModel;

