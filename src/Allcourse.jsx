"use client"

import { useEffect, useState } from "react"
import { Card, Typography, Button, IconButton, Container, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import SearchIcon from "@mui/icons-material/Search"
import FilterListIcon from "@mui/icons-material/FilterList"

function AllCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true")
  const [searchQuery, setSearchQuery] = useState("")

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
  }, [])

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Header */}
      <header className={`py-4 px-6 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="container mx-auto flex justify-between items-center">
          <Typography variant="h5" className="font-bold">
            Course Catalog
          </Typography>
          <div className="flex items-center gap-4">
            <div className={`relative rounded-full flex items-center px-3 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
              <SearchIcon className="text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className={`py-2 px-2 outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
      <Container maxWidth="xl" className="py-8">
        {/* Filters and sorting */}
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h4" className="font-bold">
            All Courses
          </Typography>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            className={darkMode ? "border-gray-600 text-gray-300" : ""}
          >
            Filter
          </Button>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className={`animate-pulse text-xl ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Loading courses...
            </div>
          </div>
        ) : (
          <>
            {/* No results */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <Typography variant="h6" className="text-gray-500">
                  No courses found matching your search.
                </Typography>
              </div>
            )}

            {/* Course grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course._id} course={course} darkMode={darkMode} />
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  )
}

function CourseCard({ course, darkMode }) {
  const navigate = useNavigate()

  return (
    <Card
      variant="outlined"
      className={`h-full transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
      }`}
    >
      <div className="relative pb-[56.25%] overflow-hidden bg-gray-200">
        <img
          src={course.imageLink || "/placeholder.svg"}
          alt={course.title}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <Box className="p-5">
        <Typography variant="h6" className={`font-bold mb-2 line-clamp-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
          {course.title}
        </Typography>
        <Typography
          variant="body2"
          className={`mb-4 line-clamp-2 h-10 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          {course.description}
        </Typography>
        <div className="flex justify-between items-center mt-auto pt-2">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              navigate(`/course/${course._id}`)
            }}
            className="mt-2"
          >
            Go to Course
          </Button>
        </div>
      </Box>
    </Card>
  )
}

export default AllCourses
