import React from 'react'
import { Link } from 'react-router-dom';

export default function GuestDetails() {

    return (
        <div className='GuestDetails'>
            <div>
                <form>
                    <div>
                        <h1>Upload the data</h1>
                    </div>
                    <div class="col-md-6">
                        <label htmlFor="VehicleNumber" className="form-label">VehicleNumber</label>
                        <input type="text" className="form-control bg-dark" id="vehicleU" placeholder="Ex:MP 10 QR 4354" required />
                    </div>
                    <div class="col-md-8">
                        <label htmlFor="UserMobileNo" className="form-label">Owner Mobile Number</label>
                        <input type="number" className="form-control bg-dark" max={9999999999}  id="mobileNo" placeholder="xxxxxxxxxx" required/>
                    </div>
                    <br></br>
                    <div class="col-12">
                        <button type="submit" className="btn btn-dark detSub" id="blackbut">Submit</button>
                        <Link to="/guest" ><button type="submit" className="btn btn-dark back">Go Back</button></Link>
                    </div>
                   
                </form>
            </div>

        </div>
    );
}