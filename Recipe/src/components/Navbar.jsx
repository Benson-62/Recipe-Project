import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
         <div>
              <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:'purple'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipes
          </Typography>
          <Button>
            <Link
             to={'/t'}
             style={{textDecorationColor:"none",color:"white"}}
             >
              Login/Signup
              </Link>
              </Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Navbar
