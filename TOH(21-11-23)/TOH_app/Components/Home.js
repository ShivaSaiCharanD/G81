import React from 'react';
import { Link } from "react-router-dom";

export default function Home(){
    return (
        <div className="Home">
            <div>
                <p id='title'>TIRES ON HIGHWAYS</p>
            </div>
            <div className="options">
                <div className="option1">
                <Link to="/guest"><button type="button" className="btn btn-dark gs" draggable>Continue as Guest</button></Link>
                </div>
                {/* <br /> */}
                <div className="option2">
                <Link to="/toll/upload"><button type="button" className="btn btn-dark gs">Toll Sign In</button></Link>

                </div>
            </div>
        </div>
    );}