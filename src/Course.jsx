import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card, Typography ,TextField , Button} from "@mui/material";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function Course(){
    let {courseId} = useParams();
    // const [courses,setCourses] = useState([]);
    const setCourses = useSetRecoilState(courseState);
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

    // let course  = null;
    // for(let i = 0 ; i  < courses.length ; i ++){
    //     if(courses[i].id == courseId){
    //         course = courses[i];
    //     }
    // }
    // if(!course){
    //     return <div>
    //         Loading .... 
    //     </div>
    // }
    
    return <div style = {{
        display : "flex",
        justifyContent : "center",
        padding : 20
    }}>
        {<CourseCard courseId = {courseId}/>}
        {<UpdateCard courseId = {courseId} />}
    </div>
}
function UpdateCard(props){

    const[title,setTitle] = useState(null);
    const[description,setDescription] = useState(null);
    const[imageUrl, setImageUrl] = useState(null);
    const[courses,setCourses] = useRecoilState(courseState);

    const course = props.course;

    return <div>
        <div style = {{
            display : " flex",
            margin : 20
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
                    // alert("course updated !")
                    let updatedCourses = [];
                    for(let i = 0 ; i < courses.length ; i++){
                        if(courses[i].id == props.courseId){
                            updatedCourses.push({
                                id : props.courseId,
                                title : title,
                                description : description,
                                imageLink : imageUrl
                            })
                        }
                        else{
                            updatedCourses.push(courses[i]);
                        }
                    }
                    setCourses(updatedCourses);
                }

                function callback1(res){
                    res.json().then(callback2)
                }
                
                fetch("http://localhost:3000/admin/courses/" + props.courseId, {
                    method : "PUT",
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
                
                
            }}>Update Course</Button>
            </div>
        </Card>
        </div>
    </div>
}
function CourseCard(props){
    const courses = useRecoilValue(courseState)
    let course  = null;
    for(let i = 0 ; i  < courses.length ; i ++){
        if(courses[i].id == props.courseId){
            course = courses[i];
        }
    }
    if(!course){
        return <div>
            isLoading...
        </div>
    }
    return <div>
    <Card variant="outlined" style = {{
       width : 350,
       padding : 20
    }}>
   <Typography textAlign={"center"} variant="h6"> {course.title}</Typography>
   <br /> <br />
   <Typography textAlign={"center"} variant="h6">{course.description}</Typography>
   <center><img src = {course.imageLink} style = {{width : 300}} ></img></center> 
  
   </Card>
</div>
}
export default Course

const courseState = atom({
    key: 'courseState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });