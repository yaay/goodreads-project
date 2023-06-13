const dotenv = require('dotenv').config();


function authorData(author) {

    return {
        id: author?._id,
        firstName: author?.firstName,
        lastName: author?.lastName,
        dateOfBirth: author?.dateOfBirth,
        photo: dotenv.parsed.APP_URL + dotenv.parsed.PORT + "/images/author-photos/" + author?.photo
    }
}

module.exports = authorData;