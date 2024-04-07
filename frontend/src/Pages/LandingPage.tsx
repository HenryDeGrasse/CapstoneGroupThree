import React from 'react';
import LandingIcon from '../Icons/Group 12.svg';
import { useNavigate } from 'react-router-dom';
export const LandingStyle: React.CSSProperties={
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#122701', 
        display: 'flex', 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'center',
 }

export default function LandingPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div 
      onClick={handleClick} 
      style={LandingStyle}
    >
      <img src={LandingIcon} style={{ width: '45%', height: '45%' }} />
    </div>
  );
}
