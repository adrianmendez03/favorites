const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
    })
}

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

// connect to mongo

mongoose.Promise = global.Promise;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const favoritesRouter = require('./routes/favorites');

// Routes

app.use('/users', usersRouter);
app.use('/favorites', favoritesRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})