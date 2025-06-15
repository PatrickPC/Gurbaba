
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';

interface MapProps {
  className?: string;
}

const Map = ({ className }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const loadMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [85.3240, 27.7172], // Kathmandu coordinates
      zoom: 15,
    });

    // Add marker for the office location
    new mapboxgl.Marker({ color: '#dc2626' })
      .setLngLat([85.3240, 27.7172])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML('<h3>The Kathmandu Post</h3><p>Kantipath, Kathmandu</p>')
      )
      .addTo(map.current);

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    setIsMapLoaded(true);
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isMapLoaded) {
    return (
      <div className={`bg-gray-100 rounded-lg p-6 ${className}`}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
            <Input
              id="mapbox-token"
              type="text"
              placeholder="Enter your Mapbox public token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <p className="text-sm text-gray-600 mt-1">
              Get your token from{' '}
              <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
                mapbox.com
              </a>
            </p>
          </div>
          <Button onClick={loadMap} disabled={!mapboxToken} className="bg-red-600 hover:bg-red-700">
            Load Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default Map;
