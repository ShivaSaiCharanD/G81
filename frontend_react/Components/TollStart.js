import { Button } from "bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function TollStart() {
    // const nav=useNavigate()



    return (
        <div className="home">
            <div>

                {/* <!-- Button trigger modal --> */}
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    LOG OUT
                </button>

                {/* <!-- Modal --> */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">WARNING!!!</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Are you Sure about that???
                            </div>
                            <div class="modal-footer">
                                <Link to="/"><button type="button" class="btn btn-danger" data-bs-dismiss="modal">Yes, LogOut</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

            <div>
                <div>
                    {/* <button type="button" id="button1" onClick={()=>nav("/UploadCMode")} className="btn btn-dark"><span>href a tag</span><span id='b1'>&gt;</span></button> */}

                    <Link to="/toll/upload"><button type="button" id="button1" className="btn btn-dark"><span>UPLOAD DATA</span><span id='b1'>&gt;</span></button></Link>

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