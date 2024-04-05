import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useGameSettings} from '../GameSettingProvider'
interface WeatherResponse {
    coord: {
      lon: number;
      lat: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }
  

const WeatherApp= () => {
  const {currentWeather, setCurrentWeather, highWeather, setHighWeather, lowWeather, setLowWeather, userName, feelsLike,setFeelsLike}= useGameSettings()
  const API_KEY = "5c2d18ee11e85b1b3eec0f5ba5864c25";
  const lat = "42.3601"
  const lon ='-71.0589';
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  useEffect(() => {
    axios
      .get(URL)
      .then((response:any) => {
        const data:WeatherResponse = response.data;
        setCurrentWeather(celsiusToKelvin(data.main.temp));
        setHighWeather(celsiusToKelvin(data.main.temp_max));
        setLowWeather(celsiusToKelvin(data.main.temp_min));
        setFeelsLike(celsiusToKelvin(data.main.feels_like));
      })
      .catch((error:any) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  return (
    `Hello ${userName} I hope you're having a wonderful day. The weather outside is currently ${currentWeather} °F
     but feels like ${feelsLike}°F. The high is ${highWeather} °F the low is ${lowWeather} °F.`
  );
};
function celsiusToKelvin(kelvin:number) {
    const farenheit =(kelvin - 273.15) * 9 / 5 + 32
    return Math.ceil(farenheit);
  }
  

export default WeatherApp;

