const express = require("express");
const router = express.Router();
const rating = require("../model/rating");


router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const avgRate = await rating.aggregate([
      { $match: { book: id } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
      // {
      //     $lookup: {
      //       from: 'rating', // Replace 'books' with the actual collection name for books
      //       localField: '_id',
      //       foreignField: '_id',
      //       as: 'name',
      //     },
      //   },
      //   { $unwind: 'title' },
    ]);
    res.status(201).json(avgRate);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
