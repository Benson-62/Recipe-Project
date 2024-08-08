import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Cuisine = () => {
  const { type } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    console.log('Effect run for type:', type); // Log the effect execution

    axios.get(`http://localhost:3010/catrec/${type}`)
      .then((res) => {
        console.log('API Response:', res.data); // Log API response
        setRecipes(res.data);
      })
      .catch((err) => {
        console.log('API Error:', err);
      });
  }, [type]);

  return (
    <div >
     <h1>Cuisine</h1>
     {recipes.map((val) => (
        <div >
            {val.title}         
        </div>
      ))}
    </div>
  );
};

export default Cuisine;
