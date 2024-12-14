import * as React from "react"
import * as ReactDOM from "react-dom/client"
import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider, createTheme } from "@mui/material/styles"

//Import CSS
import "../src/css/index.css"

const theme = createTheme()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ThemeProvider>
  </React.StrictMode>
)
