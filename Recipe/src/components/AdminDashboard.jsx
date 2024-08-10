import React from 'react';
import { Drawer, List, ListItem, ListItemText, Box, Toolbar } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';

const drawerWidth = 200;

const AdminDashboard = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className='dash-background'>
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', mt: '64px' },
        }}
      >
        <Toolbar/>
        <Box sx={{ overflow: 'auto'}}>
          <List>
            <ListItem 
              button 
              component={Link} 
              to="/admin/users" 
              selected={isActive('/admin/users')}
            >
              <ListItemText primary="Manage Users" />
            </ListItem>
            <ListItem 
              button 
              component={Link} 
              to="/admin/recipes" 
              selected={isActive('/admin/recipes')}
            >
              <ListItemText primary="Manage Recipes" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main content area */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: '64px', width: `calc(100% - ${drawerWidth}px)` }}
      >
        <Outlet />
      </Box>
    </Box>
    </div>
  );
};

export default AdminDashboard;
