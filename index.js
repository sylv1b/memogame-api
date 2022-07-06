const express = require('express');
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
    },
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/user", user);
app.use("/game", game);

const port = process.env.PORT || 5001;

// app.listen(port, () => console.log(`Server running on port ${port}`));
var server = app.listen(port, function () {
    //console.log(`App listening on port ${port}`)
})

module.exports = server