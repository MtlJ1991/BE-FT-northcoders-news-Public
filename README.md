## Northcoders News API

### Background

Northcoders News is a fullstack application designed to replicate the functionality of a reddit like website.
This section of the application is the back-end and as such will come with a set of instructions to follow.

### Installation

To bein with you will need to make sure you have the following installed:

NodeJS - https://nodejs.org/en/
NPM - https://www.npmjs.com/
Mongo - https://www.mongodb.com/

Once you have the latest versions of these three, you will be ready to get started.


  1. You need to ensure the following dependencies are installed, as you will need them to ensure this application runs smoothly.

  2. By using the 'npm i' command you will be able to install everything you need.
  thirdly you will need to seed your database, you can do this by running: ``` node seed/seed.js  ```

  3. In your terminal, run 'mongod' to ensure that you are connected, enabling you acces to the database.
  


### Usage

To run the database locally run the following command in the terminal: ``` npm run dev  ```

To use this application please add the following routes to this url. 

https://quiet-meadow-47556.herokuapp.com

By using this restful api you will be able to see the data that is being returned.

```
GET /api/topics
```
Get all the topics

```
GET /api/topics/:topic_id/articles
```
Return all the articles for a certain topic

```
GET /api/articles
```
Returns all the articles

```
GET /api/articles/:article_id/comments
```
Get all the comments for a individual article

```
POST /api/articles/:article_id/comments
```
Add a new comment to an article. This route requires a JSON body with a comment key and value pair
e.g: {"comment": "This is my new comment"}

```
PUT /api/articles/:article_id
```
Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
e.g: /api/articles/:article_id?vote=up

```
PUT /api/comments/:comment_id
```
Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
e.g: /api/comments/:comment_id?vote=down

```
DELETE /api/comments/:comment_id
```
Deletes a comment

```
GET /api/users/:username
```
Returns a JSON object with the profile data for the specified user.


### Tests

To run tests on this application please ensure you're connected to Mongod in your terminal.
After you're connected simply run 'npm test' which will run the test suite for both the functions and their error handling.
All tests can be found within the spec folder.

I hope you enjoy.

If you encounter any issues with the application, please contact me on mtlj1991@gmail.com
