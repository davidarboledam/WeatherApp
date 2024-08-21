import React, { useEffect, useState } from 'react'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import "./App.css"



  
const App = () => {

  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  

  useEffect(() =>{
    const success = (position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })
      
    };

    const error = () => {
      setHasError(true)
      setIsLoading(false)
    }

    navigator.geolocation.getCurrentPosition(success, error)
    }, []);

    useEffect(() => {

      if (coords){
      const api_key = "27ca158754690894a6ead00f943b6414"

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${api_key}`;
      


      axios
      .get(url)
      .then((res) => {
        setWeather(res.data);
        const celsius = (res.data.main.temp - 273.15).toFixed(1);
        const fahrenheit = ((celsius * 9) / 5 + 32).toFixed(1);
        setTemp({celsius, fahrenheit});
        
      
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
    }
    }, [coords])

     

  return (
    <div className='app flex-container'>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : hasError ? (
      <h1> To obtein the weather of your city you must to accept the permissions</h1>
      ) :
      (
      <WeatherCard 
        weather={weather} temp={temp}/>
      )}
    </div>
  );
}

export default App
