# Sample Express API Project

This is a sample Express API that was built as a take home project for a potential employer.

It requires an API key for the <https://www.fillout.com/> api to be stored in the environment variable.

## Project Requirements

Create a simple REST API server which interacts with [Fillout.com’s API](https://www.fillout.com/help/fillout-rest-api)  to fetch form responses, but with an option to filter based on certain answers.

Please use the following API key to fetch responses from a demo account we’ve set up: `****************************************************`, with this demo form ID: `cLZojxk94ous`

## Server specifications

Your server only needs to implement one endpoint, for fetching responses from a form, but with filters. Your endpoint should mirror the [existing responses endpoint of our API](https://www.fillout.com/help/fillout-rest-api#d8b24260dddd4aaa955f85e54f4ddb4d), except will have a new parameter for filtering. Please use NodeJS. We prefer Express.js, but you can use other frameworks if you’d like.

### Note

Fillout forms sometimes have things other than question answers in the responses, but you can assume for this assignment, that the ids to filter by will only ever correspond to form questions, where the values are either string, number, or strings which are ISO dates.

The instructions above said to only account for the questions array, but I constructed in a way that it will loop all present arrays and if the object has the proper fields/keys, it will check that object.
