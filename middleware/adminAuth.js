
const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;

const Admintocken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const user = jwt.verify(token, TOKEN_KEY);
        req.user = user;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

const isAdmin = (req, res, next) => {
    if(req.user.isAdmin) {
        next()
    } else {
        return res.status(403).send("Invalid Error Faild To Authorized !");
    }
}

module.exports = {Admintocken, isAdmin};