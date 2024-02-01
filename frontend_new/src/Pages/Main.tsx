import React from "react";
import Infobox from "../Components/Infobox";
import Vents from "../Components/Vent";
import Dail from "../Components/Dial";
import ControlButton from "../Components/ControlButton";
import lighteningBolt from "../Icons/LightneingBolt/Vector 2@2x.png";
import IconLink from "../Icons/shaver.svg";

//fake info cards
const DEMO_TITLE = "Title Area";
const DEMO_DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Convallis convallis tellus id interdum.";
const DEMO_IMAGE = lighteningBolt;

//fake buttons
const DEMO_ICON_TITLE = "Demo";
const DEMO_ICON_LINK = IconLink;

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
    {/* Landing page component*/}
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: " 10px",
        padding: " 1.42vh 8.3vw",
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
        <Infobox Title={DEMO_TITLE} Description={DEMO_DESCRIPTION} />
        <Infobox
          Title={DEMO_TITLE}
          Description={DEMO_DESCRIPTION}
          Image={DEMO_IMAGE}
          BackgroundColor="#315B0F"
          TextColor="#F4FFEB"
        />
      </div>
      <TitleBox SectionTitle="Vents" />
      <Vents
        leftOnePercent={10}
        leftTwoPercent={90}
        rightOnePercent={30}
        rightTwoPercent={50}
      />
      <TitleBox SectionTitle="Temps" />
      <Dail currentTemp={75} setTemp={72} />
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
        <ControlButton iconLink={DEMO_ICON_LINK} iconTitle={DEMO_ICON_TITLE} />
        <ControlButton iconLink={DEMO_ICON_LINK} iconTitle={DEMO_ICON_TITLE} />
        <ControlButton iconLink={DEMO_ICON_LINK} iconTitle={DEMO_ICON_TITLE} />
        <ControlButton iconLink={DEMO_ICON_LINK} iconTitle={DEMO_ICON_TITLE} />
      </div>
    </div>
  );
}

export default Main;
