'use client';
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import TodaysWeather from "./components/todaysweather";
import FiveDayWeather from "./components/5dayweather";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />
            
            {/* Content Container */}
            <div className="flex flex-col md:flex-row flex-1">
                {/* Sidebar */}
                <div className="w-full md:w-64 border-b md:border-r bg-gray-50">
                    <Sidebar />
                </div>
                
                {/* Main Content */}
                <main className="flex-1 p-4 md:p-8">
                    <div className="space-y-4 md:space-y-8">
                        <TodaysWeather />
                        <FiveDayWeather />
                    </div>
                </main>
            </div>
        </div>
    );
}
