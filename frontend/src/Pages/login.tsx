import React, { lazy, useState } from 'react';
import { useGameSettings } from '../GameSettingProvider';
import { Navigate,useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios'; // Import axios for making HTTP requests
import { LandingStyle } from './LandingPage';
import { HOST } from '../App';
interface LoginPageProps {
  onLogin: (Gusename:string) => void; 
  // onRegistering: (Gusername:string) => void;
}

export default function LoginPage({ onLogin}: LoginPageProps) {
  const{userName,setUserName}=useGameSettings()
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Add state for email
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  //const host = '129.10.158.176'
  const host= HOST
  // const host = '10.0.0.151'
  const handleLogin = async (event: any) => {
    

    event.preventDefault();
    try {
      
      const requestBody= {
        "identifier": username,
        "password": password, 
      }
      
      const response = await axios.post(`http://${host}:1337/api/auth/local`, requestBody);
      console.log(response.data)
      if (response.status === 200) {
        console.log('Login successful');
        setUserName(username)
        onLogin(username); 

      
        
        navigate('/home')
        
      
        
        
      }

    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('Please review your password and try again');
    }
  };

  const handleRegister = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://${host}:1337/api/auth/local/register`,{
          "email": email,
          "password": password,
          "username": username, 
          "userDatas":{
              'firstname': '',
              'lastname': '',
              'address': '',
              'preferredRoomTemperature': '',
              'sleepTime': '',
              'wakeTime': '',
              'awayDTime': '',
              'awayATime': '',
              'arrivalTemperature': ''
          
          }
        }
    );
    if (response.status === 200) {
      console.log('Registration successful');
      setUserName(username)
      onLogin(username); 
      navigate('/cregister')
    } 
  
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log('Error Registering:',error.code)
        setLoginError('Email or Username Already Registered ');
      }
     
     
    }
  };

  return (
    <div  className="login-page" style={LandingStyle}>
      <form  style={formStyle}onSubmit={isRegistering ? handleRegister : handleLogin}>
        
        <div className="form-group"style={formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {isRegistering && ( // Only show the email field if registering
          <div className="form-group" style={formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        <div className="form-group" style={formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={
            isRegistering
              ? !username || !email || !password
              : !username || !password
          }
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>
        {loginError && <div className="login-error">{loginError}</div>}

        <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Already have an account? Login' : 'New user? Register'}
        </button>
      </form>
    </div>
  );

}
export const formStyle:React.CSSProperties={
    display:'flex', 
    flexDirection:'column',
    gap: '30px',
    padding:'15px',

}
export const formGroup:React.CSSProperties={
    color: '#fff',
    display:'flex',
    fontFamily: 'Inter',
    fontWeight:'400',
    flexDirection: 'row',
    gap:'10px',

    justifyContent: 'space-between'
}