'use client';
import { useWeather } from '../context/WeatherContext';

export default function TodaysWeather({ weatherData }) {
    const { currentWeather } = useWeather();

    console.log('currentWeather:', currentWeather);

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

    const getDetailImage = (weather) => {
        switch(weather) {
            case 'Clouds': return 'clouddetail.jpg';
            case 'Thunderstorm': return 'thunderdetail.jpg';
            case 'Drizzle': return 'drizzledetail.jpg';
            case 'Rain': return 'rainydetail.jpg';
            case 'Snow': return 'snowdetail.jpg';
            case 'Clear': return 'clear2detail.jpg';
            default: return 'unknowndetail.jpg';
        }
    }

    if (!currentWeather) {
        return (
            <div className="p-4 bg-white rounded-lg shadow">
                <p>Please search for a city to see weather information</p>
            </div>
        );
    }

    const temp = Math.round((currentWeather.main.temp - 273.15) * 1.8 + 32);
    const today = new Date();

    return (
        <div className="bg-white rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-2">{currentWeather.name}</h1>
                    <img 
                        src={`/weatherimages/${getWeatherImage(currentWeather.weather[0].main)}`}
                        height="50" 
                        width="50" 
                        alt="weather icon"
                        className="my-2"
                    />
                    <div className="space-y-2">
                        <p className="font-bold">Today's Weather:</p>
                        <p>Temperature: {temp}°F</p>
                        <p>Wind Speed: {currentWeather.wind.speed} MPH</p>
                        <p>Humidity: {currentWeather.main.humidity}%</p>
                    </div>
                </div>

                <div className="hidden md:block">
                    <img 
                        src={`/weatherimages/${getDetailImage(currentWeather.weather[0].main)}`}
                        alt="weather"
                        className="w-full h-[400px] object-cover rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}