var express = require('express');
let cors = require("cors");
var app = express();
const mongoose = require("mongoose");

app.use(cors());
app.options('*', cors());

// routes
const user = require('./src/routes/user')
const game = require('./src/routes/game')

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./src/config/keys");

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.get('/', function (req, res) {
    res.send('Welcome to MGA (aka memo game api)');
})

app.use("/user", user);
app.use("/game", game);

const port = process.env.PORT || 5001;

// app.listen(port, () => console.log(`Server running on port ${port}`));
var server = app.listen(port, function () {
    //console.log(`App listening on port ${port}`)
})

module.exports = server