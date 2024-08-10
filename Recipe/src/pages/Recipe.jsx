import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Recipe = () => {

    
    const [recData, setRecData] = useState(null);
    const {rec_id}=useParams();
    console.log("id from useparams = "+rec_id)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3010/detailrec/${rec_id}`);
                setRecData(response.data);
                console.log(recData)
            } catch (err) {
                console.log(err)
            }
        };

        fetchData();
    }, [rec_id]);




  return (
    <div>
      <h1 style={{marginTop:"64px"}}>
        <Grid>
          {Recipe.map((item)=>{
            return(
              <Card key={item.id}>
                <img src={item.image} alt=""/>
                <h4>{item.title}</h4>
              </Card>
            )
          })}
        </Grid>
      </h1>
    </div>
  )
}

export default Recipe
