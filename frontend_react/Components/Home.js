import React from 'react';
import { Link } from "react-router-dom";

export default function Home(){
    return (
        <div id="home">
            <div>
                <p id='title'>TIRES ON HIGHWAYS</p>
            </div>
            <div class="options">
                <div class="option">
                <Link to="/guest"><button type="button" class="btn btn-dark" id='gs'>Continue as Guest</button></Link>
                </div>
                {/* <br /> */}
                <div class="option">
                <Link to="/toll"><button type="button" class="btn btn-dark " id='gs'>Toll Sign In</button></Link>

                </div>
            </div>
        </div>
    );}
