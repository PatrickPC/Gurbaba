
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
      // Bardiya district (Gulariya), Nepal — Open-Meteo, free & no API key
    const lat = 28.2058;
    const lon = 81.3486;
    try {
      const [wRes, aRes] = await Promise.all([
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=Asia%2FKathmandu`),
        fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`),
      ]);
      const w = wRes.ok ? await wRes.json() : null;
      const a = aRes.ok ? await aRes.json() : null;
      const temp = w?.current?.temperature_2m;
      const aqi = a?.current?.us_aqi;
      const aqiLabel =
        typeof aqi !== 'number' ? '—'
        : aqi <= 50 ? `Good (${aqi})`
        : aqi <= 100 ? `Moderate (${aqi})`
        : aqi <= 150 ? `Unhealthy for sensitive (${aqi})`
        : aqi <= 200 ? `Unhealthy (${aqi})`
        : `Very unhealthy (${aqi})`;
      setWeatherData({
        temp: typeof temp === 'number' ? `${Math.round(temp)}°C` : '—',
        condition: '',
        airQuality: aqiLabel,
      });
        } catch (error) {
      console.log('Weather API error:', error);
      setWeatherData({ temp: '—', condition: '', airQuality: '—' });
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