import React, { createContext,useEffect, ReactNode, useContext, useState } from 'react'
import axios from 'axios';


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
    alarm: boolean;
    setAlarm: (alarm: boolean) => void;
    
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
  const [alarm,setAlarm]=useState<boolean>(false)
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(async () => {
      const host= '10.110.226.121'
      const url =  `http://${host}:1337/api/gpio-pins/1`
      if (counter === 0){
        try {
          const response = await axios.get(url);
          const data=response.data.data.attributes;
          console.log(data)
          setTemperatureReading(data.tempRead)
          setTemperatureUser(data.tempUser)
          setLight(data.light)
          setAlarm(data.alarm)
          setVacation(data.vacationHold)
          setVentTop(data.ventAngle)

        } catch (error) {
          console.error('Error fetching GPIO pin:', error);
        }
      }
      if (counter % 2 === 1) {
        // Fetch GPIO pin
        try {
          const response = await axios.get(url);
          const data=response.data.data.attributes;
          console.log(data)
          setTemperatureReading(data.tempRead)


        } catch (error) {
          console.error('Error fetching GPIO pin:', error);
        }
      } else {
        // Send GPIO pin
        try {
          const data_val = {
            "data": {
              "light": light,
              "vacationHold": vacation,
              "tempRead": temperatureReading,
              "tempUser": temperatureUser,
              "ventAngle": ventTop,
              "alarm": alarm
            }
          }; 
            console.log('to be put data' , data_val)
            const response = await axios.put(url, data_val)
          
  
        } catch (error) {
          console.error('Error sending GPIO pin:', error);
        }
      }
      setCounter((prevCounter) => prevCounter + 1); // Increment counter by 1
    }, 500); // Change interval to every 2 seconds

    return () => clearInterval(interval);
  }, [counter]); // Add dependencies to useEffect if needed


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
        alarm, 
        setAlarm:setAlarm,
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  )
}

export default GameSettingsProvider
