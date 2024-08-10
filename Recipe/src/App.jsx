import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';

import Signup from './components/Signup';

import View from './components/View';
import Addrecipie from './components/Addrecipe'; 
import Login from './components/Login ';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import ManageUsers from './components/ManageUsers';
import ManageRecipies from './components/ManageRecipies';
import EditUser from './components/EditUser';
import Home from './pages/Home';
import Category from './components/Category';
import Cuisine from './pages/Cuisine';
import Recipe from './pages/Recipe';

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const shouldShowCategory = location.pathname === '/' || location.pathname.startsWith('/cuisine');
  return (
    <>
  <Navbar/>
  {shouldShowCategory && <Category />} 
  <Routes>
      <Route path= '/' element={<Home/>}/>
      <Route path="/cuisine/:type" element={<Cuisine />} />
      <Route path="/recipe/:rec_id" element={<Recipe />} />
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
