import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GameSettingsProvider ,{useGameSettings} from './GameSettingProvider';
import Main from './Pages/Main';
import UserForm from './Pages/newUser';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/login';

export const HOST= '129.10.248.99'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userName, setUserName] = useState<string>("Guest");

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    // Check if the user is registered
    const registered = localStorage.getItem('isRegistered') === 'true';
    setIsRegistered(registered);
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogin = (username: string) => {
    // Set the login state to true and save it in local storage
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    // Set the username and save it in local storage
    setUserName(username);
    localStorage.setItem('userName', username);
    handleRegister()
  };

  const handleRegister = () => {
    // Set the registration state to true and save it in local storage
    setIsRegistered(true);
    localStorage.setItem('isRegistered', 'true');


  }
   
  

  const handleNotRegister = () => {
    // Set the registration state to false
    setIsRegistered(false);
    localStorage.removeItem('isRegistered');
  };

  const handleLogout = () => {
    // Set the login state to false and remove it from local storage
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <GameSettingsProvider isLoggedIn={isLoggedIn}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage onLogin={handleLogin}/>} />
          <Route path='/cregister' element={<UserForm onCreate={handleRegister}/>} />
          <Route path='/home' element={isLoggedIn && isRegistered ? <Main onLogout={handleLogout} onLogout2={handleNotRegister}/> : <LoginPage onLogin={handleLogin}/>} />
        </Routes>
      </GameSettingsProvider>
    </Router>
  );
}

export default App;
