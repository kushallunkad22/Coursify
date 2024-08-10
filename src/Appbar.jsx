import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Appbar(){
    const navigate = useNavigate()
    const [userEmail,setUserEmail] = useState(null);
    const [isLoading,setIsLoading] = useState(true);


    useEffect(() => {
        function callback2(data){
          if(data.username){
            setUserEmail(data.username);
            setIsLoading(false);
          }
          else{
            console.log("error");
          }
        }
        function callback1(res){
            res.json().then(callback2)
        }
        fetch("http://localhost:3000/admin/me", {
            method : "GET",
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        }).then(callback1)
    },[]);

    if(isLoading){
        return <div>

        </div>
    }

    if(userEmail){
return <div>
<div style = {{
    display : "flex",
    justifyContent : "space-between"
}}>
<Typography variant="h5"> Google </Typography>
<div style = {{
    display : "flex",
    justifyContent : "space-between"
}}>

    <div style = {{ padding : 10}}>
    <Button 
    variant="contained"
    onClick = {() => {
        localStorage.setItem("token",null);
        window.location = "/"
    }}>Logout</Button>
</div>
</div>
</div>
</div>
    }


    return <div>
    <div style = {{
        display : "flex",
        justifyContent : "space-between"
    }}>
    <Typography variant="h5"> Google </Typography>
    <div style = {{
        display : "flex",
        justifyContent : "space-between"
    }}>
        <div style = {{ padding : 10}}>
        <Button
         variant="contained"
         onClick = { () => {
            navigate('/signup')
         }}>Sign Up</Button>
    </div>
    <div style = {{padding : 10}}>
    <Button
         variant="contained"
         onClick = { () => {
            navigate('/login')
         }}>Sign in</Button>
    </div>
    </div>
    </div>
</div>
   
}

export default Appbar

