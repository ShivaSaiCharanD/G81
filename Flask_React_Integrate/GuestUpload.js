import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from "axios";

export default function Upimax() {
    const [im, setIm] = useState(null);
    const [classificationResult, setClassificationResult] = useState(null);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setIm(selected);
    };
    
    const handleUpload = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior     

        if (im) {
            const formData = new FormData();
            formData.append("image", im);

            axios.post("http://127.0.0.1:5000/", formData)
                .then((response) => {
                    setClassificationResult(response.data);
                })
                .catch((error) => {
                    console.error("Error uploading the file:", error);
                });
        } else {
            console.error("No file selected");
        }
    };

    return (
        <div className="GuestUpload">
            <form>
                <h1>Upload Tire</h1>
                <div className="image col-9">
                    <input onClick={handleFileChange} type="file" accept="image/*" name="tyre" className="image" required />
                    <button type="submit" className="btn btn-dark imageSub" onClick={handleUpload}>Submit</button>
                    <Link to="/guest">
                        <button className="btn btn-dark back">Go Back</button>
                    </Link>
                </div>
                
                {classificationResult && (
                    <div >
                        <p>Classification: {classificationResult.class}</p>
                        <p>Confidence: {classificationResult.confidence}</p>
                    </div>
                )}
              
            </form>
        </div>
    );
}
