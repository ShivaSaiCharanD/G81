import React from 'react';
import './style2.css';
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Start from './Components/Start';
import UploadCMode from './Components/UploadCMode';


function App() {
  return (
      <>
      <Router>
        <Routes>
          <Route path='/UploadCMode' element={<UploadCMode/>} />
          <Route path='/' element={<Start/>}/>
        </Routes>
        </Router>
      </>
  );  
}

export default App;
