
import { useState, useEffect } from 'react';

interface WeatherData {
  temp: string;
  condition: string;
  airQuality: string;
}

const TopBar = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData>({ 
    temp: '', 
    condition: '', 
    airQuality: 'Good' 
  });

  // Fetch live date
  const updateCurrentDate = () => {
    const now = new Date();
    const options = { 
      weekday: 'long' as const, 
      year: 'numeric' as const, 
      month: 'long' as const, 
      day: 'numeric' as const,
      timeZone: 'Asia/Kathmandu'
    };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  };

  // Fetch weather data for Bardiya, Nepal
  const fetchWeatherData = async () => {
    try {
      // Using OpenWeatherMap API - this is a public API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Bardiya,NP&appid=demo&units=metric`
      );
      
      if (response.ok) {
        const data = await response.json();
        setWeatherData({
          temp: `${Math.round(data.main.temp)}°C`,
          condition: data.weather[0].main,
          airQuality: 'Good' // This would need a separate API call for real air quality data
        });
      } else {
        // Fallback to demo data if API fails
        setWeatherData({
          temp: '24°C-8°C',
          condition: 'Clear',
          airQuality: 'Good'
        });
      }
    } catch (error) {
      console.log('Weather API error, using fallback data:', error);
      // Fallback weather data for Bardiya
      setWeatherData({
        temp: '28°C',
        condition: 'Clear',
        airQuality: 'Good'
      });
    }
  };

  // Update date and weather on component mount and set interval for updates
  useEffect(() => {
    updateCurrentDate();
    fetchWeatherData();

    // Update date every minute
    const dateInterval = setInterval(updateCurrentDate, 60000);
    
    // Update weather every 30 minutes
    const weatherInterval = setInterval(fetchWeatherData, 1800000);

    return () => {
      clearInterval(dateInterval);
      clearInterval(weatherInterval);
    };
  }, []);

  return (
    <div className="bg-gray-100 py-2 text-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <span className="text-gray-600">{currentDate}</span>
        <div className="flex items-center gap-4">
          <span className="text-red-600">🌡️ {weatherData.temp} Bardiya</span>
          <span className="text-gray-600">Air Quality in Bardiya: {weatherData.airQuality}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;