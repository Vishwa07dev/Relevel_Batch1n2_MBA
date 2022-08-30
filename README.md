# Relevel_Batch1n2_MBA
Movie Booking Application

## Features
* Client can request the list of movies, list of bookings.
* Client can signup and login.

## How is the code organized in this repo ?
The whole codebase is present in the single branch [main]

## Prerequisite
- Understanding of Node.js
- Understanding of Async Await
- Mongo DB locally installed and running

## Tech
- Node.js
- mongoDB


## Installation

this app requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd movieBookingApplication
npm install
npm run devStart
```

## Rest endpoints
#### 1. Raise a new ecommerce-backed request

```sh
POST /category/all
Headers :
 Content-Type:application/json
Make the changes and raise a PR. Reach out to me over budayteja009@gmail.com


Sample response body :
[
    {
        "_id": "62a41f005a6794768b0009a3",
        "name": "Top Gun: Maverick",
        "description": "After more than 30 years of service as one of the Navy's top aviators, Pete Maverick Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him",
        "cast": [
            "Tom Cruise",
            "Jennifer Connelly",
            "Glen Powell"
        ],
        "director": "Joseph Kosinski",
        "trailerUrls": [
            "yt.be/topgunmaverick"
        ],
        "posterUrls": [
            "tom.cruise/topgunmaverick"
        ],
        "language": "ENGLISH",
        "releaseDate": "2022-02-24T00:00:00.000Z",
        "releaseStatus": "UNRELEASED",
        "theatres": [],
        "createdAt": "2022-06-11T04:50:08.195Z",
        "updatedAt": "2022-06-11T04:50:08.196Z",
        "__v": 0
    },
    {
        "_id": "62a41f005a6794768b0009a8",
        "name": "Top Gun: Maverick",
        "description": "After more than 30 years of service as one of the Navy's top aviators, Pete Maverick Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him",
        "cast": [
            "Tom Cruise",
            "Jennifer Connelly",
            "Glen Powell"
        ],
        "director": "Joseph Kosinski",
        "trailerUrls": [
            "yt.be/topgunmaverick"
        ],
        "posterUrls": [
            "tom.cruise/topgunmaverick"
        ],
        "language": "ENGLISH",
        "releaseDate": "2022-02-24T00:00:00.000Z",
        "releaseStatus": "UNRELEASED",
        "theatres": [],
        "createdAt": "2022-06-11T04:50:08.261Z",
        "updatedAt": "2022-06-11T04:50:08.261Z",
        "__v": 0
    },
    {
        "_id": "62a41f005a6794768b0009aa",
        "name": "Mission: Impossible – Dead Reckoning Part 1",
        "description": "Mission: Impossible – Dead Reckoning Part One is an upcoming American action spy film written and directed by Christopher McQuarrie. It will be the seventh and penultimate installment of the Mission: Impossible film series",
        "cast": [
            "Tom Cruise",
            "Jennifer Connelly",
            "Glen Powell"
        ],
        "director": "Joseph Kosinski",
        "trailerUrls": [
            "yt.be/topgunmaverick"
        ],
        "posterUrls": [
            "tom.cruise/topgunmaverick"
        ],
        "language": "ENGLISH",
        "releaseDate": "2022-02-24T00:00:00.000Z",
        "releaseStatus": "UNRELEASED",
        "theatres": [],
        "createdAt": "2022-06-11T04:50:08.268Z",
        "updatedAt": "2022-06-11T04:50:08.268Z",
        "__v": 0
    },
    {
        "_id": "62a41f005a6794768b0009ae",
        "name": "Mission: Impossible – Dead Reckoning Part 2",
        "description": "Mission: Impossible – Dead Reckoning Part One is an upcoming American action spy film written and directed by Christopher McQuarrie. It will be the seventh and penultimate installment of the Mission: Impossible film series",
        "cast": [
            "Tom Cruise",
            "Jennifer Connelly",
            "Glen Powell"
        ],
        "director": "Joseph Kosinski",
        "trailerUrls": [
            "yt.be/topgunmaverick"
        ],
        "posterUrls": [
            "tom.cruise/topgunmaverick"
        ],
        "language": "ENGLISH",
        "releaseDate": "2022-02-24T00:00:00.000Z",
        "releaseStatus": "UNRELEASED",
        "theatres": [],
        "createdAt": "2022-06-11T04:50:08.280Z",
        "updatedAt": "2022-06-11T04:50:08.280Z",
        "__v": 0
    },
    {
        "_id": "62a41f005a6794768b0009b2",
        "name": "Mission: Impossible – Dead Reckoning Part 3",
        "description": "Mission: Impossible – Dead Reckoning Part One is an upcoming American action spy film written and directed by Christopher McQuarrie. It will be the seventh and penultimate installment of the Mission: Impossible film series",
        "cast": [
            "Tom Cruise",
            "Jennifer Connelly",
            "Glen Powell"
        ],
        "director": "Joseph Kosinski",
        "trailerUrls": [
            "yt.be/topgunmaverick"
        ],
        "posterUrls": [
            "tom.cruise/topgunmaverick"
        ],
        "language": "ENGLISH",
        "releaseDate": "2022-02-24T00:00:00.000Z",
        "releaseStatus": "UNRELEASED",
        "theatres": [],
        "createdAt": "2022-06-11T04:50:08.288Z",
        "updatedAt": "2022-06-11T04:50:08.288Z",
        "__v": 0
    }
]
