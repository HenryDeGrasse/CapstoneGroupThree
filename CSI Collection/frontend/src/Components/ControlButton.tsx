import React, { useState } from "react";
type ControlButtonsProps = {
  iconLink: string;
  iconTitle: string;
};
export const dynamicStyles = (isIconOn: boolean): React.CSSProperties => {
  return {
    backgroundColor: isIconOn ? "#66B12A" : "#315B0F",
    width: "75%",
    height: "75%",
    borderRadius: "50%",
    objectFit: "cover",
  };
};

const ControlButton: React.FC<ControlButtonsProps> = ({
  iconTitle,
  iconLink,
}) => {
  const [isIconOn, setIsIconOn] = useState(false);
  const IconStyles = dynamicStyles(isIconOn);

  const handleToggle = () => {
    setIsIconOn(!isIconOn);
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        style={{ borderRadius: "50%", display:"flex", alignItems:'center', justifyContent:'center', border: "none", padding: "0", width: "4.7vh", backgroundColor:"#315B0F",
        height: "4.7vh"}}
      >
        <img src={iconLink} alt={`${iconTitle} icon`} style={IconStyles} />
      </button>
    </div>
  );
};

export default ControlButton;
