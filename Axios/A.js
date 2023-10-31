import React, { useState,useEffect } from 'react'
import axios from 'axios'
export default function A() {
  const [file,setfile]=useState(null)
  const [error,seterr]=useState(null)
    useEffect(()=>{

        axios.get('./T.json')
        .then((response)=>{
            // console.log(response)
             console.log(response.data)
            setfile(response.data);
        }).catch(error => seterr(error));
    },[])

    if (error) return `${error.message}`;
    if (!file) return "no file found"
   return (
    <>
    <div>Test</div>
    <img src={file.imageUrl} alt='null'></img>
    </>
  )
}
