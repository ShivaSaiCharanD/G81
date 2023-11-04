import React from 'react';
import { Link } from "react-router-dom";

export default function Home(){
    return (
        <div className="Home">
            <div>
                <p id='title'>TIRES ON HIGHwaYS</p>
            </div>
            <div class="options">
                <div class="option1">
                <Link to="/guest"><button type="button" class="btn btn-dark gs" >Continue as Guest</button></Link>
                </div>
                {/* <br /> */}
                <div class="option2">
                <Link to="/signIn"><button type="button" class="btn btn-dark gs">Toll Sign In</button></Link>

                </div>
            </div>
        </div>
    );}
