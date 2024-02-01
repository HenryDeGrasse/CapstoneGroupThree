import React from 'react';

type VentProps = {
  leftOnePercent: number;
  leftTwoPercent: number;
  rightOnePercent: number;
  rightTwoPercent: number;
};

const MyLineComponent: React.FC<{ percentage: number }> = ({ percentage }) => {
  const lineStyle:React.CSSProperties = {
    borderTop: '2px solid #F4FFEB', // Set the border style to create a green line
    width: '100%',
    height: '4px',
    backgroundColor: '#F4FFEB',
    
  };

  return (
    <div style={lineStyle}>
        <div style={{borderTop: '2px solid #122701', // Set the border style to create a green line
    width: `${percentage}%`,
    height: '4px',
    display:'flex',
    alignSelf:'center',
    backgroundColor: '#122701'}}>

        </div>
    </div>
  );
};

const Vents: React.FC<VentProps> = ({
  leftOnePercent,
  leftTwoPercent,
  rightOnePercent,
  rightTwoPercent,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection:'column',
        width: '90%',
        padding:' 0 10px',
        height: '178px',
        borderRadius: '10px',
        backgroundColor: '#315B0F',
        gap:'36px',
        justifyContent:'center',
        boxShadow:
          '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    
      }}
    >
      <MyLineComponent percentage={leftOnePercent} />
      <MyLineComponent percentage={leftTwoPercent} />
      <MyLineComponent percentage={rightOnePercent} />
      <MyLineComponent percentage={rightTwoPercent} />
    </div>
  );
};

export default Vents;
