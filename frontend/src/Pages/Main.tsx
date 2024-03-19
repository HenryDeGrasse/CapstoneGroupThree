import React from "react";
import Infobox from "../Components/Infobox";
import Vents from "../Components/Vent";
import Dail from "../Components/Dial";
import ControlButton from "../Components/ControlButton";
import lighteningBolt from "../Icons/LightneingBolt/Vector 2@2x.png";
import lightIconLink from "../Icons/shaver.svg";
import locationIconLink from '../Icons/Discovery.svg'
import surveillianceIconLink from '../Icons/surveillance-cameras-one.svg'
import vacationIconLink from '../Icons/Time Circle.svg'
import { useGameSettings } from "../GameSettingProvider";
import WeatherApp from "../Components/weather";

//fake info cards
const DEMO_TITLE = "Title Area";
const DEMO_DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Convallis convallis tellus id interdum.";
const DEMO_IMAGE = lighteningBolt;

//fake buttons
const DEMO_ICON_TITLE = "Demo";
const DEMO_ICON_LINK = lightIconLink;

type TitleBoxProps = {
  SectionTitle: string;
};

const TitleDesign = {
  color: "#122701",
  fontFamily: "Inter",
  fontSize: "8px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "9px",
};

function TitleBox({ SectionTitle }: TitleBoxProps) {
  const uppercasedTitle = SectionTitle.toUpperCase();
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <h1 style={TitleDesign}>{uppercasedTitle}</h1>
    </div>
  );
}

function Main() {
  const {currentWeather, temperatureReading, temperatureUser,setCurrentWeather, highWeather, setHighWeather, lowWeather, setLowWeather, userName, feelsLike,setFeelsLike}= useGameSettings()
  const weatherDesc= WeatherApp()
  return (
    <div  style={{display:"flex", flexDirection:'row', justifyContent:'center'}}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth:'390px',
        maxHeight:'80%', 
        backgroundColor:'#fbfff2',
        justifyContent:'space-around', 
        padding: " 1.42vh 3.3vw",
      }}
    >
      <div
        className="Info-area"
        style={{
          display: "flex",
          flexDirection: "row",
          paddingBottom: "30px",
          alignItems: "center",
          justifyContent: "center",
          gap: "25px",
        }}
      >
        <Infobox Title={`Hi ${userName}!`} Description={weatherDesc} />
        <Infobox
          Title={DEMO_TITLE}
          Description={DEMO_DESCRIPTION}
          Image={DEMO_IMAGE}
          BackgroundColor="#315B0F"
          TextColor="#F4FFEB"
        />
      </div>
      <TitleBox SectionTitle="Vents" />
      <Vents/>
      <TitleBox SectionTitle="Temps" />
      <Dail currentTemp={temperatureReading} setTemp={temperatureUser} />
      <TitleBox SectionTitle="Controls" />
      <div
        className="control-button-area"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "41px",
          justifyContent: "center",
        }}
      >
        <ControlButton iconLink={lightIconLink} iconTitle={'light button '} />
        <ControlButton iconLink={surveillianceIconLink} iconTitle={'surveillance button'} />
        <ControlButton iconLink={locationIconLink} iconTitle={'localizing button '} />
        <ControlButton iconLink={vacationIconLink} iconTitle={'vacation setting button'} />
      </div>
    </div>
    </div>
  );
}

export default Main;
