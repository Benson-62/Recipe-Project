import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import View from './components/View';
import Addrecipie from './components/Addrecipe'; // Ensure the component name matches the import

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my-recipes" element={<View />} />
        <Route path="/addrec" element={<Addrecipie />} />
      </Routes>
    </>
  );
}

export default App;
