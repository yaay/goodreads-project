const express = require('express');
const router = express.Router();
const shelve = require('../model/shelve')



router.get('/', async (req, res) => {
    try {
        const getShelve = await shelve.find()
        res.status(201).json(getShelve)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const getShelve = await shelve.findById({ _id: id })
        res.status(201).json(getShelve)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }

});
router.post('/', async (req, res) => {
    try {
        const createShelve = await shelve.create(req.body)
        res.status(201).json(createShelve)

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
        console.log(error);
    }
});
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updataShelve = await shelve.updateOne({ _id: id }, { ...req.body });
        res.status(201).json("updated shelve successfully ");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }


});
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteShelve = await shelve.deleteOne({ _id: id });
        res.status(201).json("deleted shelve successfully")
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }

});

module.exports = router;