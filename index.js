const { MONGO_HOST, MONGO_PASSWORD, MONGO_PORT, MONGO_USER } = require("./config/config")
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/?authSource=admin`;


mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to mongo database"))
    .catch((e) => console.log(e));



const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("<h2>Hi there</h2>");
});

app.listen(port), () => console.log(`listening on port ${port}`);