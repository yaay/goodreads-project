const express = require("express");
const router = express.Router();
const UserModel = require("../model/users.js");
const cloudinary = require('../middleware/cloudinary.js');
const upload = require("../middleware/upload.js");
const ObjectID = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');


// Get All Data From DB
router.get("/", (req, res) => {
    UserModel.find({}, (err, usersData) => {
    if (!err) {
            return res.status(200).json(usersData);
        } else {
            return res.status(500).json({ Error: "DB_ERROR" });
        }
    });
});

// Get Data of user by id From DB
router.get("/:id", (req, res) => {
    const { id } = req.params;
    if(!ObjectID.isValid(id)){
        res.status(400).json({
            Error: 'Id Is Not Valid in DB'
        })
    }
    else {
        UserModel.findById(id, (err, userData) => {
            if (!err) {
                return res.json(userData);
            } else {
                return res.status(500).json({ Error: "DB_ERROR" });
            }
        });
    }
});


// Update By Id
router.patch("/:id", upload("users").single('image') , async (req, res) => {
    try {
            const { id } = req.params;
            let user = await UserModel.findById(id);
            if(!user) {
                return res.status(404).send("User Not Found")
            }
            if(req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                await cloudinary.uploader.destroy(user.publicID);
                const image = {
                    imageUrl: result.secure_url || user.imageUrl,
                    publicID: result.public_id || user.publicID
                }
                user = await UserModel.findByIdAndUpdate(id, image, {new: true});
            }
            const data = {
                f_name: req.body.f_name || user.f_name,
                l_name: req.body.l_name || user.l_name,
                password: await bcrypt.hash(req.body.password, 10) || user.password,
                email: req.body.email || user.email
            }
            user = await UserModel.findByIdAndUpdate(id, data, {new: true});
            res.status(200).send("update Successfully!");
            
        } catch(err) {
            console.log(err);
            res.status(500).send('server' + err)
            }
});

// // Delete By ID1
router.delete("/:id", async (req, res) => {
    try {
            const { id } = req.params;
            
            let user = await UserModel.findById(id);
        
            await cloudinary.uploader.destroy(user.publicID);
            
            await user.remove()

            res.status(200).json(`Deleted One Record`);
        } catch (err) {
            console.log(err);
            res.status(500).json({ Erorr: "DB_ERROR" });
    }
});

module.exports = router;

