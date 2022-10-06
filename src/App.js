import { ThemeProvider } from "@material-ui/styles";
import Header from './Components/Common/Header';
import theme from './Components/UI/Theme';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from "./Components/User/Signup";
import Footer from "./Components/Common/Footer";
import PhoneConfirmation from "./Components/User/PhoneConfirmation";
import Login from "./Components/User/Login";

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      {isLoggedIn ? <Header value={value} setValue={setValue}
          selectedIndex={selectedIndex} 
          setSelectedIndex={setSelectedIndex}/> : undefined }
      
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/phoneConfirmation" element = {<PhoneConfirmation />} />
          <Route path="/login" element = {<Login />} />
          
        </Routes>
       
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
