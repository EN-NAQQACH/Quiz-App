import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />}/>
      </Routes>
    </>
  )
}

export default App
