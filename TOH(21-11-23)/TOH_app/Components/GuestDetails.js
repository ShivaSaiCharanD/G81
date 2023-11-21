import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function GuestDetails() {


    const [vno, setVNo] = useState('');

    const handleVnoChange = (event) => {
        document.getElementById('getResImg').innerHTML = "<img src='' alt='' />";
        document.getElementById('getRes').innerHTML = "<p></p>";
        setVNo(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Input : VehicleNo : ",vno);

        const response = await axios.get('http://localhost:4000/tollget',{
                params: {
                  vehicleNumber: vno,
                },
        });

        console.log("Output : PhoneNo : ",response.data[0].userMobileNumber);
        console.log("Output : Status : ",response.data[0].tyreStatus);
        document.getElementById('getResImg').innerHTML = "<img src="+response.data[0].userTyre64+" alt='Vehicle Tire' />";
        document.getElementById('getRes').innerHTML = "<p>Phone Number : "+response.data[0].userMobileNumber+"</p><p>Status : "+response.data[0].tyreStatus.class+"</p><p>Confidence : "+(response.data[0].tyreStatus.confidence*100).toFixed(1)+"%</p>";
    }

    return (
        <div className='GuestDetails'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1>Upload the data</h1>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="VehicleNumber" className="form-label">VehicleNumber</label>
                        <input type="text" onChange={handleVnoChange} className="form-control bg-dark" name="VehicleNumber" id="vehicleU" placeholder="MP10QR4354" required />
                    </div>
                    {/* <div className="col-md-8">
                        <label htmlFor="UserMobileNo" className="form-label">Owner Mobile Number</label>
                        <input type="number" className="form-control bg-dark" max={9999999999}  id="mobileNo" placeholder="xxxxxxxxxx" required/>
                    </div> */}
                    <br></br>
                    <div className="col-12">
                        <button type="submit" className="btn btn-dark detSub" id="blackbut">Submit</button>
                        <Link to="/guest" ><button type="submit" className="btn btn-dark back">Go Back</button></Link>
                    </div>
                    <br />
                    <div id='getRes'>

                    </div>
                    <div id="getResImg">
                        <img src="" alt="" />
                    </div>

                </form>
            </div>

        </div>
    );
}
