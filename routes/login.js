const express = require("express");
const router = express.Router();
const UserModel = require("../model/users.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const TOKEN_KEY = process.env.TOKEN_KEY;

router.post("/", async (req, res) => {

    try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
        res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
        { user_id: user._id, email },TOKEN_KEY,{expiresIn: "2h"});
        
        // save user token
        user.token = token;

        // user
        res.status(200).json(user);
    }
    // res.status(400).send("Invalid Credentials");
    } catch (err) {
    console.log(err);
    }
});

module.exports = router;