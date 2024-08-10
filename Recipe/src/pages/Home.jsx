import React from 'react';
import { Typography, Box } from '@mui/material';

const Homepage = () => {
  return (
    <div style={{ marginTop: 0 }} className='home-background'>
      <Box
        sx={{
          backgroundImage: 'url(/path/to/your/background-image.jpg)', // Replace with your background image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
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
          variant="h3"
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
