'use client';
import { useState } from 'react';
import Search from '../search';

export default function Sidebar() {
    const [searchHistory, setSearchHistory] = useState([]);

    // Function to add to search history
    const addToHistory = (city) => {
        if (!searchHistory.includes(city)) {
            setSearchHistory(prev => [city, ...prev].slice(0, 5)); // Keep last 5 searches
        }
    };

    return (
        <div className="bg-gray-100 p-4 h-full">
            <h2 className="text-xl font-semibold mb-4">Search for a City:</h2>
            <Search onSearch={addToHistory} />
            
            {/* Search History */}
            {searchHistory.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Recent Searches:</h3>
                    <div className="space-y-2">
                        {searchHistory.map((city, index) => (
                            <button
                                key={index}
                                className="w-full text-left px-4 py-2 bg-white rounded shadow hover:bg-gray-50"
                                onClick={() => getWeatherData(city)}
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