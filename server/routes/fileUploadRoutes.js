const express = require('express');
const fileUploadRoutes = express.Router();
let gfs;
 
fileUploadRoutes.get('/fileUpload/files/:filename', (req, res) => {
  gfs.find(
    {
      filename: req.params.filename
    },
    (err, file) => {
      if (!file) {
        return res.status(404).json({
          err: 'no files exist'
        });
      }

      return res.json(file);
    }
  );
});

module.exports = fileUploadRoutes;