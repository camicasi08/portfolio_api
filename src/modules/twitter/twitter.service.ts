import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {TwitterApi} from 'twitter-api-v2'
import { Tweet } from './tweet.model';
@Injectable()
export class TwitterService {
    twitterConfiguration: any;
    twitterClient: TwitterApi
    constructor(){
        const config = new ConfigService();
        this.twitterConfiguration = {
            appKey: config.get('twitter_api_key'),
            appSecret: config.get('twitter_secret_key'),
            accessToken: config.get('twitter_access_token'),
            accessSecret: config.get('twitter_secret_access_token')
        }

       
    }

    async getLastTweets(userId: any):Promise<Tweet[]>{     
        const  twitterClient = new TwitterApi(this.twitterConfiguration)
        
        const userTimeline = await twitterClient.v1.userTimeline(userId,{count:5});

        const results = userTimeline.tweets.map(tweet => {
            return {
                created_at: tweet.created_at,
                full_text: tweet.full_text,
                user: tweet.user.name,
                profile_image_url: tweet.user.profile_image_url_https
            }
        })
        return results;
    }
}
