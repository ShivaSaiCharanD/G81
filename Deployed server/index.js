// ! red for titles and routes
// ^ yellow for normal comments declarations
// * green for comments in routes
// & pink for APIs and connections
// todo for pending tasks
// ~ for testing
// ? for random

// ! Routes.js
// ^ importing modules
const fs = require('fs').promises;
const fp = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const axios = require('axios');
const { Storage } = require('@google-cloud/storage'); // Updated
const TollData = require('./models/TollDataSch');
const app = express();
const blobUtil = require('blob-util');
const { hostname } = require('os');
const dotenv = require('dotenv').config();

// ^ defining port
const port =  4000; // Updated

// ^ CORS
app.use(require('cors')()); // Updated

// & Multer config for TollUpload
const TollUp = multer.memoryStorage(); // Updated
const Tollupload = multer({ storage: TollUp, limits: { fieldSize: 25 * 1024 * 1024 } });

// & Multer config for GuestUpload
const GuestUp = multer.memoryStorage(); // Updated
const Guestupload = multer({ storage: GuestUp });

// & Google Cloud Storage connection
const storage = new Storage({
  projectId: 'deployflask-409215', // Updated
  keyFilename: 'C:/Users/yssmc/Downloads/deployflask-409215-ebd0880e3066.json', // Updated
});
const bucket = storage.bucket('tiresonhighways'); // Updated

// & MongoDB connection
mongoose.connect("mongodb://localhost:27017/myFirst")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// ^ Express config for parsing request body as JSON and serving static files
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//! TollUpload Route
app.post('/tollupload', Tollupload.single("TolluploadImage"), async (req, res) => {
  console.log("TollUpload Route");
  // * getting data from request body
  const { vehicleNumber, userMobileNumber, userTyre64 } = req.body;

  // * reading image file from uploads folder in buffer and converting to blob
  const tollImageBuffer = req.file.buffer;
  const tollBlob = blobUtil.createBlob([tollImageBuffer], { type: 'image/jpeg' });

  // * sending blob to flask api
  const tollFlaskRequestData = new FormData();
  tollFlaskRequestData.append('image', tollBlob, 'TolluploadImage.jpg');
  let tollFlaskResponse = null;

  const flask_port = 5000;

  try {
    console.log("Sending file to flask api. . . ");
    const tollResponse_flask = await axios.post(`https://flasktoh-409308.el.r.appspot.com/classify`, tollFlaskRequestData);
    const classification_result = tollResponse_flask.data;
    console.log("Classification Result : ", classification_result);
    tollFlaskResponse = classification_result;

    // * checking if flask api returned error
    if (tollFlaskResponse["error"]) {
      console.log("Bad response from flask api");
      return res.status(500).send('Bad response from flask api');
    }

    try {
      //* defining schema for mongoDB
      const tollData = new TollData({
        vehicleNumber: vehicleNumber,
        userMobileNumber: userMobileNumber,
        userTyre64: userTyre64,
        tyreStatus: tollFlaskResponse
      });

      // * saving to mongoDB
      await tollData.save();
      console.log('Data saved to MongoDB');
      res.send(`Data saved to MongoDB: ${JSON.stringify(tollData, null, 2)}`);
      // * error handling for mongoDB
    } catch (err) {
      console.error('Error saving data to MongoDB:', err);
      res.status(500).send('Error saving data to MongoDB');
    }

    // * error handling in sending file to flask api
  } catch (error) {
    console.error("Error sending file to flask_api :", error);
    return res.status(500).send('Error sending file to flask_api');
  }
});

// ! GuestUpload Route
app.post('/guestUp', Guestupload.any(), async (req, res) => {
  host = req.hostname;

  console.log("GuestUpload Route");
  // * reading image file from uploads folder in buffer and converting to blob

  const guestBlobArray = [];

  try {
    const files = req.files;

    for (let i = 0; i < files.length; i++) {
      const guestImageBuffer = files[i].buffer;
      const guestBlob = blobUtil.createBlob([guestImageBuffer], { type: 'image/jpeg' });
      guestBlobArray.push(guestBlob);
    }

    // * sending blob to flask api
    const guestFlaskRequestData = new FormData();
    guestBlobArray.forEach((guestBlob) => {
      guestFlaskRequestData.append('image', guestBlob, 'guestTireImage.jpg');
    });

    const guestFlaskResponse = [];

    try {
      console.log("Sending file to flask api. . . ");
      const guestResponse_flask = await axios.post("https://flasktoh-409308.el.r.appspot.com/classify", guestFlaskRequestData);
      for (let i = 0; i < files.length; i++) {
        guestFlaskResponse.push(guestResponse_flask.data[i]);
      }

      // * checking if flask api returned error
      if (guestFlaskResponse["error"]) {
        console.log("Bad response from flask api");
        return res.status(500).send('Bad response from flask api');
      }

      // * deleting tire image from GuestUploads folder
      for (let i = 0; i < files.length; i++) {
        // * Check if the file exists
        const guestImagePath = path.join(__dirname, 'GuestUploads', files[i].originalname);
        if (fp.existsSync(guestImagePath)) {
          //* Deleting the image and handling the errors
          fp.unlink(guestImagePath, (err) => {
            if (err) {
              console.error(`Error deleting file${i + 1}:`, err);
            } else {
              console.log(`File${i + 1} deleted successfully.`);
            }
          });
        } else {
          console.log(`File${i + 1} not found`);
        }
      }

      return res.send(guestFlaskResponse);
    }
    // * error handling in sending file to flask api
    catch (error) {
      console.error("Error sending file to flask_api :", error);
      return res.status(500).send('Error sending file to flask_api');
    }
  } catch (err) {
    console.error('Error reading folder:', err);
    return res.status(500).send('Error reading folder');
  }
});

// ! GuestDetails Route
app.get('/guestDet', async (req, res) => {
  console.log("GuestDetails Route");
  try {
    // * getting data from request query parameters
    const vehicleNumber = req.query.vehicleNumber;
    console.log("Input : VehicleNo : ", vehicleNumber);
    // * getting data from mongoDB
    const tollData = await TollData.find({ vehicleNumber: vehicleNumber });
    console.log("Output : PhoneNo : ", tollData[0].userMobileNumber);
    console.log("Output : TyreStatus : ", tollData[0].tyreStatus);
    console.log("Over")
    // * sending data to the client
    res.send(tollData);
  }
  // * error handling in getting data from mongoDB
  catch (err) {
    console.error('Error getting data from MongoDB:', err);
    res.send("No Data Found");
  }
});
app.get('/health', (req, res) => {
  res.send("Server is up and running");
});
// ^ Server listening on port 4000
app.listen(port, () => console.log(`Server is listening on port ${port}`));
