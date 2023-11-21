import { Link } from 'react-router-dom'
import { useState } from "react";
import axios from "axios";

export default function Upimax() {
    const [im, setIm] = useState('');
    const [classificationResult, setClassificationResult] = useState(null);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setIm(selected);
        setClassificationResult('');
    };


    const handleUpload = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior     

        if (im) {

            const formData = new FormData();
            formData.append("image", im);

            async function makeReq(formData) {
                console.log("Uploading file...");
                console.log(formData);
                console.log("image");
                try {
                    const response = await axios.post("http://127.0.0.1:5000/classify", formData)
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
            <form>
                <h1>Upload Tire</h1>
                <div className="image col-9">
                    <input onChange={handleFileChange} multiple type="file" accept="image/*" name="tyre" className="image" required />
                    <button type="submit" className="btn btn-dark imageSub" onClick={handleUpload}>Submit</button>
                    <Link to="/guest">
                        <button className="btn btn-dark back">Go Back</button>
                    </Link>
                    <br />
                    <br />
                    <br />

                    {classificationResult && (
                        <div >
                            <p>Classification: {classificationResult.class}</p>
                            <p>Confidence: {classificationResult.confidence}</p>
                        </div>
                    )}
                </div>


            </form>
        </div>
    );
}