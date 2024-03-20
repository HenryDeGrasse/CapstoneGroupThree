import React, { useEffect, useState } from "react";
type ControlButtonsProps = {
  iconLink: string;
  iconTitle: string;
  resp: any;
  setResp: (alarm: any) => void;
};
export const dynamicStyles = (isIconOn: boolean): React.CSSProperties => {
  return {
    backgroundColor: isIconOn ? "#66B12A" : "#315B0F",
    width: "75%",
    height: "75%",
    borderRadius: "50%",
    objectFit: "cover",
    display:"flex", 
    alignItems:'center', 
  
    justifyContent:'center',
  };
};

const ControlButton: React.FC<ControlButtonsProps> = ({
  iconTitle,
  iconLink,
  resp, 
  setResp, 
}) => {

  const IconStyles = dynamicStyles(resp);

  const handleToggle = () => {
    setResp(!resp);
  };


  return (
    <div>
      <button
        onClick={handleToggle}
        style={{ borderRadius: "50%", display:"flex", alignItems:'center', justifyContent:'center', border: "none", padding: "0", width: "4.7vh", backgroundColor:"#315B0F",
        height: "4.7vh"}}
      >
        <div style={IconStyles}>
        <img src={iconLink} alt={`${iconTitle} icon`} style={{width:'75%'}} />
        </div>
      </button>
    </div>
  );
};

export default ControlButton;
