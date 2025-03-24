import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from './Admin'
import HomePage from './HomePage'
import People from './People'
import Hall from './Hall'
import Facultylogin from './Facultylogin'


function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/people" element={<People />} />
        <Route path="/hall" element={<Hall />} />
        <Route path="/" element={<Facultylogin />} />
      </Routes>
    </>
  )
}

export default App