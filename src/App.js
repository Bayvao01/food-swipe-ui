import { ThemeProvider } from "@material-ui/styles";
import Header from './Components/Common/Header';
import theme from './Components/UI/Theme';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from "./Components/User/Signup";
import Footer from "./Components/Common/Footer";
import PhoneConfirmation from "./Components/User/PhoneConfirmation";
import Login from "./Components/User/Login";
import Home from "./Components/Products/Home";
import { useLocation } from 'react-router-dom'


function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const location = window.location.pathname;

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      {location !== '/login' ||  "/phoneConfirmation" || "/register"
       ? <Header value={value} setValue={setValue}
          selectedIndex={selectedIndex} 
          setSelectedIndex={setSelectedIndex} isLoggedIn={isLoggedIn}/> : undefined }
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/phoneConfirmation" element = {<PhoneConfirmation />} />
          <Route path="/login" element = {<Login />} />
          <Route path="/home" element = {<Home />} />
          
        </Routes>
       
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
