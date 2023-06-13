const express = require('express');
const books = require('../model/books');
const cloudinary = require('../middleware/cloudinary.js');
const upload = require("../middleware/upload.js");
const ObjectID = require('mongoose').Types.ObjectId;
const router = express.Router();
// const adminAuth = require('../middleware/adminAuth');

router.post('/', upload("books").single("image"), async (req, res) => {

    try {
        const { title, authorID, categoryID, description } = req.body;

        if (!(title && authorID && categoryID)) {
            return res.status(400).send("All input is required");
        }

        const result = await cloudinary.uploader.upload(req.file.path, { folder: "books" });
        const book = await books.create({
            title,
            authorID,
            categoryID,
            description: description ?? "-",
            imageUrl: result.secure_url,
            publicID: result.public_id
        })

        return res.status(201).json(book);
    } catch (err) {
        res.status(401).send(err);
    }
});

router.get("/", (req, res) => {
    books.find({}, (err, booksData) => {
        if (!err) {
            return res.status(200).json(booksData);
        } else {
            return res.status(500).json({ Error: "DB_ERROR" });
        }
    });
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) {
        res.status(400).json({
            Error: 'Id Is Not Valid in DB'
        })
    }
    else {
        books.findById(id, (err, bookData) => {
            if (!err) {
                return res.json(bookData);
            } else {
                return res.status(500).json({ Error: "DB_ERROR" });
            }
        });
    }
});

router.put("/:id", upload("books").single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        let book = await books.findById(id);
        if (!book) {
            return res.status(404).send("Book Not Found")
        }
        if (req.file) {
            await cloudinary.uploader.destroy(book.publicID);
            const result = await cloudinary.uploader.upload(req.file.path);
            const image = {
                imageUrl: result.secure_url || book.imageUrl,
                publicID: result.public_id || book.publicID
            }
            book = await books.findByIdAndUpdate(id, image, { new: true });
        }
        const data = {
            title: req.body.title,
            authorID: req.body.authorID,
            categoryID: req.body.categoryID,
            description: req.description
        }
        book = await books.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json({ message: 'Book updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'server ' + err })
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        let book = await books.findById(id);

        await cloudinary.uploader.destroy(book.publicID);

        await book.remove()

        res.status(200).json(`Deleted One Record`);
    } catch (err) {
        console.log(err);
        res.status(500).json({ Erorr: "DB_ERROR" });
    }
});


module.exports = router