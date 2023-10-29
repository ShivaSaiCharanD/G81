import React from "react";

export default function Buttons4(){
    return(
        <div>
            <div>
        <button type="button" id="button1" class="btn btn-dark">
            <span>UPLOAD DATA</span>
            <span id='b1'>&gt;</span>
        </button>
        <button type="button" id="button2" class="btn btn-dark">
            <span >CHECK RECORDS  <span id='b2'>&gt;</span></span>
           
        </button>
    </div>

    <div>
        <button type="button" id="button3" class="btn btn-dark">
            <span >HOW TO</span>
            <span id='b3'>&gt;</span>
        </button>
        <button type="button" id="button4" class="btn btn-dark">
            <span >HELP</span>
            <span id='b4'>&gt;</span>
        </button>
    </div>
        </div>
        
    );
}