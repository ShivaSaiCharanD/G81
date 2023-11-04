import React from "react";
import { Link } from "react-router-dom";
// import {useNavigate } from 'react-router-dom'
export default function Guest() {
    // const navigate = useNavigate();
    return (
        <div className="Guest">
            <div >
                <Link to="/guest/upload"><button type="button" class="btn btn-dark Guestbt">Upload Your Tire Image Here</button></Link>
                <br />
                <br />
                <Link to="/guest/checkdetails"><button type="button" class="btn btn-dark Guestbt" >Check Your Vehicle Details</button></Link>
                <br />
            <Link to="/home"><button class="btn btn-dark backb">Go Back</button></Link>
            </div>
            {/* <button class="btn btn-dark " id="gbk" onClick={() => navigate(-1)}>Go Back</button> */}
        </div>
    );
}