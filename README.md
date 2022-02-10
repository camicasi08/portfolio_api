# Portfolio Backend

## Getting started

### Installation

Install dependencies

```bash
npm install
```

For this project we are using the **[serverless framework](https://www.serverless.com/)** to facilitate the implementation of the serverless architecture. We need to install globally the tool

```bash
npm install -g serverless
```

Also  to make the local testing we are using a dynamoDb local instance. We must install the service to run locally dynamo (run the command in the project root)

```bash
sls dynamodb install
```

### Setting env variables

Use the .env.example file as a guide to create the .env file. Here, you should specify the twitter credentials.

## Running the app 

### Run test

```bash
npm test
```
### Start application 
```bash
npm start
```

Which should result in:

```bash
> portfolio@0.0.1 start
> npm run build && sls offline start

> portfolio@0.0.1 prebuild
> rimraf dist

> portfolio@0.0.1 build
> nest build

Dynamodb Local Started, Visit: http://localhost:8000/shell
DynamoDB - created table PortfoliosTable-dev
Seed running complete for table: PortfoliosTable-dev

Starting Offline at stage dev (us-east-1)

Offline [http for lambda] listening on http://localhost:3002
Function names exposed for local invocation by aws-sdk:
           * main: portfolio-backend-dev-main

   ┌────────────────────────────────────────────────────────────────────────┐
   │                                                                        │
   │   ANY | http://localhost:3000/dev/{any*}                               │
   │   POST | http://localhost:3000/2015-03-31/functions/main/invocations   │
   │                                                                        │
   └────────────────────────────────────────────────────────────────────────┘

Server ready: http://localhost:3000 🚀

Enter "rp" to replay the last request
```

When we run the **start** command the database is going to be populated with default information using a seeder (./seeders/portfolio.seed.json)

## Using the API

You can use the postman collection attached **portfolio.postman_collection.json** to test the endpoints.

### GET /dev/portfolio/:id

#### Successful response

```json
{
    "firstName": "Kara",
    "lastName": "Cleveland",
    "experienceSummary": "Human Resources Assistant I",
    "address": "94 Cottonwood Parkway",
    "phone": "921-733-8679",
    "twitterUser": "kcleveland2d",
    "imageUrl": "http://dummyimage.com/131x100.png/ff4444/ffffff",
    "id": "7339a668-b10a-4e91-af8e-c1078555e863",
    "email": "kcleveland2d@dell.com",
    "tweets": [
        {
            "created_at": "Sun Nov 08 23:12:45 +0000 2020",
            "full_text": "this is my test from Java",
            "user": "Wilsonnn",
            "profile_image_url": "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
        },
        {
            "created_at": "Sun Nov 08 23:01:35 +0000 2020",
            "full_text": "this is my message RPMC",
            "user": "Wilsonnn",
            "profile_image_url": "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
        }
    ]
}
```

#### Failed response

```json
{
    "statusCode": 404,
    "message": "Portfolio with ID \"7339a668-b10a-4e91-af8e-c1078555e8631\" not found",
    "error": "Not Found"
}
```

### PATCH /dev/portfolio/:id

#### Successfull response

```json
{
    "ok": true
}
```

#### Failed response

```json
{
    "statusCode": 404,
    "message": "Portfolio with ID \"7339a668-b10a-4e91-af8e-c1078555e8631\" not found",
    "error": "Not Found"
}
```

## Tech stack

- **Backend Framework**: NestJS
- **Database**: DynamoDB (Used locally)
- **Twitter Integration**: npm module **twitter-api-v2**
- Serverlesss framework (Used locally)

## Discussion

- For this test, I spent almost 16hrs. It wasn't for the complexity of the project, it was because I had to investigate the different technologies required for the test. I want to be honest, it was my first time working with dynamoDB, and serverless, even NestJS. It was a good opportunity to show my ability to adapt to different environments and technologies
- I could not deploy the app because AWS has not verified my personal account. For this reason, I am running the project locally.

