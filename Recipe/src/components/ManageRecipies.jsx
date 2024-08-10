import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ManageRecipies = () => {

  const [rec,setUsers]=useState([])

  useEffect(()=>{
      axios.get("http://localhost:3010/viewrec")
      .then((res)=>{
          console.log(res.data);
          setUsers(res.data)
      })
      .catch((err) => {
          console.log(err);

      });
  },[])


  const handleDelete = (recId) => {
    console.log('Delete user with id:', recId);
axios.delete("http://localhost:3010/removerec/"+recId)
.then((res)=>{
    console.log(res)
    alert(res.data.message)
    window.location.reload(true)
})
.catch((err)=>console.log(err))
  };

  var navigate = useNavigate();

  const updateValue=(val)=>{
    console.log("clicked ",val);
    navigate('/addrec',{state:{val}});
}

  return (
    <div >
       <h1>list of Recipies</h1>
      <Grid container spacing={2}>
      {rec.map((rec) => {
        return(
            <Grid item xs={12} md={4} key={rec._id} >
            <Card  sx={{ maxWidth: 345 }} >
            <CardContent className='usercard'>
            <Typography variant="h6">Title: {rec.title}</Typography>
            <img src={rec.image} alt="" style={{height:"100px"}} />
            <Typography variant="body2">Created By: {rec.createdBy?.firstName} {rec.createdBy?.lastName}</Typography><br />
            {/* <Typography variant="body2">Ingredients:{rec.ingredients}</Typography><br />
            <Typography variant="body2">Description  {rec.description}</Typography> */}
            <Button variant='contained' onClick={() => updateValue(rec)} color='info'>Edit</Button>
            <Button variant='contained' onClick={() => handleDelete(rec._id)} color='error'>Delete</Button>
            </CardContent>
            </Card>
            </Grid>
    )
})}
      </Grid>
      
    </div>
  )
}

export default ManageRecipies
