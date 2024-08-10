import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useState } from 'react';

function Courses(){
    const[title,setTitle] = useState(null);
    const[description,setDescription] = useState(null);
    const[imageUrl, setImageUrl] = useState(null);

    return <div>
        <div style = {{
            display : " flex",
            justifyContent : "center",
            paddingTop :  150
        }}>
        <Card variant="outlined" style = {{
            width : 400,
            padding : 20,
        }}>

<TextField 
         onChange={(e) => {
           setTitle(e.target.value);
         }}
         fullWidth = {true}
         label="Title" 
         variant="outlined"/> 
        <br />  <br />
        <TextField  
        onChange={(e) => {
            setDescription(e.target.value);
        }}
        fullWidth = {true}
        label="Description" 
        variant="outlined"/> 
<br />  <br />
<TextField 
         onChange={(e) => {
           setImageUrl(e.target.value);
         }}
         fullWidth = {true}
         label="imageUrl" 
         variant="outlined"/> 
    <br /><br />
<div style = {{
            display : " flex",
            justifyContent : "center",
        }}>
<Button 
            variant="contained" 
            size = "small" 
            onClick={ () => {
                function callback2(data){
                    alert("course added !")
                }

                function callback1(res){
                    res.json().then(callback2)
                }
                
                fetch("http://localhost:3000/admin/courses", {
                    method : "POST",
                    body : JSON.stringify({
                        title : title,
                        description : description,
                        imageLink : imageUrl,
                        published : true
                    }),
                    headers : {
                        "Content-type" : "application/json",
                        "Authorization" : "Bearer " + localStorage.getItem("token")
                    }
                }).then(callback1)
                
                
            }}>Add Course</Button>
            </div>
        </Card>
        </div>
    </div>
}

export default Courses