//Routes.js
const cors = require('cors');
const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const TollData = require('./models/TollDataSch');
let getfields=multer()


const app = express();
const port = 4000;

app.use(cors());

// mongoose.connect('mongodb+srv://krishnamanoj:pvr@tires.rjqo4n7.mongodb.net/')
mongoose.connect('mongodb://localhost:27017/myFirst')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: false }));


app.post('/tollupload',  getfields.any(), async (req, res) => {

  if(req.body.vehicleNumber==null || req.body.userMobileNumber==null || req.body.userTyre64==null || req.body.tyreStatus==null){
    console.log("Error: Invalid Input");
    res.send("Error: Invalid Input");
  }

  console.log("req.body accessed successfully");

  const { vehicleNumber, userMobileNumber , userTyre64 , tyreStatus } = req.body;

  const tollData = new TollData({
    vehicleNumber: vehicleNumber,
    userMobileNumber: userMobileNumber,
    userTyre64: userTyre64,
    tyreStatus: tyreStatus
  });

  try {
    await tollData.save();
    console.log('Data saved to MongoDB');
    res.send(`Data saved to MongoDB: ${JSON.stringify(tollData, null, 2)}`);
  } catch (err) {
    console.error('Error saving data to MongoDB:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/tollget', async (req, res) => {
  try {
    // console.log(req.query);
    const vno = req.query.vehicleNumber;
    console.log("Input : VehicleNo : ",vno);
    const tollData = await TollData.find({vehicleNumber:vno});
    // console.log(tollData)
    console.log("Output : PhoneNo : ",tollData[0].userMobileNumber);
    res.send(tollData);
  } catch (err) {
    console.error('Error getting data from MongoDB:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));


