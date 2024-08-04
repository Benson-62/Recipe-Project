import { Button, Grid, TextareaAutosize, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './Authcontext';

const Addrecipe = (props) => {

    const {authData}=useContext(AuthContext)



  var [data, setData] = useState({
    title: "",
    ingredients: "",
    description: "",
    image: "",
    category: "",
    createdBy: authData.userId,
  });


  var navigate = useNavigate();
  var location = useLocation();

  console.log("location", location.state);

  useEffect(() => {
    if (location.state!=null) {
      setData({
        ...data,
        title: location.state.val.title || "",
        ingredients: location.state.val.ingredients || "",
        description: location.state.val.description || "",
        image: location.state.val.image || "",
        category: location.state.val.category || "",
      });
    }
  }, [location.state]);
  

  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const fileChangeHandler = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile)); // Set preview URL
  };

  const submitHandler = () => {
    console.log("btn clicked");
    console.log(data)
    if (location.state != null) {
      axios
        .put("http://localhost:3010/editrec/"+location.state.val._id, data)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          navigate(`/myrecipes/${authData.userId}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios.post("http://localhost:3010/addrec", data)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
    <h1 className='titleadd'>Add Your Recipie</h1>
    <div style={{ marginTop: '30px' }}>    
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="title"
            onChange={inputHandler}
            name="title" // Adjusted to match data key
            value={data.title}
          />
          <br /><br />
          <TextField
            variant="outlined"
            fullWidth
            label="Ingredients"
            onChange={inputHandler}
            name="ingredients"
            value={data.ingredients}
          />
          <br /><br />
          <TextField
                variant="outlined"
                fullWidth
                label="Description"
                onChange={inputHandler}
                name="description"
                value={data.description}
                multiline
                rows={4} // You can adjust the number of rows based on your needs
            />

          <br /><br />


          <TextField
            variant="outlined"
            fullWidth
            label="Image Url"
            onChange={inputHandler}
            name="image"
            value={data.image}
          />
          <br /><br />

          <TextField
            variant="outlined"
            fullWidth
            label="Category"
            onChange={inputHandler}
            name="category"
            value={data.category}
          />
          <br /><br />
          <br /><br />
          <div style={{display: 'flex',justifyContent:'center',alignContent:'center'}}>
          <Button variant="contained" color='secondary' onClick={submitHandler}>Submit</Button>&nbsp;&nbsp;
          </div>
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </div>
    </>
  )
}

export default Addrecipe;
