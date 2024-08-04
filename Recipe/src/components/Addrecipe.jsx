import {  Button, Grid, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Add = (props) => {
    var [data, setData] = useState({
        title:"",
        ingridents:"",
        description:"",
        image:"",
        category:"",
        createdBy:"",
        reviews:"",
    });
    var navigate = useNavigate();
    var location = useLocation();
    console.log("location", location.state);
    useEffect(()=>{
        if(location.state!=null){
            setData({...data,
                title: location.state.data.title,
                ingridents: location.state.data.ingridents,
                description: location.state.data.description,
                image: location.state.data.image
                category: location.state.val.category
                createdBy: location.state.data.createdBy



            })
        }
    },[])

    const inputHandler =(e)=>{
        // console.log(e.target.value);
        setData({...data,[e.target.name]:e.target.value});
        console.log(data);
    };
    const submitHandler=()=>{
        console.log("btn clicked");
       if(location.state !=null){
        axios
        .put("http://localhost:5174/add-recipe7/edit/"+location.state.data._id,data)
        .then((res)=>{
            console.log(res);
            alert(res.data.message)
            navigate('/')
        })
        .catch((err) =>{
            console.log(err);
        });
       }else{
        axios.post("http://localhost:5174/add-recipe/add",data)
        .then((res)=>{
            console.log(res);
            alert(res.data.message)
        })
        .catch((err)=>console.log(err))
       }
    }
  return (
    <div style={{marginTop:'100px'}}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4}>
            <TextField
            variant="outlined"
            fullWidth
            label="Recipe"
            onChange={inputHandler}
            name="recipe"
            value={data.recipe}
            />
            <br /><br />
            <TextField
             variant="outlined"
             fullWidth
             label="Ingredients"
             onChange={inputHandler}
             name="ingredients"
             value={data.ingredients}/>
            <br /><br />
            <TextField 
             variant="outlined"
             fullWidth
             label="Description"
             onChange={inputHandler}
             name="description"
             value={data.description}/>
            <br /><br />
           {/* <TextField  
            variant="outlined"
            fullWidth
            label="Image"
            onChange={inputHandler}
            name="image"
            value={data.image}/>
           <br /><br /> */}
            <h3>Add Image:</h3>
            <input type="file" onChange={handleChange} />
            <img src={file} />
     <br/><br/>
           <TextField  
            variant="outlined"
            fullWidth
            label="category"
            onChange={inputHandler}
            name="category"
            value={data.category}/>
           <br /><br />
           <TextField  
            variant="outlined"
            fullWidth
            label="createdBy"
            onChange={inputHandler}
            name="createdBy"
            value={data.createdBy}/>
           <br /><br />
           <TextField  
            variant="outlined"
            fullWidth
            label="reviews"
            onChange={inputHandler}
            name="reviews"
            value={data.reviews}/>
           <br /><br />
           <Button variant="contained" color='secondary' onClick={submitHandler}>Submit</Button>&nbsp;&nbsp;
       </Grid>
       <Grid item xs={12} md={4}></Grid>
       </Grid>
    </div>
  )
}

export default Add
