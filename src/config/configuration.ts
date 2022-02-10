export const configuration = () => {
    return {
        twitter_api_key: process.env.TWITTER_API_KEY,
        twitter_secret_key: process.env.TWITTER_SECRET_KEY,
        twitter_access_token: process.env.TWITTER_ACCESS_TOKEN,
        twitter_secret_access_token: process.env.TWITTER_SECRET_ACCESS_TOKEN

    }
}