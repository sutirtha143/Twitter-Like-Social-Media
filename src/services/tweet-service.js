import TweetRepository from "../repository/tweet-repository.js"
import HashtagRepository from "../repository/hashtag-repository.js"

class TweetService {

    constructor(){
        this.tweetRepository = new TweetRepository()
        this.hashtagRepository = new HashtagRepository()
    }

    async create(data){

        const content = data.content;
        const tags = content.match(/#+[a-zA-Z0-9(_)]+/g).
        map((tag) => tag.substring(1).toLowerCase());
        
        //storing the tweet
        const tweet = await this.tweetRepository.create(data);

        let alreadyPresentTags = await this.hashtagRepository.findByName(tags)
        //console.log(alreadyPresentTags) it shows below text
        // [
        //     {
        //       _id: new ObjectId("653a13cca98e55ddfa2165d6"),
        //       text: 'travel',
        //       tweets: [ new ObjectId("653a10efef290617d8faf8ca") ],
        //       __v: 0
        //     }
        //   ]

        let textOfPresentTags = alreadyPresentTags.map(tags => tags.text)
        //console.log(textOfPresentTags) [travel]
        let newTags = tags.filter(tag => !textOfPresentTags.includes(tag))
        newTags = newTags.map(tag => {
            return {text:tag,tweets: [tweet.id]}
        })
        //console.log(newTags)  [ { text: 'beach', tweets: [ '653a1ba904e0abd273fb5f38' ] } ]

        await this.hashtagRepository.bulkCreate(newTags)
        alreadyPresentTags.forEach((tag) => {
            tag.tweets.push(tweet.id)
            tag.save();
        })

        //console.log(tweet)
        return tweet;

    }

    async getTweet(tweetId){
        const tweet = await this.tweetRepository.getTweet(tweetId)
        return tweet;
    }
}

export default TweetService;

// ({
    //     content: "this is my third tweet",
    //     likes: 13,
    //     noOfRetweets: 4,
    //     comment: "my third comment"
    // })