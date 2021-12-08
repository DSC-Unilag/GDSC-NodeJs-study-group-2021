# ASSIGNMENT ONE (AUTHENTICATION AND AUTHORIZATION)

### Setting up

- cd into the week one project

```bash
$ cd intermediate-week-1
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

  - Complete the pre-save document middleware in `/models/User`. It should hash the user's password when storing use details.
  - Complete the following controllers
    - sign up controller
    - login controller
    - refresh-token controller
    - get user info
  - Complete the authentication middleware
  - To check your work run

  ```bash
  $ npm test
  ```

  - **NOTE**:
    - Do not make changes to the test scripts

## SUBMISSION

- Push your work to your forked repo
- Create a new pull request to the week-1 branch of this repository
- Checks will be made on the PR you created. If the checks fail then you need to check your work again.
- The tutors will review your work and leave appropriate reviews for you.

Goodluck.
