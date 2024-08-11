import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../components/Authcontext';

const Recipe = () => {
    const [recData, setRecData] = useState(null);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);
    const [reviews, setReviews] = useState([]);
    const { rec_id } = useParams();
    const { authData } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3010/detailrec/${rec_id}`)
            .then((res) => {
                setRecData(res.data);
                setReviews(res.data.reviews || []);
            })
            .catch((err) => {
                setError('Failed to load recipe details.');
            });
    }, [rec_id]);

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const handleReviewSubmit = (event) => {
        event.preventDefault();
        
        axios.post(`http://localhost:3010/addreview/${rec_id}`, { review, rating, user: authData.userId })
            .then((res) => {
                setReviews([...reviews, res.data.review]);
                setReview('');
                setRating(1);
                setSuccess('Review submitted successfully!');
            })
            .catch((err) => {
                setError('Failed to submit review.');
            });
    };

    return (
        <div className='recipe-detail' >
            <div style={{ marginLeft: "80px", marginTop: "64px", marginRight: "80px" }} >
            {recData ? (
                <div>
                   <h1>{recData.title}</h1>
                    <img src={recData.image} alt={recData.title} style={{ width: '50%', maxHeight: '400px', objectFit: 'cover' }} />
                    <h1>Ingredients</h1>
                    <p>{recData.ingredients}</p>
                    <h1>Making</h1>
                    <p>{recData.description}</p>
                    
                </div>
            ) : (
                <p>Loading...</p>
            )}


        </div>
        </div>
    );
};

export default Recipe;
