import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import HouseIcon from '@mui/icons-material/House';

const Navbar = () => {
  return (
         <div>
              <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:'purple'}}>
        <Toolbar>
        <Button component={Link} to="/" startIcon={<HouseIcon sx={{ color: 'white' }} />} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipes
          </Typography>
          <Button>
          <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>Login/SignUp</Link>
              </Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Navbar
