import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";//v6
import '@scss/style.scss'

// definition


// components
import Home from "@pages/home/Home"


const App = () => {

  useEffect(() => {

  },[])

  return (
     <>

      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<Home />} />
      </Routes>
     </> 
  )
}

export default App