import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import LoginForm from './components/Login '
import Signup from './components/Signup'
import Home from './components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <Navbar/>
  <Routes>
      <Route path= '/' element={<Home/>}/>
      <Route path= '/t' element={<LoginForm/>}/>
       <Route path= '/r' element={<Signup/>}/> 
    </Routes>
    </>
  )
}

export default App
