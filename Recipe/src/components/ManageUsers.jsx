import React, { useEffect, useState } from 'react'




const ManageUsers = () => {

    var navigate = useNavigate();

    const [users,setUsers]=useState([])

    useEffect(()=>{
        axios.get("http://localhost:3010/viewuser")
        .then((res)=>{
            console.log(res.data);
            setUsers(res.data)
        })
        .catch((err) => {
            console.log(err);

        });
    },[])

    const handleEdit = (userId) => {
        if (userId) {
          console.log('Edit user with id:', userId);
          navigate(`/admin/edituser/${userId}`);
        } else {
          console.error('User ID is not defined');
        }
      };
      ;
    
      const handleDelete = (userId) => {
        console.log('Delete user with id:', userId);
    axios.delete("http://localhost:3010/removeuser/"+userId)
    .then((res)=>{
        console.log(res)
        alert(res.data.message)
        window.location.reload(true)
    })
    .catch((err)=>console.log(err))
      };



      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
      };

  return (
    <div >
      <h1>list of users</h1>
      <Grid container spacing={2}>
      {users.map((user) => {
        return(
            <Grid item xs={12} md={4} key={user._id} >
            <Card  sx={{ maxWidth: 345 }} >
            <CardContent className='usercard'>
            <Typography variant="h6">Name: {user.firstName} {user.lastName}</Typography>
            <Typography variant="body2">Email:{user.email}</Typography><br />
            <Typography variant="body2">Joined on  {formatDate(user.createdAt)}</Typography>
            <Button variant='contained' onClick={() => handleEdit(user._id)} color='info'>Edit</Button>
            <Button variant='contained' onClick={() => handleDelete(user._id)} color='error'>Delete</Button>
            </CardContent>
            </Card>
            </Grid>
    )
})}
      </Grid>
      
      
    </div>
  )
}

export default ManageUsers
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

