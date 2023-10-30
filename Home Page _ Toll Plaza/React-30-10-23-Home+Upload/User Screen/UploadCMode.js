  import React from 'react'

  export default function UploadCMode() {
      
    return (
      <div className='up'>
      <div>
      <form action="D:\Programming\PS\PageReact4\flask_api.py\classify" method='post'>
        
        <div class="image col-9">
            <label htmlFor="image" className="form-label"><h1>Upload Tire :</h1></label>
            <br></br>
            <br></br>
            <input type="file" accept='image/*' name="image" id="image"/>
        </div>
        <br></br>
        <div class="col-12">
            <button type="submit" className="btn btn-primary">Check Status</button>
        </div>
    </form>
    </div>
    </div>
    );
  }
