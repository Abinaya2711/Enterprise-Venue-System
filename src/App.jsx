import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Admin from './Admin'
import HomePage from './HomePage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Routes>
        <Route path="/" element={<Admin/>}/>
        <Route path="/homepage" element={<HomePage/>}/>
       </Routes>
    </>
  )
}

export default App
