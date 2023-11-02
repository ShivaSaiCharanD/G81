import React from 'react'
import { Link } from 'react-router-dom';

export default function GuestDetails() {

    return (
        <div className='up'>
            <div>
                <form>
                    <div id="upload">
                        <h1>Upload the data</h1>
                    </div>
                    <div class="col-md-6">
                        <label htmlFor="VehicleNumber" className="form-label">VehicleNumber</label>
                        <input type="text" className="form-control bg-secondary" id="VehicleNumber" placeholder="Ex:MP 10 QR 4354" />
                    </div>
                    <div class="col-md-8">
                        <label htmlFor="UserMobileNo" className="form-label">Owner Mobile Number</label>
                        <input type="number" className="form-control bg-secondary" max={' 10'} id="UserMobileNo" placeholder="xxxxxxxxxx" />
                    </div>
                    <br></br>
                    <div class="col-12">
                        <button type="submit" className="btn btn-dark" id="blackbut">Submit</button>
                    </div>
                    <div>
                        <Link to="/guest" ><button type="submit" className="btn btn-dark" id="blackbut">Go Back</button></Link>
                    </div>
                </form>
            </div>

        </div>
    );
}
