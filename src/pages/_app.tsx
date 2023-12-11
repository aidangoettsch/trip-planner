import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Box, Container, createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material";
import Navbar from "../components/Navbar";

const theme = responsiveFontSizes(createTheme())

function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}>
    <Navbar/>
    <Container maxWidth="md" sx={{
      paddingTop: 10,
    }}>
      <Component {...pageProps} />
    </Container>
  </ThemeProvider>
}

export default MyApp
