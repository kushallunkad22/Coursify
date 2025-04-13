"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  Card,
  Typography,
  TextField,
  Button,
  Box,
  Container,
  IconButton,
  Divider,
  Skeleton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material"
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Cancel"
import { useNavigate } from "react-router-dom"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"

// Recoil state for courses
const courseState = atom({
  key: "courseState",
  default: [],
})

// Recoil state for dark mode
const darkModeState = atom({
  key: "darkModeState",
  default: localStorage.getItem("darkMode") === "true",
})

function Course() {
  const { courseId } = useParams()
  const setCourses = useSetRecoilState(courseState)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useRecoilState(darkModeState)
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Save dark mode preference to localStorage
    localStorage.setItem("darkMode", darkMode)
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching courses:", err)
        setLoading(false)
      })
  }, [setCourses])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleEditMode = () => {
    setIsEditing(!isEditing)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header className={`py-4 px-6 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <IconButton onClick={() => navigate("/")} className={darkMode ? "text-white" : "text-gray-800"}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" className="font-bold">
              Course Details
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Button variant="contained" color="primary" className="ml-2" onClick={() => {}}>
              LOGOUT
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <Container maxWidth="lg" className="py-8">
        {loading ? (
          <LoadingState darkMode={darkMode} />
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <CourseCard courseId={courseId} darkMode={darkMode} />
            </div>
            <div className="w-full md:w-1/2">
              {isEditing ? (
                <UpdateCard courseId={courseId} darkMode={darkMode} onCancel={toggleEditMode} />
              ) : (
                <div className="flex justify-center mt-4">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={toggleEditMode}
                    className="w-full md:w-auto"
                  >
                    Edit Course
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}

function LoadingState({ darkMode }) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2">
        <Card className={`p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <Skeleton variant="text" width="60%" height={40} className={darkMode ? "bg-gray-700" : ""} />
          <Skeleton variant="text" width="80%" className={darkMode ? "bg-gray-700" : ""} />
          <Skeleton variant="rectangular" height={200} className={`mt-4 ${darkMode ? "bg-gray-700" : ""}`} />
        </Card>
      </div>
      <div className="w-full md:w-1/2">
        <Card className={`p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <Skeleton variant="rectangular" height={56} className={`mb-4 ${darkMode ? "bg-gray-700" : ""}`} />
          <Skeleton variant="rectangular" height={56} className={`mb-4 ${darkMode ? "bg-gray-700" : ""}`} />
          <Skeleton variant="rectangular" height={56} className={`mb-4 ${darkMode ? "bg-gray-700" : ""}`} />
          <Skeleton
            variant="rectangular"
            width="40%"
            height={40}
            className={`mt-4 mx-auto ${darkMode ? "bg-gray-700" : ""}`}
          />
        </Card>
      </div>
    </div>
  )
}

function UpdateCard({ courseId, darkMode, onCancel }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [courses, setCourses] = useRecoilState(courseState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" })

  // Find the current course to pre-fill form
  useEffect(() => {
    const currentCourse = courses.find((course) => course._id === courseId)
    if (currentCourse) {
      setTitle(currentCourse.title || "")
      setDescription(currentCourse.description || "")
      setImageUrl(currentCourse.imageLink || "")
    }
  }, [courseId, courses])

  const handleSubmit = () => {
    setIsSubmitting(true)

    fetch("http://localhost:3000/admin/courses/" + courseId, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        description: description,
        imageLink: imageUrl,
        published: true,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update course")
        }
        return res.json()
      })
      .then((data) => {
        // Update local state
        const updatedCourses = courses.map((course) => {
          if (course._id === courseId) {
            return {
              ...course,
              title: title,
              description: description,
              imageLink: imageUrl,
            }
          }
          return course
        })

        setCourses(updatedCourses)
        setNotification({
          open: true,
          message: "Course updated successfully!",
          severity: "success",
        })

        // Close edit mode after successful update
        if (onCancel) setTimeout(onCancel, 1000)
      })
      .catch((error) => {
        console.error("Error updating course:", error)
        setNotification({
          open: true,
          message: "Failed to update course. Please try again.",
          severity: "error",
        })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false })
  }

  return (
    <Card className={`shadow-lg transition-all ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
      <Box className="p-6">
        <Typography variant="h6" className="mb-4 font-bold">
          Update Course
        </Typography>

        <Divider className={`mb-6 ${darkMode ? "bg-gray-700" : ""}`} />

        <Box className="space-y-4">
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={darkMode ? "bg-gray-700 rounded-md" : ""}
            InputProps={{
              className: darkMode ? "text-white" : "",
            }}
            InputLabelProps={{
              className: darkMode ? "text-gray-300" : "",
            }}
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={darkMode ? "bg-gray-700 rounded-md" : ""}
            InputProps={{
              className: darkMode ? "text-white" : "",
            }}
            InputLabelProps={{
              className: darkMode ? "text-gray-300" : "",
            }}
          />

          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={darkMode ? "bg-gray-700 rounded-md" : ""}
            InputProps={{
              className: darkMode ? "text-white" : "",
            }}
            InputLabelProps={{
              className: darkMode ? "text-gray-300" : "",
            }}
          />
        </Box>

        <Box className="flex justify-end gap-3 mt-6">
          <Button
            variant="outlined"
            color="inherit"
            onClick={onCancel}
            startIcon={<CancelIcon />}
            disabled={isSubmitting}
            className={darkMode ? "border-gray-600 text-gray-300" : ""}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Course"}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} variant="filled">
          {notification.message}
        </Alert>
      </Snackbar>
    </Card>
  )
}

function CourseCard({ courseId, darkMode }) {
  const courses = useRecoilValue(courseState)

  // Find the current course
  const course = courses.find((course) => course._id === courseId)

  if (!course) {
    return (
      <Card className={`p-6 text-center ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
        <CircularProgress size={40} className="my-8" />
        <Typography>Loading course details...</Typography>
      </Card>
    )
  }

  return (
    <Card className={`overflow-hidden shadow-lg transition-all ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
      <div className="relative pb-[56.25%] overflow-hidden bg-gray-200">
        <img
          src={course.imageLink || "/placeholder.svg"}
          alt={course.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x225?text=Course+Image"
          }}
        />
      </div>

      <Box className="p-6">
        <Typography variant="h5" className="font-bold mb-2">
          {course.title}
        </Typography>

        <Divider className={`my-4 ${darkMode ? "bg-gray-700" : ""}`} />

        <Typography variant="body1" className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          {course.description}
        </Typography>

        <Box className="mt-4">
          <Typography variant="caption" className={darkMode ? "text-gray-400" : "text-gray-500"}>
            Course ID: {course._id}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default Course