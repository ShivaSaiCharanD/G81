import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TollStart from './Components/TollStart';
import TollUpload from './Components/TollUpload';
import Home from './Components/Home';
import Guest from './Components/Guest'
import GuestUpload from './Components/GuestUpload';
import GuestDetails from './Components/GuestDetails';
import './TollStyle.css';
import './HomeStyle.css';
import './GuestStyle.css'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/toll' element={<TollStart />} />
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
