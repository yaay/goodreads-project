const express = require('express');
const rating = require('../model/rating')
const router = express.Router();


router.get('/:id',(req,res) => {
    res.send("getting rating successfully!");
})
router.post('/',async(req,res) => {
    try { 
    await rating.create(req.body)
    res.status(201).json("created successfully!");
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
// router.put('/:id',async(req,res) => {
//     try {
//         const {id} = req.params;
//         const updatedRating = await rating.updateOne({_id:id}, { rating: req.body.rating});
//         res.json(updatedRating);
//       } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
// })
// router.delete('/:id',async(req,res) => {
//     try {
//         const {id}= req.params;
//         await rating.deleteOne({_id:id});
//         res.sendStatus(201).json('deleted rating successfully');
//       } catch (error) {
//         res.status(500).json(error);
//       }
// })

module.exports = router