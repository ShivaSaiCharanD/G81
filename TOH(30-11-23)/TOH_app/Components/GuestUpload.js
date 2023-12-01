import { Link } from 'react-router-dom'
import { useState } from "react";
import axios from "axios";

export default function GuestUpload() {
    const [im, setIm] = useState('');
    const [classificationResult, setClassificationResult] = useState(null);
    const [base64String, setBase64String] = useState("");

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setIm(selected);
        setClassificationResult('');

        function convertToBase64(selected) {
            if (selected) {

                //! Converting image to base64String
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base = e.target.result;
                    // console.log(base); 
                    setBase64String(base);
                };
                reader.readAsDataURL(selected);

            }
            else {
                console.log("Error converting to base64String");
            }
        }
        convertToBase64(selected);
    };


    const handleUpload = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior     

        if (im) {
            console.log(im);

            const formData = new FormData();
            formData.append("GuestuploadImage", im);

            async function makeReq(formData) {
                try {
                    const response = await axios.post("http://127.0.0.1:4000/guestUp", formData)
                    console.log(response.data);
                    setClassificationResult(response.data);

                } catch (error) {
                    console.error("Error uploading the file:", error);
                }
            }
            makeReq(formData);
        }
        else {
            console.error("No file selected");
        }
    };



    return (
        <div className="GuestUpload">
            <form onSubmit={handleUpload} id='form' >
                <h1>Upload Tire</h1>
                <div className="image col-9">
                    <input onChange={handleFileChange} type="file" accept="image/*" name="tyre" className="image" required />
                    <button type="submit" className="btn btn-dark imageSub" >Submit</button>
                    <br />
                    <br />
                    <br />
                    <Link to="/guest">
                        <button className="btn btn-dark back" >Go Back</button>
                    </Link>
                    <br />
                    <br />

                    {classificationResult && (
                        <div >
                            <p>Classification: {classificationResult.class}</p>
                            <p>Confidence: {classificationResult.confidence}</p>
                            <div id="getImg">
                                <img className="enlarge" style={{ width: '300px', height: 'auto', borderRadius: '10px', transition: 'width 0.3s ease', }}
                                    onMouseOver={(e) => (e.currentTarget.style.width = '400px', document.getElementById("form").style.width = '600px')} // Enlarge on hover
                                    onMouseOut={(e) => (e.currentTarget.style.width = '300px', document.getElementById("form").style.width = '500px')} // Shrink on mouse out
                        
                                    src={base64String} alt="Vehicle Tire" />
                            </div>

                        </div>
                    )}
                </div>


            </form>
        </div>
    );
}
