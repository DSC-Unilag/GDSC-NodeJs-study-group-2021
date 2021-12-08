# ASSIGNMENT TWO (TYPESCRIPT AND TESTING)

### Setting up

- cd into the week one project

```bash
$ cd intermediate-week2-3
$ cd typescript
$ npm install
```

- In the root directory of the project create a **.env** file and copy the values from **.env.sample** and set the values of the veriables correctly.
- To run locally you'll need
  - URI to a mongoDB server running locally or in the cloud
- To run locally after setting the environment variables correctly.

  - To run in development mode

  ```bash
  $ npm run dev
  ```

  - To test your code
  - Run in your terminal

  ```bashD
  $ npm test
  ```

  ## TASKS

  - There is a javascript directory. It contains a complete code that is running properly.
  - To run the code locally
  - create a .env file similar to .env.sample
  - Set the values of the variables
  - cd into the javascript folder

  ```bash
  $ cd javascript
  $ npm install
  $ npm run dev
  ```

  - There is also a typescript directory where the files there have the same structure as with the javascript directory.
  - Some files have been completed for you.
  - You are to update all files and get the typescript application to work.
  - Write tests for the endpoints you have created and ensure that they work.
  - You can make as many changes as possible to make your app run properly.
  - The following modules in the typescript app require your attention.
    - src/controllers/auth
    - src/controllers/quote
    - src/models/Quote.ts
    - src/routes
    - src/utils/token.ts
    - src/tests
  - Remember that the reference is the javascript app.
  - Basically you're converting that javascript app into a typescript app.

  - To test your app run

  ```bash
  $ npm test
  ```

## SUBMISSION

- Push your work to your forked repo
- Create a new pull request to the week-2-3-intermediate branch of this repository
- The tutors will review your work and leave appropriate reviews for you as soon as they can.

Goodluck.
