import React from "react";
export default function Start() {

    return (
        <div className="home">
            <div>
                <button type="button" id="sign" className="btn btn-dark">SIGN IN</button>
            </div>
            <div>
                <p id='title'>TIRES ON HIGHwaYS</p>
            </div>
          
            <div>
                <div>
                <a href="./UploadCMode"><button type="button" id="button1" className="btn btn-dark"><span>UPLOAD DATA</span><span id='b1'>&gt;</span></button></a>
                    <button type="button" id="button2" className="btn btn-dark">
                        <span >CHECK RECORDS</span>
                        <span id='b2'>&gt;</span>
                    </button>
                </div>

                <div>
                    <button type="button" id="button3" className="btn btn-dark">
                        <span >HOW TO</span>
                        <span id='b3'>&gt;</span>
                    </button>
                    <button type="button" id="button4" className="btn btn-dark">
                        <span >HELP</span>
                        <span id='b4'>&gt;</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
