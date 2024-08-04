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
import AdminDashboard from './components/AdminDashboard';
import ManageUsers from './components/ManageUsers';
import ManageRecipies from './components/ManageRecipies';
import EditUser from './components/EditUser';

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
       <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<ManageUsers />} /> {/* Default route for /admin */}
          <Route path="users" element={<ManageUsers />} />
          <Route path="recipes" element={<ManageRecipies />} />
          <Route path="edituser/:id" element={<EditUser />} />
        </Route>
       
    </Routes>
    </>
  );
}

export default App;
