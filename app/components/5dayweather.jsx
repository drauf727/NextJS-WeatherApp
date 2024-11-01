'use client';
import { useWeather } from '../context/WeatherContext';

export default function FiveDayWeather() {
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
    <div className="p-2">
      <h3 className="text-center text-2xl font-bold">Forecast For Next 5 Days:</h3>
      <div className="flex p-2 justify-center" id="card-container">
        {[0, 8, 16, 24, 32].map((index) => {
          const day = forecast.list[index];
          const date = new Date();
          date.setDate(date.getDate() + index/8);
          const temp = Math.round((day.main.temp - 273.15) * 1.8 + 32);

          return (
            <div key={index} className="bg-gray-100 rounded-lg shadow-md m-3 p-4" style={{ width: '12rem' }}>
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