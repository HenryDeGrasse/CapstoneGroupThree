import React from "react";


type InfoboxProps = {
    
    Title: string;
    Description: string;
    Image?: string;
    BackgroundColor?: string;
    TextColor?: string;
  };
const Infobox: React.FC<InfoboxProps> = ({
  Title,
  Description,
  Image,
  BackgroundColor,
  TextColor,
}) => {
    {/* Description:  Creates infobox component
    params: Title (Greeting), Description( information), Image( optional image ), BackgroundColor( box color ), TextColor(color )
    return: infobox componenet 
*/}
  const DescriptionStyle: React.CSSProperties = {
    fontFamily: "Inter",
    fontSize: "8px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "9px",
    flex: "1 0 0",
    color: TextColor || "#122701",
  };
  return (
    <div
      style={{
        backgroundColor: BackgroundColor || "#F4FFEB",
        display: "flex",
        flexDirection: "column",
        padding: "12px 11.007px 22px 12px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        boxShadow:
          "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        width: "32.3vw",
      }}
    >
      <h1 style={TitleStyle}>{Title}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          gap: "10px",
          height: "10.664vh",
        }}
      >
        <p style={DescriptionStyle}>{Description}</p>
        {Image && (
          <img
            src={Image}
            alt={`${Title} Image`}
            style={{
              height: "50%",
              objectFit: "contain",
              alignSelf: "center",
            }}
          />
        )}
      </div>
    </div>
  );
};

  const TitleStyle: React.CSSProperties = {
    color: "#122701",
    fontFamily: "Baloo Bhai 2",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "16px",
    letterSpacing: "0.14px",
    textTransform: "uppercase",
  };

export default Infobox;
