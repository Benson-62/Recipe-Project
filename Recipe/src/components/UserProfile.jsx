import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Authcontext';
import { Container, Typography, Paper, Divider, Avatar, Button, CircularProgress } from '@mui/material';
import avatarImg from '../assets/avatar.jpg';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const { authData } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3010/viewuser/${authData.userId}`);
                setUserData(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [authData.userId]);

    // const editButton = () => {
    //   navigate(`/userprofile/${authData.userId}/edituser`);
  // };  

    
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
  };

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    if (!userData) {
        return <CircularProgress />;
    }

    return (
        <div className='view-background'>
        <Container maxWidth="sm" style={{ marginTop: '80px' }}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Avatar 
                    alt={userData.firstName || 'User'} 
                    src={avatarImg} 
                    style={{ width: 100, height: 100, margin: 'auto' }} 
                />
                <Typography variant="h4" gutterBottom>
                    {userData.firstName || 'First Name'} {userData.lastName || 'Last Name'}
                </Typography>
                <Divider style={{ margin: '10px 0' }} />
                <Typography variant="body1" color="textSecondary">
                    <strong>Email:</strong> {userData.email || 'Email not available'}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    <strong>Joined on:</strong> { formatDate(userData.createdAt)}
                </Typography>
                {/* <Button onClick={editButton}>Edit Profile</Button> */}
            </Paper>
        </Container>
        </div>
    );
};

export default UserProfile;
