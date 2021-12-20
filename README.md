# speedy-standup-ui
A quick and easy way to manage blockers of a team

<img width="1440" alt="Screen Shot 2021-12-20 at 3 13 39 PM" src="https://user-images.githubusercontent.com/22187853/146842228-6147ab53-2d13-4cba-95b7-a95ef20e05c2.png">

## Features

The ability to create and delete blockers for a user on specific days

View blockers for each day and manage

Chat with fellow users


## Get started

```bash
npm install && npm start
```

To access the app locally visit ```https://speedy-standup-ui.herokuapp.com``` and create an account and login in with those credentials.

You will need to provide a `.env` file with the base url of the server you would like to communicate with.

## Tests
```bash
npm test
```

Jest tests using `testing-library/react` and `axios-mock-adapter`


## Tech Notes

Powered by ```speedy-standup.herokuapp.com```

Create React App using TypeScript, Material UI, moment, and react-storage-hooks for persistant storage.



