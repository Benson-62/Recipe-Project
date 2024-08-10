import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Card, CardMedia, CardContent, Grid, CircularProgress, Alert } from '@mui/material';



const Cuisine = () => {
  const { type } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Effect run for type:', type);

    setLoading(true);
    axios.get(`http://localhost:3010/catrec/${type}`)
      .then((res) => {
        console.log('API Response:', res.data);
        setRecipes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('API Error:', err);
        setError(err);
        setLoading(false);
      });
  }, [type]);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Alert severity="error">Error: {error.message}</Alert></Box>;
  }

  return (
    <div className='page-background'>
      <centre>
      <Box id='hi'>
    <Box padding={4}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          background: 'linear-gradient(90deg, rgba(255,105,135,1) 0%, rgba(255,0,150,1) 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'red',
          fontWeight: 'bold',
          fontSize: '2.5rem',
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.4)',
          border: '2px solid rgba(255,105,135,0.8)',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '2rem',
          display: 'inline-block',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)',
          },
        }}
      >
        Recipes for {type}
      </Typography>
      <Grid container spacing={4}>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Grid item xs={5} sm={3} md={3} key={recipe.id}>
              <Card className="recipe-card">
                <CardMedia
                  component="img"
                  height="140"
                  image={recipe.image || '/images/default-image.png'}
                  alt={recipe.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {recipe.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              No recipes found.
            </Typography>
          </Grid>
        )}
      </Grid>
      </Box>
    </Box>
    </centre>
    </div>
  );
};

export default Cuisine;
