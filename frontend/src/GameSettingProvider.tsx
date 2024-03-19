import React, { createContext,useEffect, ReactNode, useContext, useState } from 'react'



type GameSettingsContextType = {
    temperatureUser: number;
    temperatureReading: number;
    setTemperatureUser: (temp: number) => void;
    setTemperatureReading: (temp: number) => void;
    ventTop: number;
    setVentTop: (angle: number) => void;
    ventBottom: number;
    setVentBottom: (angle: number) => void;
    humidity: number;
    setHumidity: (humidity: number) => void;
    userName: string;
    setUserName: (user: string) => void;
    currentWeather: number;
    setCurrentWeather: (weather: number) => void;
    highWeather: number;
    setHighWeather: (weather: number) => void;
    lowWeather: number;
    setLowWeather: (weather: number) => void;
    feelsLike:number
    setFeelsLike: (weather: number) => void;
    csiData: boolean;
    setCsiData: (csi: boolean) => void;
    vacation: boolean;
    setVacation: (hold: boolean) => void;
    light: boolean;
    setLight: (light: boolean) => void;
  };
  


const GameSettingsContext = createContext<GameSettingsContextType | undefined>(
  undefined,
)

type GameSettingsProviderProps = {
  children: ReactNode
}

export const useGameSettings = () => {
  const context = useContext(GameSettingsContext)
  if (context === undefined) {
    throw new Error(
      'useGameSettings must be used within a GameSettingsProvider',
    )
  }
  return context
}

export const GameSettingsProvider: React.FC<GameSettingsProviderProps> = ({
  children,
}) => {
  const [temperatureUser, setTemperatureUser] = useState<number>(75)
  const [temperatureReading, setTemperatureReading] = useState<number>(75)
  const [ventTop, setVentTop] = useState<number>(50)
  const [ventBottom, setVentBottom] = useState<number>(50)
  const [humidity, setHumidity] = useState<number>(50)
  const [userName, setUserName] = useState<string>("Guest")
  const [currentWeather, setCurrentWeather] = useState<number>(75)
  const [highWeather, setHighWeather] = useState<number>(80)
  const [lowWeather, setLowWeather] = useState<number>(70)
  const [feelsLike, setFeelsLike] = useState<number>(76)
  const [csiData, setCsiData] = useState<boolean>(false)
  const [vacation, setVacation] = useState<boolean>(false)
  const [light, setLight] = useState<boolean>(false)

  return (
    <GameSettingsContext.Provider
      value={{
        temperatureUser,
        temperatureReading,
        setTemperatureUser: setTemperatureUser,
        setTemperatureReading: setTemperatureReading,
        ventTop,
        setVentTop: setVentTop,
        ventBottom,
        setVentBottom: setVentBottom,
        humidity,
        setHumidity: setHumidity,
        userName,
        setUserName: setUserName,
        currentWeather,
        setCurrentWeather: setCurrentWeather,
        highWeather,
        setHighWeather: setHighWeather,
        lowWeather,
        setLowWeather: setLowWeather,
        feelsLike,
        setFeelsLike: setFeelsLike,
        csiData,
        setCsiData: setCsiData,
        vacation,
        setVacation: setVacation,
        light,
        setLight: setLight,
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  )
}

export default GameSettingsProvider
