const cors = require("cors");
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
const URL_DB = process.env.URL_DB;

// Import Files
const ratingRouter = require('./routes/rating');
const userRouter = require('./routes/users.js');
const registerRouter = require('./routes/register.js');
const loginRouter = require('./routes/login.js');
const angRateRouter = require('./routes/avgRate');
const auth = require('./middleware/auth.js');
const categoryRouter = require('./routes/category');
const booksRouter = require('./routes/books')
const authorRouter = require('./routes/author');



app.use(cors())

// Category Route
app.use('/category', categoryRouter);
// rating Route
app.use('/rating', ratingRouter);
// user route
app.use('/users', userRouter);
// register route
app.use('/register', registerRouter);
// // login route
app.use('/login', loginRouter);
// // avgrate route
app.use('/avgRate', angRateRouter);
// welcome after auth
app.post('/welcome', auth, (req, res) => {
    res.send("Welcome ");
});
app.use('/books', booksRouter)
app.use('/author', authorRouter);


app.use("/images", express.static(__dirname + '/storage'));



// Connect TO DB
mongoose.set('strictQuery', true);
mongoose.connect(URL_DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    (err) => {
        if (!err) {
            console.log("DB Connected");
        } else {
            console.log('faild to connect');
        }
    });

app.listen(PORT, (err) => {
    if (!err) return console.log(`you are listening on ${PORT}`);
    console.log(err);
});
