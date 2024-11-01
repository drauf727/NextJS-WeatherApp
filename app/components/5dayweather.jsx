'use client';
import { useWeather } from '../context/WeatherContext';

export default function FiveDayWeather({ weatherData }) {
  const { forecast } = useWeather();

  if (!forecast) return null;

  const getWeatherImage = (weather) => {
    switch(weather) {
      case 'Clouds': return 'cloud.png';
      case 'Thunderstorm': return 'rain.png';
      case 'Drizzle': return 'rain.png';
      case 'Rain': return 'rain.png';
      case 'Snow': return 'snow.png';
      case 'Clear': return 'sun.png';
      default: return 'fog.png';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[0, 8, 16, 24, 32].map((index) => {
          const day = forecast.list[index];
          const date = new Date();
          date.setDate(date.getDate() + index/8);
          const temp = Math.round((day.main.temp - 273.15) * 1.8 + 32);

          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4 shadow">
              <h4 className="font-semibold">
                {`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}
              </h4>
              <img 
                src={`/weatherimages/${getWeatherImage(day.weather[0].main)}`}
                height="50" 
                width="50" 
                alt="weather icon"
                className="my-2"
              />
              <p>Temperature: {temp}°F</p>
              <p>Wind Speed: {day.wind.speed} MPH</p>
              <p>Humidity: {day.main.humidity}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}