const express = require('express');
const router = express.Router();
const controllers = require('../controllers/author');


router.post('/', controllers.addAuthor);

router.get('/', controllers.listAllAuthors);

router.get('/:id', controllers.listAuthorById);

router.put('/:id', controllers.updateAuthor);

router.delete('/:id', controllers.deleteAuthor);

module.exports = router;