const authorModel = require('../model/author');
const upload = require('../helpers/upload');
const dotenv = require('dotenv').config()
const authorData = require('../helpers/authorData');

function addAuthor(req, res) {

    upload(req, res, (err) => {
        if (!err) {
            const newAuthor = new authorModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                photo: req.file.filename,
            });
            newAuthor.save()
            res.status(201).send(authorData(newAuthor));
        }

        else {
            console.log(err);
            res.status(500).send("An Error Occured During Adding Author");

        }
    })
}


function listAllAuthors(req, res) {
    authorModel.find({}, (err, authors) => {

        if (!err) return res.status(201).send(
            authors.map(authorData)
        );

        console.log(err);
        res.status(500).send('An Error Occured During Listing Authors');
    })
}


function listAuthorById(req, res) {
    authorModel.findById(req.params.id, (err, author) => {
        if (!err) {

            return res.status(201).send(authorData(author));
        };
        console.log(err);
        res.status(500).send('An Error Occured During Listing Author')
    })
}


function updateAuthor(req, res) {

    upload(req, res, (uploadErr) => {
        const update = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            photo: req.file.filename
        };

        if (!uploadErr) {

            authorModel.findByIdAndUpdate(req.params.id, update, (updateErr, author) => {

                if (!updateErr) return res.status(201).send(authorData(author))
                res.status(500).send('An Error Occured: Could Not Update Author Data ')
            })
        }
    })
}


function deleteAuthor(req, res) {
    authorModel.findByIdAndDelete(req.params.id, err => {
        if (!err) return res.status(201).send('Author Deleted Successfully');
        res.status(500).send('An Error Occured: Could Not Delete Author')
    })
}


module.exports = {
    addAuthor, listAllAuthors, listAuthorById, updateAuthor, deleteAuthor
}