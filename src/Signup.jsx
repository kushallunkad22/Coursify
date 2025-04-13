"use client"

import { useState } from "react"
import {
  Button,
  TextField,
  Card,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
  Divider,
  Alert,
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import axios from "axios"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock"
import SchoolIcon from "@mui/icons-material/School"

function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true")

  // Password validation
  const isPasswordValid = password.length >= 6
  const doPasswordsMatch = password === confirmPassword
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSignup = async () => {
    if (!isEmailValid) {
      setError("Please enter a valid email address")
      return
    }

    if (!isPasswordValid) {
      setError("Password must be at least 6 characters long")
      return
    }

    if (!doPasswordsMatch) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await axios.post("http://localhost:3000/admin/signup", {
        username: email,
        password: password,
      })

      localStorage.setItem("token", response.data.token)
      window.location = "/"
    } catch (err) {
      console.error("Signup error:", err)
      setError(err.response?.data?.message || "Failed to create account. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      <Card
        elevation={8}
        className={`w-full max-w-md ${
          darkMode ? "bg-gray-800" : "bg-white"
        } overflow-hidden rounded-2xl`}
        sx={{
          boxShadow: darkMode 
            ? '0 10px 25px rgba(0, 0, 0, 0.5)' 
            : '0 10px 25px rgba(59, 130, 246, 0.1)',
          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : 'none'
        }}
      >
        {/* Colorful top accent */}
        <Box sx={{
          height: '4px',
          background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)'
        }} />

        <Box sx={{ p: { xs: 3, sm: 5 } }}>
          {/* Logo/Icon */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box 
              sx={{
                width: 56, 
                height: 56,
                borderRadius: '50%',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: darkMode 
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))' 
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))'
              }}
            >
              <SchoolIcon 
                sx={{ 
                  fontSize: 30,
                  color: darkMode ? '#60a5fa' : '#3B82F6'
                }} 
              />
            </Box>
          </Box>

          {/* Header */}
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              textAlign: 'center',
              mb: 0.5,
              color: darkMode ? '#f3f4f6' : '#1f2937'
            }}
          >
            Create Account
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              color: darkMode ? 'rgba(243, 244, 246, 0.7)' : 'rgba(31, 41, 55, 0.7)',
            }}
          >
            Join our learning platform today
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 3, borderRadius: '8px' }}
              variant="filled"
            >
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={email !== "" && !isEmailValid}
              helperText={email !== "" && !isEmailValid ? "Please enter a valid email" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: darkMode ? 'rgba(156, 163, 175, 0.8)' : 'rgba(107, 114, 128, 0.8)' }} />
                  </InputAdornment>
                ),
                sx: { 
                  borderRadius: '10px',
                  backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'transparent',
                  '&.Mui-focused': {
                    boxShadow: darkMode ? 'none' : '0 0 0 2px rgba(59, 130, 246, 0.1)'
                  }
                }
              }}
              InputLabelProps={{
                sx: { color: darkMode ? 'rgba(209, 213, 219, 0.8)' : undefined }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.8)',
                  },
                  '&:hover fieldset': {
                    borderColor: darkMode ? 'rgba(107, 114, 128, 0.8)' : 'rgba(156, 163, 175, 0.8)',
                  },
                },
                '& .MuiInputBase-input': {
                  color: darkMode ? '#f3f4f6' : undefined
                }
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={password !== "" && !isPasswordValid}
              helperText={
                password !== "" && !isPasswordValid ? "Password must be at least 6 characters long" : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: darkMode ? 'rgba(156, 163, 175, 0.8)' : 'rgba(107, 114, 128, 0.8)' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: darkMode ? 'rgba(209, 213, 219, 0.8)' : undefined }}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { 
                  borderRadius: '10px',
                  backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'transparent',
                  '&.Mui-focused': {
                    boxShadow: darkMode ? 'none' : '0 0 0 2px rgba(59, 130, 246, 0.1)'
                  }
                }
              }}
              InputLabelProps={{
                sx: { color: darkMode ? 'rgba(209, 213, 219, 0.8)' : undefined }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.8)',
                  },
                  '&:hover fieldset': {
                    borderColor: darkMode ? 'rgba(107, 114, 128, 0.8)' : 'rgba(156, 163, 175, 0.8)',
                  },
                },
                '& .MuiInputBase-input': {
                  color: darkMode ? '#f3f4f6' : undefined
                }
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPassword !== "" && !doPasswordsMatch}
              helperText={confirmPassword !== "" && !doPasswordsMatch ? "Passwords do not match" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: darkMode ? 'rgba(156, 163, 175, 0.8)' : 'rgba(107, 114, 128, 0.8)' }} />
                  </InputAdornment>
                ),
                sx: { 
                  borderRadius: '10px',
                  backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'transparent',
                  '&.Mui-focused': {
                    boxShadow: darkMode ? 'none' : '0 0 0 2px rgba(59, 130, 246, 0.1)'
                  }
                }
              }}
              InputLabelProps={{
                sx: { color: darkMode ? 'rgba(209, 213, 219, 0.8)' : undefined }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.8)',
                  },
                  '&:hover fieldset': {
                    borderColor: darkMode ? 'rgba(107, 114, 128, 0.8)' : 'rgba(156, 163, 175, 0.8)',
                  },
                },
                '& .MuiInputBase-input': {
                  color: darkMode ? '#f3f4f6' : undefined
                }
              }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleSignup}
              disabled={loading || !isEmailValid || !isPasswordValid || !doPasswordsMatch}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
              sx={{ 
                mt: 1.5,
                py: 1.5,
                borderRadius: '10px',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                background: 'linear-gradient(90deg, #3B82F6 0%, #6366F1 100%)',
                boxShadow: darkMode ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 4px 12px rgba(59, 130, 246, 0.2)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #2563EB 0%, #4F46E5 100%)',
                },
                '&.Mui-disabled': {
                  background: darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.5)',
                  color: darkMode ? 'rgba(156, 163, 175, 0.8)' : 'rgba(107, 114, 128, 0.8)'
                }
              }}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </Box>

          <Divider sx={{ 
            my: 4, 
            '&::before, &::after': {
              borderColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.8)'
            }
          }}>
            <Typography variant="body2" sx={{ 
              color: darkMode ? 'rgba(156, 163, 175, 0.8)' : 'rgba(107, 114, 128, 0.8)',
              px: 1
            }}>
              OR
            </Typography>
          </Divider>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: darkMode ? 'rgba(209, 213, 219, 0.8)' : 'rgba(107, 114, 128, 0.8)' }}>
              Already have an account?{" "}
              <RouterLink
                to="/login"
                style={{
                  fontWeight: 500,
                  color: darkMode ? '#60a5fa' : '#3B82F6',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
              >
                Sign In
              </RouterLink>
            </Typography>
          </Box>
        </Box>
      </Card>
    </div>
  )
}

export default Signup