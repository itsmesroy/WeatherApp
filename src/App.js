import React, {useState} from 'react'
import './App.css';
import axios from 'axios'
import WeatherCard from './WeatherCard.jsx'

function App() {
  const [city, setCity]= useState('');
  const [weather, setWeather]= useState(null);
  const [loading, setLoading]= useState(false);
  const [error, setError]= useState('');

  const API_key= '4ece303973934bf493655044250102';
  const API=`https://api.weatherapi.com/v1/current.json?key=${API_key}&q=`;

  const fetchWeather= async()=>{
    if(!city){
      alert('Please enter a city');
      return;
    }
    setLoading(true);
    setError('');
    try{
      const response= await axios(`${API}${city}`);
      setWeather(response.data);
      console.log('API Response:', response);
    }catch(err){
      setError("Failed to fetch weather data")
      alert("Failed to fetch weather data")
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
    <div className="search">
      <input type="text" placeholder="Enter city name" value={city} onChange={(e)=>setCity(e.target.value)}/>
      <button onClick={fetchWeather}>Search</button>
    </div>

    {loading && <p>Loading data...</p>}

    {weather && !loading &&(
      <div className="weather-cards">
        <WeatherCard title="Temperature" value={`${weather.current.temp_c}°C `}/>
        <WeatherCard title="Humidity" value={`${weather.current.humidity}%`}/>
        <WeatherCard title="Condition" value={`${weather.current.condition.text}`}/>
        <WeatherCard title="Wind Speed" value={`${weather.current.wind_kph} km/hr `}/>
      </div>
    )}

    </div>
  );
}

export default App;
