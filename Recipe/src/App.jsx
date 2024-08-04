import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';

import Signup from './components/Signup';
import Home from './components/Home';
import View from './components/View';
import Addrecipie from './components/Addrecipe'; 
import Login from './components/Login ';
import UserProfile from './components/UserProfile';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
  <Navbar/>
  <Routes>
      <Route path= '/' element={<Home/>}/>
      <Route path= '/login' element={<Login/>}/>
       <Route path= '/signup' element={<Signup/>}/> 
       <Route path= '/addrec' element={<Addrecipie/>}/> 
       <Route path= '/userprofile/:id' element={<UserProfile/>}/>
       <Route path="/myrecipes/:id" element={<View />} />
    </Routes>
    </>
  );
}

export default App;
