const { MONGO_HOST, MONGO_PASSWORD, MONGO_PORT, MONGO_USER, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config")
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');


let RedisStore = require("connect-redis")(session);

let redisClient = redis.createClient({ host: REDIS_URL, port: REDIS_PORT });





const app = express();

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

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

app.enable("trust proxy");

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: false,
            resave: false,
            saveUninitialized: false,
            httpOnly: true,
            //maxAge: 1.8e+6 //30 minutes
            maxAge: 60000
        }
    })
);

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
    res.send("<h2>Hi there this is the API</h2>");
});

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

app.listen(port), () => console.log(`listening on port ${port}`);
