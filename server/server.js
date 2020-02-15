const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const port = 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swagger = require('./swagger');

const Grid = require('gridfs-stream');

const reportRoutes = require('../server/routes/reportRoutes');
const fileUploadRoutes = require('../server/routes/fileUploadRoutes');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/report/docs', swagger.serve, swagger.setup);

// Setup morgan which gives us HTTP request logging.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));

//app.use(express.static('public'));

/************** mongodb ************************* */

const uri = process.env.ATLAS_URI;
// console.log('mongo uri', uri);

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => {
    // console.log('Database is connected'); 
  },
  // eslint-disable-next-line no-unused-vars
  err => { 
    // console.log('Can not connect to the database '+ err);
  }
  );
mongoose.Promise = global.Promise;

// init gfs
let gfs;

const connection = mongoose.connection;
connection.once('open', () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
  // console.log('MongoDB database connection established successfully');
});

/**************** ROUTES ********/
app.use('/report', reportRoutes); 
app.use('/report', fileUploadRoutes); 

app.get('/report/fileUpload/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } 
    if (file.contentType === 'application/pdf'){
      //res.json(file);
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    }
  });
});

// Setup a global error handler.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // console.error(`Global error handler: ${JSON.stringify(err.stack)}`);

  res.status(500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

// if none of the routes match
app.get('*', (req, res) => {
  res
    .status(404)
    .send({
      message: 'page not found'
    });
});

app.listen(port, () => {
  // console.log('Server listening on port ' + port)
});

module.exports.app = app;