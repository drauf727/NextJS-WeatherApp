'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext({
  currentWeather: null,
  forecast: null,
  error: null,
  getWeatherData: async () => {},
});

export function WeatherProvider({ children }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = '5ccfb87c2313dc93a4278d2086ead169';

  const getWeatherData = async (city) => {
    try {
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const currentData = await currentResponse.json();
      
      if (currentData.cod !== 200) {
        setError('City not found. Please try again.');
        return;
      }

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      );
      const forecastData = await forecastResponse.json();

      setCurrentWeather(currentData);
      setForecast(forecastData);
      setError(null);
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <WeatherContext.Provider 
      value={{ 
        currentWeather, 
        forecast, 
        error, 
        getWeatherData 
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
} 
