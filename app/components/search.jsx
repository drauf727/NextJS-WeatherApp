'use client';
import { useState } from 'react';
import { useWeather } from '../context/WeatherContext';

export default function Search({ onSearch, onCitySelect }) {
    const [city, setCity] = useState('');
    const { getWeatherData, error } = useWeather();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (city.trim()) {
            await getWeatherData(city);
            onSearch?.(city); // Original onSearch prop
            onCitySelect?.(city); // Add this to update recent searches
            setCity(''); // Clear input after search
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className="w-full px-4 py-2 border rounded mb-2"
                />
                <button 
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Search
                </button>
            </form>
            {error && (
                <p className="text-red-500 mt-2 text-sm">{error}</p>
            )}
        </div>
    );
}

