
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

export const TitleDesign = {
 
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: 600,
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
      <h1 style={{  color: "#122701", fontSize: "8px", ...TitleDesign }}>{uppercasedTitle}</h1>
    </div>
  );
}

interface MainProps{
  onLogout:()=>void 
  onLogout2:()=>void 


}
function Main({onLogout, onLogout2}:MainProps) {
  type data= {
    light: boolean,
    vacationHold: boolean,
    tempRead: number,
    tempUser: number,
    ventAngle: number,
    alarm: boolean
  }
  const {temperatureUser,
    temperatureReading,
    setTemperatureUser,
    setTemperatureReading,
    ventTop,
    setVentTop,
    ventBottom,
    setVentBottom,
    humidity,
    setHumidity,
    userName,
    setUserName,
    currentWeather,
    csiData,
    setCsiData,
    vacation,
    setVacation,
    light,
    alarm,
    setAlarm, 
    setLight,setCurrentWeather, highWeather, setHighWeather, userData,setUserData,lowWeather, setLowWeather, feelsLike,setFeelsLike}=useGameSettings()




  const weatherDesc= WeatherApp()
  
  return (

     <div  style={{display:"flex",   backgroundColor:'#fbfff2', height:'100vh', flexWrap:"wrap", alignContent:'center',flexDirection:'row', justifyContent:'center'}}>
      
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth:'390px',
       


        transform: 'scale(0.85)',
        justifyContent:'space-around', 
    
      
      }}
    >
       <p onClick={onLogout}style={{alignSelf: 'end'}}>log out </p>
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
        <Infobox Title={`Hi ${userData !== null  ? userData.firstname : userName }!`} Description={weatherDesc} />
        <Infobox
          Title={'Energy Saver'}
          Description={'You have saved 35% power since using covered smart home system. Coverd has turned off your light 3 times today and kept the average temperature at 70°F'}
          Image={DEMO_IMAGE}
          BackgroundColor="#315B0F"
          TextColor="#F4FFEB"
        />
      </div>
      <TitleBox SectionTitle="Vents" />
      <Vents/>
      <TitleBox SectionTitle="Temps" />
      <Dail />
      <TitleBox SectionTitle="Controls" />
      <div
        className="control-button-area"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "41px",
          justifyContent: "center",
          paddingBottom: "20px",
          width:'100%',
            
        
        }}
      >
        <ControlButton iconLink={lightIconLink} iconTitle={'Light'} resp={light} setResp={setLight}/>
        <ControlButton iconLink={surveillianceIconLink} iconTitle={'Security'} resp={alarm} setResp={setAlarm}/>
        <ControlButton iconLink={locationIconLink} iconTitle={'Monitoring'} resp={csiData} setResp={setCsiData} />
        <ControlButton iconLink={vacationIconLink} iconTitle={'Vacation'}  resp={vacation} setResp={setVacation} />
      </div>
    </div>
   </div>
  );
}

export default Main;
