import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
const View = () => {
    var [Recipe,setRecipe]=useState([]);
    var navigate = useNavigate();

    const {id}=useParams()
    useEffect(()=>{
        axios.get("http://localhost:3010/userrec/"+id)
        .then((res)=>{
            console.log(res.data);
            setRecipe(res.data)
        })
        .catch((err) => {
            console.log(err);

        });
    },[])
    const delValue = (id)=>{
    console.log("delete clicked",id)
    axios.delete("http://localhost:3010/removerec/"+id)
    .then((res)=>{
        console.log(res)
        alert(res.data.message)
        window.location.reload(true)
    })
    .catch((err)=>console.log(err))

   };

    const updateValue=(val)=>{
        console.log("clicked ",val);
        navigate('/addrec',{state:{val}});
    }
    
  return (
    <div>
       <Typography
       variants="h3"
       color={"secondary"}>
        <Typography/>
        <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell> title</TableCell>
                    <TableCell>ingredients</TableCell>
                    <TableCell>description</TableCell>
                    <TableCell>image</TableCell>
                    <TableCell>category</TableCell>
                    <TableCell>reviews</TableCell>
                    
              
                </TableRow>
            </TableHead>
            <TableBody>
                {Recipe.map((val,i)=>{
                    return(
                <TableRow key={val._id}>   
                    <TableCell>{val.title}</TableCell>
                    <TableCell>{val.ingredients}</TableCell>
                    <TableCell>{val.description}</TableCell>
                    <TableCell>
                        <img src={val.image} alt={val.title} style={{ width: '200px', height: 'auto' }}/>
                    </TableCell>
                    <TableCell>{val.category}</TableCell>
                    <TableCell>{val. reviews}</TableCell>
                    <TableCell>
                        <Button  variant="contained" color ="error" onClick={()=>{delValue(val._id)}}>
                    Delete</Button>&nbsp;<Button  variant="contained" color ="success"onClick={()=>{updateValue(val)}}
                        >
                    Update</Button></TableCell>
                </TableRow>
                    );
                })}
            </TableBody>
        </Table>
      </TableContainer>

       </Typography>

    </div>
  )
}

export default View