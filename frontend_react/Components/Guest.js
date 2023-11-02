import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Guest() {
    // const navigate = useNavigate();
    return (
        <>

            <div>
                <Link to="/guest/upload"><button type="button" class="btn btn-dark " id='gs'>Upload Your Tire Image Here</button></Link>
                <br />
                <br />
                <Link to="/guest/checkdetails"><button type="button" class="btn btn-dark " id='gs'>Check Your Vehicle Details</button></Link>
            </div>
            <br />
            <br />
            <Link to="/home"><button class="btn btn-dark " id="gbk">Go Back</button></Link>
            {/* <button class="btn btn-dark " id="gbk" onClick={() => navigate(-1)}>Go Back</button> */}


        </>
    );
}
