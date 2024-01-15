import './App.scss';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Routes, Route, Link } from 'react-router-dom';
import Home from "./components/Home";
import Add from "./components/Add";
import EventPage from "./components/Event";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'light'
  },
});

function App() {

  //Rendering
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="xs">
        <Typography style={{ textAlign: "center" }} variant="h2">
          Events App
        </Typography>
          <nav className="menu">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/add">Add Event</Link>
              </li>
            </ul>
          </nav>
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/add" element={<Add />} />
        </Routes>
        </Container>
      </ThemeProvider>
  );
}

export default App;
