'use client';
import { useState, useEffect, useCallback } from 'react';
import { useWeather } from '../../context/WeatherContext';
import Search from '../search';

export default function Sidebar() {
    const { getWeatherData } = useWeather();
    const [searchHistory, setSearchHistory] = useState([]);

    // Load search history on mount
    useEffect(() => {
        const saved = localStorage.getItem('searchHistory');
        if (saved) {
            setSearchHistory(JSON.parse(saved));
        }
    }, []);

    const handleSearch = useCallback(async (city) => {
        try {
            // First fetch the weather data
            await getWeatherData(city);
            
            // Get current data from localStorage
            const existingData = localStorage.getItem('searchHistory');
            const existingHistory = existingData ? JSON.parse(existingData) : [];
            
            // Create new history array by combining new city with existing data
            const newHistory = [
                city,
                ...existingHistory.filter(c => c !== city) // Remove duplicates
            ].slice(0, 5); // Keep only 5 most recent
            
            // Update both localStorage and state
            localStorage.setItem('searchHistory', JSON.stringify(newHistory));
            setSearchHistory(newHistory);
            
            console.log('Updated history:', newHistory);
        } catch (error) {
            console.error('Error in handleSearch:', error);
        }
    }, [getWeatherData]); // Add dependencies used inside the callback

    return (
        <div className="bg-gray-100 p-4 h-full">
            <h2 className="text-xl font-semibold mb-4">Search for a City:</h2>
            <Search onCitySelect={handleSearch} />
            
            {searchHistory.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Recent Searches:</h3>
                    <div className="space-y-2">
                        {searchHistory.map((city, index) => (
                            <button
                                key={city}
                                className="w-full text-left px-4 py-2 bg-white rounded shadow hover:bg-gray-50"
                                onClick={() => handleSearch(city)}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}