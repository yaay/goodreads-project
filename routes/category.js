const express = require('express');
const category = require('../model/category');
const router = express.Router();


router.get('/', async(req,res)=>{

    try {
        const getCategory = await category.find({})
        res.status(201).json(getCategory)
    } catch (error) {
        res.status(500).json(error)
    }
});
router.get('/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const getCatById=  await category.findById({_id :id})
        res.status(200).json(getCatById)
    } catch (error) {
        res.status(500).json(error)
    }
  
});

router.post('/',async(req,res) => {
    try {
       
        const createCategory = await category.create({...req.body})
        res.status(201).json("add category successfully")
    } catch (error) {
        res.status(500).json({error})
    }
})

router.put('/:id',async(req,res)=>{
    try {
        const {id}= req.params
        const editCategory = await category.updateOne({_id:id },{ name:req.body.name})
        res.status(201).json("updated Name Successfully")
    } catch (error) {
        res.status(500).json({error})
    }
   
});

router.delete('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteCategory = await category.deleteOne({_id:id})
        res.status(201).json("delete Category Successfully")
    } catch (error) {
        res.status(500).json({error})
    }
    
});


module.exports = router;