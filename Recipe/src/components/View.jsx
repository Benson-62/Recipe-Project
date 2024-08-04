import { Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const View = () => {
    var [Recipe,setRecipe]=useState([]);
    var navigate = useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:5174/my-recipes/66a7d876512a5756632553c3/view")
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
    axios.delete("http://localhost:5174/my-recipes/66a7d876512a5756632553c3/remove/"+id)
    .then((res)=>{
        console.log(res)
        alert(res.data.message)
        window.location.reload(true)
    })
    .catch((err)=>console.log(err))

   };

    const updateValue=(val)=>{
        console.log("clicked ",val);
        navigate('/t',{state:{val}});
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
                    <TableCell>createdBy</TableCell>
                    <TableCell>reviews</TableCell>
                    
              
                </TableRow>
            </TableHead>
            <TableBody>
                {students.map((val,i)=>{
                    return(
                <TableRow>   
                    <TableCell>{val. title}</TableCell>
                    <TableCell>{val. ingredients}</TableCell>
                    <TableCell>{val.description}</TableCell>
                    <TableCell>{val.image}</TableCell>
                    <TableCell>{val.category}</TableCell>
                    <TableCell>{val.createdBy}</TableCell>
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