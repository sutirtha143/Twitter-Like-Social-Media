import mongoose from "mongoose";

const tweetSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    noOfRetweets: {
        type: Number
    },
    comment:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    image: {
        type: String
    }
})

const Tweet = mongoose.model("Tweet", tweetSchema)
export default Tweet