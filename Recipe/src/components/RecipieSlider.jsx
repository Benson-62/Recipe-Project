import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Card } from '@mui/material';
import { Link } from 'react-router-dom';

const RecipeSlider = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3010/randomrec');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching random recipes:', error);
      }
    };

    fetchRandomRecipes();
  }, []);

 

  return (
    <div>
         <h1 style={{ color: 'Black' }}> Discover Our Top Recipes</h1> 
  
<Splide
  options={{
   
    perPage: 4,
    gap: '1rem',
    autoplay: true,
    pauseOnHover: true,
    type: 'loop',
    pagination: false,
    arrows: true,
    drag: 'free',        
    snap: true,          
    wheel: true, 
  }}
>
  {recipes.map((recipe) => (
    <SplideSlide key={recipe._id}>
      <Card className="recipe-card">
        <Link to={"/recipe/"+recipe._id}>
        <img src={recipe.image} alt={recipe.title} className="recipe-card-image" />
        <h3 className="recipe-card-title">{recipe.title}</h3>
        </Link>
      </Card>
    </SplideSlide>
  ))}
</Splide>
    </div>
  );
};

export default RecipeSlider;
