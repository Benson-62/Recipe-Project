import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from './Authcontext';

const EditUser = () => {
  const { id } = useParams(); // Get userId from URL
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(authData.isAdmin);

  useEffect(() => {
    axios.get(`http://localhost:3010/viewuser/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user)
  };

  const handleSave = () => {
    axios.put(`http://localhost:3010/edituser/${id}`, user)
      .then((res) => {
        alert('User updated successfully!');
        if (isAdmin) {
          navigate('/admin/users');
        } else {
          navigate(`/profile/${id}`); 
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!user) return <p>Loading...</p>;

  if (!isAdmin && user.id !== authData.userId) {
    return (
      <Typography variant="h6">
        You do not have permission to edit this profile.
      </Typography>
    );
  }

  return (
    <div>
      <h1>{isAdmin ? 'Edit User' : 'Edit Your Profile'}</h1>
      <TextField
        label="firstName"
        name="firstName"
        value={user.firstName}
        onChange={handleChange}
        fullWidth
      />
      <br /><br />
      <TextField
        label="lastName"
        name="lastName"
        value={user.lastName}
        onChange={handleChange}
        fullWidth
      />
      <br /><br />
      <TextField
        label="Email"
        name="email"
        value={user.email}
        onChange={handleChange}
        fullWidth
      />
      <br /><br />
      <TextField
        label="NewPassword"
        name="password"
        value=""
        onChange={handleChange}
        fullWidth
      />
      <br /><br />
      <Button onClick={handleSave} variant="contained" color="primary">
        Save
      </Button>
    </div>
  );
};

export default EditUser;
