import { useEffect } from "react"
import { useState } from "react";
import { Card, Typography ,Button} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Discourse(){
    const [courses,setCourses] = useState([]);
    useEffect(() => {
        function callback2(data){
            setCourses(data.courses);
        }
        function callback1(res){
            res.json().then(callback2);
        }
        fetch("http://localhost:3000/admin/courses" ,  {
            method : "GET",
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        }).then(callback1);
    },[]);
    return <div style = {{
        display : "flex",
        flexWrap : "wrap",
        justifyContent : "center"
    }}>
        {courses.map(course => {
            return <Course course = {course}/>
        })}
    </div>
}

function Course(props){
    const navigate = useNavigate();

    return <div>
         <Card variant="outlined" style = {{
            width : 350,
            padding : 20
         }}>
        <Typography textAlign={"center"} variant="h6"> {props.course.title}</Typography>
        <br /> <br />
        <Typography textAlign={"center"} variant="h6">{props.course.description}</Typography>
        <center><img src = {props.course.imageLink} style = {{width : 300}} ></img></center> 
        <center>
        <Button
         variant="contained"
         onClick = { () => {
            navigate(`/course/${props.course.id}`)
         }}>
            Go to Course
         </Button>
         </center>
        </Card>

    </div>
}

export default Discourse
