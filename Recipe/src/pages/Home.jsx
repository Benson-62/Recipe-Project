import React from 'react';
import { Typography, Box, duration } from '@mui/material';
import RecipeSlider from '../components/RecipieSlider';

const Homepage = () => {
  return (
    <div style={{ marginTop: 0 }} className='home-background'>
      <RecipeSlider/>
      <Box
        sx={{
          backgroundImage: 'url(/path/to/your/background-image.jpg)', // Replace with your background image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '20vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#fff',
          padding: '2rem',
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          className="running-text"
          >
          Discover, Cook, and Enjoy: Your Culinary Adventure Starts Here!
        </Typography>
      </Box>
    </div>
  );
};

export default Homepage;
