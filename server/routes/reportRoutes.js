/* eslint-disable no-unused-vars */
const express = require("express");
const reportRoutes = express.Router();
const Forms = require("../models/schema");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const uri = process.env.ATLAS_URI;

// Create storage engine
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

// Add FORM
reportRoutes.post("/add", upload.array("multiple_images"), (req, res) => {
  if (req.fileValidationError) {
    return res
      .status(400)
      .json({ "File upload Error": req.fileValidationError });
  } else if (!req.files) {
    // console.log({error:'Please select an image to upload'});
  }

  const data = req.body;
  data["attachments"] = req.files;

  const addTodo = new Forms(data);

  addTodo
    .save()
    .then(reqq => {
      // console.log('form added ', reqq);

      return res.status(200).json({ id: reqq._id });
    })
    .catch(err => {
      // console.log('form NOT added ', err);
      return res.status(400).json({ Error: err });
    });
});

// FIND FORM BY ID
reportRoutes.get("/findone/:id", async (req, res) => {
  const { id } = req.params;

  //await Forms.findOne({'_id': id}, (err, data) => err ? res.sendStatus(400) : res.json(data));
  await Forms.findOne({ _id: id })
    .then(reqq => {
      if (reqq) {
        // console.log('form found ', reqq);
        res.json(reqq);
      } else {
        res.status(400).json({ message: "form not found" });
      }
    })
    .catch(err => {
      res.status(400).json({ message: "form not found", error: err });
    });
});

// Edit form
reportRoutes.put("/edit/:id", async (req, res) => {
  const { id } = req.params;

  await Forms.findByIdAndUpdate(id, req.body)
    .then(reqq => {
      // console.log('form Updated ', reqq);
      res.sendStatus(200);
    })
    .catch(err => {
      // console.log('form NOT updated ', err);
      res.sendStatus(400);
    });
});

// Delete form
reportRoutes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  // console.log('Id of form to be DELETED', id);

  await Forms.findByIdAndDelete(id)
    .then(reqq => {
      // console.log('form deleted ', reqq);
      res.sendStatus(200);
    })
    .catch(err => {
      // console.log('form NOT deleted ', err);
      res.sendStatus(400);
    });
});

// Get allData
reportRoutes.get("/allData", (req, res) => {
  Forms.find((err, data) => (err ? res.sendStatus(400) : res.json(data)));
});

module.exports = reportRoutes;
