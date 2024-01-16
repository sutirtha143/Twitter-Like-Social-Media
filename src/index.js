import express from "express";
import {connect} from "./config/database.js";
import router from "./routes/index.js"
import bodyParser from "body-parser";
import Tweet from "./models/tweet.js";
import Hashtag from "./models/hashtag.js";
import TweetRepository from "./repository/tweet-repository.js";
import { passportAuth } from "./middlewares/jwt-middleware.js";
import passport from "passport";

const app = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(passport.initialize());
passportAuth(passport)

app.use("/api", router)

app.listen(3000, async () => {
    console.log("server stared at 3000")

    //mongodb connection established
    connect()

    console.log('mongoDB connected');

    // Tweet.create({
    //     content: "this is my third tweet",
    //     likes: 13,
    //     noOfRetweets: 4,
    //     comment: "my third comment"
    // })

    // Hashtag.create({
    //     text: "travel",
    //     tweets: ['653a10efef290617d8faf8ca']
    // })

    // const tweetRepo = new TweetRepository();
    // let tweets = await tweetRepo.deleteTweet({
    //     _id: '64da1785efdb6cc7cab1c569'
    // });
    // console.log(tweets);
    
})
