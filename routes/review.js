const express = require('express');
const review = require('../model/review')
const router = express.Router();


router.get('/',async(req,res) => {
    try {
        const getReview =await review.find({})
        res.status(201).json(getReview)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
   
})
router.get('/:id',async(req,res) => {
    try {
        const {id} = req.params;
        const getReview =await review.findById({_id:id})
        res.status(201).json(getReview)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
   
})
router.post('/',async(req,res) => {
    try { 
  const createReview=  await review.create(req.body)
    res.status(201).json(createReview);
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.put('/:id',async(req,res) => {
   
    
    try {
        const {id} = req.params;
        // const updatedReview = await review.findByIdAndUpdate({_id:id}, { review : req.body.comment });
        const updatedReview = await review.updateOne({_id:id },{ ...req.body});
        res.status(201).json(req.body);
       
      } catch (error) {
        res.status(500).json( error);
        console.log(error);
      }
})
router.delete('/:id',async(req,res) => {
    try {
        const {id}= req.params;
        const deleteReview = await review.deleteOne({_id:id});
        res.status(201).json(`deleted review successfully`);
      } catch (error) {
        res.status(500).json({error:'ahmed'});
      }
})

module.exports = router