const express = require("express");
const router = express.Router();
const UserModel = require("../model/users.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cloudinary = require('../middleware/cloudinary.js');
const upload = require("../middleware/upload.js");


router.post("/", upload("users").single("image"), async (req, res) => {
    try {
        const { f_name, l_name, email, password } = req.body;

        if (!(email && password && f_name && l_name)) {
            return res.status(400).send("all inputs are required");
        }
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "users" });

        const oldUser = await UserModel.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exists. Please Login");
        }

        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            f_name,
            l_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            imageUrl: result.secure_url,
            publicID: result.public_id
        })
        // Create token
        const token = jwt.sign({
            user_id: user._id,
            email
        },
            process.env.TOKEN_KEY, { expiresIn: "2h" });
        // save user token
        user.token = token;
        // return new user
        return res.status(201).json(user);

    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;