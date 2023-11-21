import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import TollStart from './Components/TollStart';
import TollUpload from './Components/TollUpload';
import Home from './Components/Home';
import Guest from './Components/Guest'
import GuestUpload from './Components/GuestUpload';
import GuestDetails from './Components/GuestDetails';
import './Home.css';
import './TollLogin.css';
import './TollStart.css';
import './TollUpload.css';
import './Guest.css';
import './GuestDetails.css';
import './GuestUpload.css';
// import Start from "./Components/TollLogin";
// import './webfontkit-20231017-084401/stylesheet.css';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          {/* <Route path='/signIn' element={<Start/>}/> */}
          {/* <Route path='/toll' element={<TollStart />} /> */}
          <Route path='/toll/upload' element={<TollUpload />} />
          <Route path='/guest' element={<Guest />} />
          <Route path='/guest/upload' element={<GuestUpload />} />
          <Route path='/guest/checkdetails' element={<GuestDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
