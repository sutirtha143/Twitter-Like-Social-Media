import { useState } from 'react'
import AddTweet from './AddTweet'
import TweetList from './TweetList'

const dummyTweets = [
  {id: 0, content: "there is a new app known as Threads", likeCount: 3, createdAt: new Date()},
  {id: 1, content: "there is a new app known as signal", likeCount: 7, createdAt: new Date()},
  {id: 2, content: "there is a new app known as WeChat", likeCount: 10, createdAt: new Date()}
]

const Twitter = () => {
    const [tweets, setTweets] = useState(dummyTweets);
    
    const handleAddTweet = (text) => {
        const nextId = (tweets.length > 0) ? tweets[tweets.length - 1].id+1 : 0;
        setTweets([...tweets, {
            content: text,
            likeCount: Math.floor(Math.random()* 10),
            id: nextId,
            createdAt: new Date()
        }])
    }

    const handleEditTweet = (tweet) => {
        setTweets(
          tweets.map((currentTweet) => {
            if(currentTweet.id === tweet.id){
              return tweet;
            }else{
              return currentTweet;
            }
          })
        )
    }

    const sortTweets = () => {
      tweets.sort((t1,t2) => t2.createdAt.getTime() - t1.createdAt.getTime())
      setTweets([...tweets])
    }

  return (
    <>
      <AddTweet onAddTweet={handleAddTweet}/>  
      <button onClick={sortTweets}>
        Sort Tweets
      </button>
      <TweetList tweets={tweets} onEditTweet={handleEditTweet}/>
    </>
  )
}

export default Twitter