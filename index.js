const { MONGO_HOST, MONGO_PASSWORD, MONGO_PORT, MONGO_USER } = require("./config/config")
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const postRouter = require("./routes/postRoutes");

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    console.log("Attempting to connect to database...")
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connected to mongo database"))
        .catch((e) => {
            console.log(e);
            setTimeout(connectWithRetry, 5000)
        });
}

connectWithRetry();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("<h2>Hi there</h2>");
});

app.use("/api/posts", postRouter);

app.listen(port), () => console.log(`listening on port ${port}`);