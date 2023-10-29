import React from "react";
import clickHandler from './clickHandler'
export default function Start(){ 
    let clickHandler = () => {
        var element = document.body;
        var modeButton = document.getElementById('dark');
        let s=document.getElementsByTagName("button")   
    
            if (element.classList.toggle("dark-mode")){
                modeButton.innerText="LIGHT MODE";
                for ( let i=0;i<s.length;i+=1){
                    s[i].style.background=" rgb(27, 120, 202)";
                }
                document.getElementById("title").style.color="white";
            }
            else{
                modeButton.innerText="DARK MODE";
                for ( let i=0;i<s.length;i+=1){
                    s[i].style.background="black";
                }
                document.getElementById("title").style.color="black";
            }
    }
    
    return(
        <div>
        <button type="button" id="sign" class="btn btn-dark">SIGN IN</button>
        <button type="button" onClick={clickHandler} id="dark" class="btn btn-dark">DARK MODE</button></div>
        );
}
