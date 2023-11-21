// TollUpload.js
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function TollUpload() {

  const [img, setImg] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [base64String, setBase64String] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState(null);
  const [userMobileNumber, setUserMobileNo] = useState(null);

  const handleVNOChange = (event) => {
    document.getElementById('TollUploadResult').innerHTML = "<p></p>";
    setVehicleNumber(event.target.value);

  }

  const handleMNOChange = (event) => {
    document.getElementById('TollUploadResult').innerHTML = "<p></p>";
    setUserMobileNo(event.target.value);
  }

  const handleImageChange = async (event) => {
    document.getElementById('TollUploadResult').innerHTML = "<p></p>";
    const file = event.target.files[0];
    setImg(file);
    setClassificationResult('');

    function convertToBase64(file) {
      if (file) {

        //Making Req to flask_api
        const formData = new FormData();
        formData.append("image", img);
        async function makeReq(formData) {
          console.log("Uploading file...");
          // console.log("image");
          // console.log(formData);
          try {
            const response_flask = await axios.post("http://127.0.0.1:5000/classify", formData)
            setClassificationResult(response_flask.data);
            console.log("Classification Result : ", response_flask.data);
          } catch (error) {
            console.error("Error sending file to flask_api :", error);
          }
        }
        makeReq(formData);


        //Converting image to base64String
        const reader = new FileReader();
        reader.onload = (e) => {
          const base = e.target.result;
          // console.log(base); // To log the string
          setBase64String(base);
        };
        reader.readAsDataURL(file);

      }
      else {
        console.log("Error converting to base64String");
      }
    }
    convertToBase64(file);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    
    const requestData = {
      vehicleNumber: vehicleNumber,
      userMobileNumber: userMobileNumber,
      userTyre64: base64String,
      tyreStatus: classificationResult,
    };

    console.log(requestData);

    async function call_express(requestData) {
      try {
        const response_express = await axios.post('http://localhost:4000/tollupload', requestData, {
          headers: {
            'Content-Type': 'application/json/multipart/form-data',
          },
        });

        // Handle the response, if needed
        console.log(response_express);
        document.getElementById('TollUploadResult').innerHTML = "<p>Uploaded Successfully</p>";

      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }


    if (vehicleNumber && userMobileNumber && base64String && classificationResult) {
      call_express(requestData);
    }
    else {
      console.log("Error : One or more fields are empty");
    }

    document.getElementById('TollUploadForm').reset();
  };

  return (
    <div className='TollUpload'>
      <div>
        <form onSubmit={handleSubmit} encType='multipart/form-data'  id='TollUploadForm'>
          <div id="TollUploadText">
            <h1>Upload the data</h1>
          </div>
          <div className="col-md-6">
            <label htmlFor="VehicleNumber" id="TollVehNo" className="form-label">VehicleNumber</label>
            <input type="text" className="form-control bg-secondary" onChange={handleVNOChange} id="TollVehicleNumber" placeholder="MP10QR4354" required />
          </div>
          <div className="col-md-8">
            <label htmlFor="UserMobileNo" id="TollUserNo" className="form-label">User Mobile Number</label>
            <input type="number" className="form-control bg-secondary" onChange={handleMNOChange} id="TollUserMobileNo" placeholder="xxxxxxxxxx" required/>
          </div>
          <br />
          <div className="image col-9">
            <label htmlFor="TyreImage" id="TollUploadTire" className="form-label">Upload Tyre :</label>
            <input type="file" accept='image/*' name="tyre" onChange={handleImageChange}  required id="TollTireImage" />
          </div>
          <div className="col-12">
            <button type="submit" id="TollSubmit" className="btn btn-dark">Submit</button>
          </div>
        </form>
        <br />
        <br />
        <br />
        <div id='TollUploadResult'></div>
        <div>
          <Link to="/"><button type="submit" id='TollBack' className="btn btn-dark">Go Back To Home</button></Link>
        </div>
      </div>
    </div>
  );

}