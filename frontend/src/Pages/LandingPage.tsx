import React from 'react';
import LandingIcon from '../Icons/Group 12.svg'

interface LandingPageProps {
  onClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} style={{width:'100vw', height:'100vh', backgroundColor:'#122701', display:'flex', alignItems:'center', flexDirection:'row', justifyContent:'center'}}>
        <img src={LandingIcon} style={{width:'45%', height:'45%' }}/>
        
     
    </div>
  );
};

export default LandingPage;
