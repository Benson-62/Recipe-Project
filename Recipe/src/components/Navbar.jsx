import React, { useContext } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HouseIcon from '@mui/icons-material/House';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AuthContext } from './Authcontext';

const Navbar = () => {
  const { authData,logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout()
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: 'purple' }}>
        <Toolbar>
          <Button component={Link} to="/" startIcon={<HouseIcon sx={{ color: 'white' }} />} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipes
          </Typography>
          {authData.token ? (
            <>
              {authData.isAdmin && (
                <Button component={Link} to="/admin" style={{ textDecoration: 'none', color: 'white' }}>
                  Admin Dashboard
                </Button>
              )}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to="/add-recipe">
                  Add Recipe
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to={`/my-recipes/${authData.userId}`}>
                  View My Recipes
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to={`/profile/${authData.userId}`}>
                  View My Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button>
              <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>Login/SignUp</Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
