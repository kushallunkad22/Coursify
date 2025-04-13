"use client"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { useMemo, useState, useEffect, createContext, useContext } from "react"

// Create a context for the dark mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
})

export function useColorMode() {
  return useContext(ColorModeContext)
}

export function ThemeProviderWrapper({ children }) {
  // Get the initial mode from localStorage or default to 'light'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode")
    return savedMode === "true" ? "dark" : "light"
  })

  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem("darkMode", mode === "dark")
  }, [mode])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
      },
      mode,
    }),
    [mode],
  )

  // Create a theme based on the mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#f50057",
          },
          background: {
            default: mode === "light" ? "#f5f5f5" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: "8px",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: "12px",
                boxShadow:
                  mode === "light"
                    ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12)",
              },
            },
          },
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
