"use client";
import { useState } from 'react';

export default function Sidebar() {
    // State for input and search history
    const [searchInput, setSearchInput] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);

    // Handle the search action
    const handleSearch = () => {
        if (!searchInput.trim()) return; // Don't add empty searches

        // Create new history item with unique ID
        const newHistoryItem = {
            id: Date.now(), // Using timestamp as a simple unique ID
            city: searchInput.trim()
        };

        // Add new search to history (at the beginning of the array)
        setSearchHistory(prevHistory => [newHistoryItem, ...prevHistory]);
        
        // Clear the input field
        setSearchInput('');
    };

    // Handle removing items from history
    const removeFromHistory = (idToRemove) => {
        setSearchHistory(prevHistory => 
            prevHistory.filter(item => item.id !== idToRemove)
        );
    };

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold leading-6 text-gray-900">
                City Search
            </h3>
            <input 
                type="text" 
                placeholder="Search for a city" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleSearch}
            >
                Search
            </button>

            <div className="mt-6">
                <h3 className="text-sm font-semibold leading-6 text-gray-900 mb-4">
                    Search History
                </h3>
                <ul className="space-y-2">
                    {searchHistory.map((item) => (
                        <li 
                            key={item.id}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer"
                        >
                            <span>{item.city}</span>
                            <button 
                                className="text-gray-400 hover:text-red-500"
                                onClick={() => removeFromHistory(item.id)}
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}