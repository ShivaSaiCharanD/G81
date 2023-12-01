// * Routes.js
// ! importing modules
const fs = require('fs').promises;
const fp = require('fs');
const cors = require('cors');
const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
const TollData = require('./models/TollDataSch');
const app = express();
const blobUtil = require('blob-util');

// ! defining port
const port = 4000;

// ! CORS 
app.use(cors());

// ! Multer config for TollUpload
const TollUp = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'TollUploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '.jpg');
  }
});
const Tollupload = multer({ storage: TollUp , limits: { fieldSize: 25 * 1024 * 1024 }})

// ! Multer config for GuestUpload
const GuestUp = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'GuestUploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '.jpg');
  }
});
const Guestupload = multer({ storage: GuestUp })

// ! MongoDB connection
// mongoose.connect('mongodb+srv://krishnamanoj:pvr@tires.rjqo4n7.mongodb.net/')
mongoose.connect('mongodb://localhost:27017/myFirst')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// ! Express config for parsing request body as JSON and serving static files
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ! TollUpload Route
app.post('/tollupload', Tollupload.single("TolluploadImage"), async (req, res) => {
  console.log("TollUpload Route");
  // ! getting data from request body
  const { vehicleNumber, userMobileNumber, userTyre64 } = req.body;

  // ! reading image file from uploads folder in buffer and converting to blob
  const tollImagePath = path.join(__dirname, 'TollUploads', 'TolluploadImage.jpg');
  const tollImageBuffer = await fs.readFile(tollImagePath);
  const tollBlob = blobUtil.createBlob([tollImageBuffer], { type: 'image/jpeg' });

  // ! sending blob to flask api
  const tollFlaskRequestData = new FormData();
  tollFlaskRequestData.append('image', tollBlob, 'TolluploadImage.jpg');
  let tollFlaskResponse = null;

  try {
    console.log("Sending file to flask api. . . ");
    const tollResponse_flask = await axios.post("http://127.0.0.1:5000/classify", tollFlaskRequestData)
    classification_result = tollResponse_flask.data;
    console.log("Classification Result : ", classification_result);
    tollFlaskResponse = classification_result;

    // ! checking if flask api returned error
    if (tollFlaskResponse["error"]) {
      console.log("Bad response from flask api");
      return res.status(500).send('Bad response from flask api');
    }

    try {

      //! defining schema for mongoDB
      const tollData = new TollData({
        vehicleNumber: vehicleNumber,
        userMobileNumber: userMobileNumber,
        userTyre64: userTyre64,
        tyreStatus: tollFlaskResponse
      });

      // ! saving to mongoDB
      await tollData.save();
      console.log('Data saved to MongoDB');
      res.send(`Data saved to MongoDB: ${JSON.stringify(tollData, null, 2)}`);
      // ! error handling for mongoDB
    } catch (err) {
      console.error('Error saving data to MongoDB:', err);
      res.status(500).send('Error saving data to MongoDB');
    }

    // ! deleting tire image from TollUploads folder

    //! Check if the file exists
    if (fp.existsSync(tollImagePath)) {
    //! Deleting the image and handling the errors
    fp.unlink(tollImagePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully.');
      }
    });
  } else {
    console.log('File not found');
  }

    // ! error handling in sending file to flask api
  } catch (error) {
    console.error("Error sending file to flask_api :", error);
    return res.status(500).send('Error sending file to flask_api');
  }
});

// ! GuestUpload Route
app.post('/guestUp', Guestupload.single("GuestuploadImage"), async (req, res) => {
  console.log("GuestUpload Route");
  // ! reading image file from uploads folder in buffer and converting to blob
  const guestImagePath = path.join(__dirname, 'GuestUploads', 'GuestuploadImage.jpg');
  const guestImageBuffer = await fs.readFile(guestImagePath);
  const guestBlob = blobUtil.createBlob([guestImageBuffer], { type: 'image/jpeg' });

  // ! sending blob to flask api
  const guestFlaskRequestData = new FormData();
  guestFlaskRequestData.append('image', guestBlob, 'guestTireImage.jpg');
  let guestFlaskResponse = null;

  try {
    console.log("Sending file to flask api. . . ");
    const guestResponse_flask = await axios.post("http://127.0.0.1:5000/classify", guestFlaskRequestData)
    classification_result = guestResponse_flask.data;
    console.log("Classification Result : ", classification_result);
    guestFlaskResponse = classification_result;

    // ! checking if flask api returned error
    if (guestFlaskResponse["error"]) {
      console.log("Bad response from flask api");
      return res.status(500).send('Bad response from flask api');
    }

    // ! deleting tire image from GuestUploads folder

      //! Check if the file exists
      if (fp.existsSync(guestImagePath)) {
        //! Deleting the image and handling the errors
        fp.unlink(guestImagePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log('File deleted successfully.');
          }
        });
      } else {
        console.log('File not found');
      }

    return res.send(guestFlaskResponse);
  }
  // ! error handling in sending file to flask api
  catch (error) {
    console.error("Error sending file to flask_api :", error);
    return res.status(500).send('Error sending file to flask_api');
  }
});


// ! GuestDetails Route
app.get('/guestDet', async (req, res) => {
  console.log("GuestDetails Route");
  try {
    // ! getting data from request query parameters
    const vehicleNumber = req.query.vehicleNumber;
    console.log("Input : VehicleNo : ", vehicleNumber);
    // ! getting data from mongoDB
    const tollData = await TollData.find({ vehicleNumber: vehicleNumber });
    // console.log(tollData)
    console.log("Output : PhoneNo : ", tollData[0].userMobileNumber);
    console.log("Output : TyreStatus : ", tollData[0].tyreStatus);
    console.log("Over")
    // ! sending data to client
    res.send(tollData);
  } 
  // ! error handling in getting data from mongoDB
  catch (err) {
    console.error('Error getting data from MongoDB:', err);
    // res.status(500).send('Internal Server Error');
    res.send("No Data Found");
  }
});

// ! Server listening on port 4000
app.listen(port, () => console.log(`Server is listening on port ${port}`));




