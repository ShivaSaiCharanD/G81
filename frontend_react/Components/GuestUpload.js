import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function GuestUpload() {
    const navigate = useNavigate();

    return (
        <div className='up'>
            <div>
                <form>
                    <div id="upload">

                    </div>
                    <div class="image col-9">
                        <label htmlFor="TyreImage" className="form-label"><h1>Upload Tire</h1></label>
                        <input type="file" accept='image/*' name="tyre" id="Tyreimage" />

                    </div>
                    <div class="col-12">
                        <button type="submit" className="btn btn-dark" id="blackbut">Submit</button>
                    </div>
                    <br />
                    <div>
                        <Link to="/guest"><button class="btn btn-dark " id="gbk">Go Back</button></Link>

                        {/* <button onClick={() => navigate(-1)} type="submit" className="btn btn-dark" id="blackbut">Go Back To Home</button> */}
                    </div>
                </form>
            </div>

        </div>
    );
}