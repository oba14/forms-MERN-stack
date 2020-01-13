[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/oba14/forms-MERN-stack/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) [![mongodb](https://img.shields.io/badge/mongoDB-3.4.1-blue)](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3) [![npm](https://img.shields.io/npm/v/react.svg?style=flat)](https://nodejs.org/en/download/package-manager/) [![redux](https://img.shields.io/badge/redux-4.04-blue)](https://www.npmjs.com/package/redux) [![express](https://img.shields.io/badge/express-4.17.1-blue)](https://www.npmjs.com/package/express) 

<h1 align="center">
Data storage and retrieval from mongodb using MERN stack.
  </h1>
<p> 
An application to display how we can store forms data (input fields, multiple attachments) to mongodb using multer and gridfs. GridFS is a specification for storing and retrieving files that exceed the BSON-document size limit of 16 MB and multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. For frontend we are using react and for state management redux is used. Forms are created using react hook form and uploaded to mongodb atlas through an express server. Users can create, update and delete form data. 
</p>



## Prerequirements
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^16.12.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client  
$ npm i       // install pacakges
$ npm start  // start the server
```
## Server-side usage(PORT: 5000)
```terminal
$ cd server   // go to server folder
$ npm i       // npm install pacakges
$ npm sart    // run it locally

add mongo uri to environment variable. 
```
# Dependencies(tech-stacks)
Client-side | Server-side
--- | --- 
react-hook-form | body-parser: ^1.15.2
reactstrap: 8.2.0 | cors: ^2.8.1
react: ^16.9.0 | dotenv: ^2.0.0
react-dom: ^16.9.0 | express: ^4.14.0
react-redux: ^4.0.0 | gridfs
react-router-dom: ^5.1.2 | mongoose: ^4.7.4
redux: ^4.0.0 | morgan: ^1.7.0
redux-thunk: ^2.3.0 | multer-gridfs-storage: ^4.0.1
axios: ^0.19.0 | multer: ^1.4.2

### License
[MIT](https://github.com/oba14/forms-MERN-stack/blob/master/LICENSE)
