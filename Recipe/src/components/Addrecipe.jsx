import { Box, Button, Grid, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './Authcontext';

const Addrecipe = () => {

  const { authData } = useContext(AuthContext);

  const [data, setData] = useState({
    title: "",
    ingredients: "",
    description: "",
    image: "",
    category: "",
    createdBy: authData.userId,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state != null) {
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
  };

  const categoryChangeHandler = (e) => {
    setData({ ...data, category: e.target.value });
  };

  const submitHandler = () => {
    if (location.state != null) {
      axios
        .put("http://localhost:3010/editrec/" + location.state.val._id, data)
        .then((res) => {
          alert(res.data.message);
          navigate(`/myrecipes/${authData.userId}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios.post("http://localhost:3010/addrec", data)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => console.log(err));
    }
    navigate(`/myrecipes/${authData.userId}`);
  };

  return (
    <>
      <Box className="addpage" sx={{ marginTop: 0, padding: 0 }}>
        <h1 className='titleadd'>Add Your Recipe</h1>
        <div style={{ marginTop: '30px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                fullWidth
                label="Title"
                onChange={inputHandler}
                name="title"
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
                rows={4}
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

              <RadioGroup
                name="category"
                value={data.category}
                onChange={categoryChangeHandler}
                row // This ensures horizontal alignment
              >
                <FormControlLabel value="Indian" control={<Radio />} label="Indian" />
                <FormControlLabel value="Italian" control={<Radio />} label="Italian" />
                <FormControlLabel value="Mexican" control={<Radio />} label="Mexican" />
                <FormControlLabel value="Japanese" control={<Radio />} label="Japanese" />
              </RadioGroup>

              <br /><br />
              <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <Button variant="contained" color='secondary' onClick={submitHandler}>Submit</Button>&nbsp;&nbsp;
              </div>
            </Grid>
            <Grid item xs={12} md={4}></Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
}

export default Addrecipe;
