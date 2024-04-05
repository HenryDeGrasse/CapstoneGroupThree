import React, { createContext,useEffect, ReactNode, useContext, useState } from 'react'
import axios from 'axios';
import { HOST } from './App';

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
    userData:({
      firstname: string,
      lastname: string,
      address: string,
      preferredRoomTemperature: string,
      sleepTime: string,
      wakeTime: string,
      awayDTime:string,
      awayATime:string,
      arrivalTemperature: string
  })
  setUserData:(data: {
    firstname: string,
    lastname: string,
    address: string,
    preferredRoomTemperature: string,
    sleepTime: string,
    wakeTime: string,
    awayDTime:string,
    awayATime:string,
    arrivalTemperature: string
} )=>void
    
  };
  


const GameSettingsContext = createContext<GameSettingsContextType | undefined>(
  undefined,
)

type GameSettingsProviderProps = {
  children: ReactNode
  isLoggedIn: boolean
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
let uname=localStorage.getItem('userName')
export const GameSettingsProvider: React.FC<GameSettingsProviderProps> = ({ isLoggedIn, children
}) => {
  const [temperatureUser, setTemperatureUser] = useState<number>(75)
  const [temperatureReading, setTemperatureReading] = useState<number>(75)
  const [ventTop, setVentTop] = useState<number>(50)
  const [ventBottom, setVentBottom] = useState<number>(50)
  const [humidity, setHumidity] = useState<number>(50)
  const [userName, setUserName] = useState<string>(uname? uname :"Guest")
  const [currentWeather, setCurrentWeather] = useState<number>(75)
  const [highWeather, setHighWeather] = useState<number>(80)
  const [lowWeather, setLowWeather] = useState<number>(70)
  const [feelsLike, setFeelsLike] = useState<number>(76)
  const [csiData, setCsiData] = useState<boolean>(false)
  const [vacation, setVacation] = useState<boolean>(false)
  const [light, setLight] = useState<boolean>(false)
  const [alarm,setAlarm]=useState<boolean>(false)
  const [gid,setGid]= useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    address: '',
    preferredRoomTemperature: '',
    sleepTime: '',
    wakeTime: '',
    awayDTime: '',
    awayATime: '',
    arrivalTemperature: ''
});
  useEffect(() => {
    console.log(initialLoad)
    let interval:any;
    if (isLoggedIn) {
      const fetchData = async () => {
        
   

        const host = HOST;
        const demo_name='admin'
        const url = `http://${host}:1337/api/gpio-pins`;
        console.log(await axios.get(`${url}?filters[uid][username][$eq]=${userName}`))
        try {
          
          const response = await axios.get(`${url}?filters[uid][username][$eq]=${userName}`);
          const data = response.data.data[0];
          setGid(data.id);
          setTemperatureReading(data.attributes.tempRead);
          setTemperatureUser(data.attributes.tempUser);
          setLight(data.attributes.light);
          setAlarm(data.attributes.alarm);
          setVacation(data.attributes.vacationHold);
          setVentTop(data.attributes.ventAngle);
          setCsiData(data.attributes.isCSI);
          const userInfo= await axios.get(`http://${host}:1337/api/users?filters[username][$eq]=${userName}`)
          setUserData(userInfo.data[0].userDatas)
        } catch (error) {
          console.error('Error fetching GPIO pin:', error);
        }
      };

      const updateData = async () => {
        const host = HOST;
        const url = `http://${host}:1337/api/gpio-pins`;
        // Send GPIO pin
        try {
          const data_val = {
            data: {
              light: light,
              vacationHold: vacation,
              tempRead: temperatureReading,
              tempUser: temperatureUser,
              ventAngle: ventTop,
              alarm: alarm,
              isCSI: csiData,
            },
          };
          await axios.put(`${url}/${gid}`, data_val);
        } catch (error) {
          console.error('Error sending GPIO pin:', error);
        }
      };

      if (initialLoad) {
        fetchData();
        setInitialLoad(false);
      } else {
        interval = setInterval(() => {
          updateData();
        }, 500); // Adjust the interval as needed
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isLoggedIn, userName, initialLoad, light, vacation, temperatureReading, temperatureUser, ventTop, alarm, csiData]);

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
        userData,
        setUserData:setUserData
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  )
}

export default GameSettingsProvider
