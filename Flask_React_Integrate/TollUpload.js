    import React from 'react'
    import { Link } from 'react-router-dom';

    export default function TollUpload() {

        return (
            <div className='TollUpload'>
                <div>
                    <form>
                        <div id="TollUploadText">
                            <h1>Upload the data</h1>
                        </div>
                        <div class="col-md-6">
                            <label htmlFor="VehicleNumber" id="TollVehNo" className="form-label">VehicleNumber</label>
                            <input type="text" className="form-control bg-secondary" id="TollVehicleNumber" placeholder="Ex:MP 10 QR 4354" />
                        </div>
                        <div class="col-md-8">
                            <label htmlFor="UserMobileNo" id="TollUserNo" className="form-label">User Mobile Number</label>
                            <input type="number" className="form-control bg-secondary"  id="TollUserMobileNo" placeholder="xxxxxxxxxx" />
                        </div>
                        <br></br>
                        <div class="image col-9">
                            <label htmlFor="TyreImage" id="TollUploadTire" className="form-label">Upload Tyre :</label>
                            <input type="file" accept='image/*' name="tyre" id="TollTireImage" />
                        </div>
                        <div class="col-12">
                            <button type="submit" id="TollSubmit" className="btn btn-dark">Submit</button>
                        </div>
                        <div>
                            <Link to="/toll" ><button type="submit" id='TollBack' className="btn btn-dark">Go Back To Home</button></Link>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
