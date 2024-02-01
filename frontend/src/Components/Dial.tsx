import React, { FC, useState } from "react";

type DailProps = {
  currentTemp: number;
  setTemp: number;
};

const Dail: React.FC<DailProps> = ({ currentTemp, setTemp }) => {

  // State to hold the current count
  const [temp, setCount] = useState(setTemp);

  // Function to handle button click and update count
  const increaseTemp = () => {
    setCount(temp < 90 ? temp + 1 : temp);
  };
  const decreaseTemp = () => {
    setCount(temp > 60 ? temp - 1 : temp);
  };

  const ChangeTempButton: React.FC<{
    isIncrease: boolean;
    onClick: () => void;
  }> = ({ isIncrease, onClick }) => {
    const textStyles: React.CSSProperties = {
      margin: 0,
      color: "#f4ffeb",
    };

    return (
      <button
        onClick={onClick}
        style={{
          width: "4.7vh",
          height: "4.7vh",
          borderRadius: "50%",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#66B12A",
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
          
        }}
      >
        {isIncrease ? (
          <h1 style={textStyles}>+</h1>
        ) : (
          <h1 style={textStyles}>-</h1>
        )}
      </button>
    );
  };

  return (
    <div
      style={{
        paddingBottom: "30px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <ChangeTempButton isIncrease={false} onClick={decreaseTemp} />
      <Ellipse
        currentTemp={currentTemp}
        fill="#315B0F"
        setTemp={temp}
        radius={250 / (2 * Math.PI)}
        strokeWidth={5}
      />
      <ChangeTempButton isIncrease={true} onClick={increaseTemp} />
    </div>
  );
};

interface EllipseProps {
  currentTemp: number;
  fill: string;
  radius: number;
  strokeWidth: number;
  setTemp: number;
}

interface ArchProps {
  radius: number;
  strokeWidth: number;
  strokeColor: string;
  startAngle: number;
  endAngle: number;
}

const Arch: FC<ArchProps> = ({
  radius,
  strokeWidth,
  strokeColor,
  startAngle,
  endAngle,
}) => {
  const startX = radius * Math.cos((startAngle * Math.PI) / 180);
  const startY = radius * Math.sin((startAngle * Math.PI) / 180);
  const endX = radius * Math.cos((endAngle * Math.PI) / 180);
  const endY = radius * Math.sin((endAngle * Math.PI) / 180);
  // Create the path data for the full circle
  const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 1 1 ${endX} ${endY}`;

  return (
    <path
      d={pathData}
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  );
};

const Ellipse: FC<EllipseProps> = ({
  currentTemp,
  radius,
  fill,
  strokeWidth,
  setTemp,
}) => {
  const circumferenceCurr = ((currentTemp + 10) / 100) * 360;
  const circumferenceSet = ((setTemp + 10) / 100) * 360;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={radius * 2 * Math.PI}
      height={radius * 2 * Math.PI}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      fill="none"
    >
      {/* Group with filter */}
      <g
        transform={`translate(${radius}, ${radius})`}
        filter={`url(#filter0_d_${radius}_${circumferenceCurr}_layer1)`}
      >
        {/* Ellipse for the first shape in Layer 1 */}
        <Arch
          radius={radius - (strokeWidth + 1)}
          startAngle={0}
          endAngle={360}
          strokeColor={"#F4FFEB"}
          strokeWidth={strokeWidth}
        />
        <Arch
          radius={radius - strokeWidth - (strokeWidth + 1)}
          startAngle={0}
          endAngle={360}
          strokeColor={"#F4FFEB"}
          strokeWidth={strokeWidth}
        />
        <Arch
          radius={radius - (strokeWidth + 1)}
          startAngle={45}
          endAngle={circumferenceCurr + 44}
          strokeColor={fill}
          strokeWidth={strokeWidth}
        />
        <Arch
          radius={radius - strokeWidth - (strokeWidth + 1)}
          startAngle={45}
          endAngle={circumferenceSet + 44}
          strokeColor={"#66B12A"}
          strokeWidth={strokeWidth}
        />
        <text
          x={(-radius * 1) / 2}
          y={(radius * 1) / 12}
          fontSize="16"
          fill="#122701"
        >
          {`${currentTemp} °F`}
        </text>
        <text
          x={(-radius * 1) / 3}
          y={(radius * 4) / 12}
          fontSize="4"
          fill="#122701"
        >
          {`Set To: ${setTemp}°F `}
        </text>
      </g>

      <defs>
        <filter
          id="filter0_d_104_67"
          x="0.5"
          y="0"
          width="258"
          height="258"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_104_67"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_104_67"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Dail;
