
import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Play, Pause, Volume2, VolumeX, Minimize2, Radio, Music } from 'lucide-react';

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  const radioStreamUrl = "https://live.itech.host:8663/stream";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-full shadow-2xl border-2 border-red-500 transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-2">
            <Radio size={24} className={isPlaying ? "animate-pulse" : ""} />
            {isPlaying && (
              <div className="flex items-center gap-1">
                <div className="w-1 h-6 bg-white rounded animate-pulse"></div>
                <div className="w-1 h-4 bg-white rounded animate-pulse delay-75"></div>
                <div className="w-1 h-5 bg-white rounded animate-pulse delay-150"></div>
              </div>
            )}
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 bg-gradient-to-br from-white to-gray-50 shadow-2xl border border-red-100 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-red-600 to-red-700 rounded-full">
                <Radio className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                  Radio Gurbaba
                  <Music size={16} className="text-red-600" />
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-green-600 font-medium">LIVE STREAMING</p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="h-8 w-8 p-0 hover:bg-red-50"
            >
              <Minimize2 size={16} className="text-gray-600" />
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={togglePlay}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
              size="sm"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            
            <div className="flex items-center gap-3 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="h-10 w-10 p-0 hover:bg-red-50"
              >
                {isMuted ? <VolumeX size={18} className="text-gray-600" /> : <Volume2 size={18} className="text-gray-600" />}
              </Button>
              
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>
              <span className="text-xs text-gray-500 w-10 text-center">{Math.round(volume * 100)}%</span>
            </div>
          </div>

          {isPlaying && (
            <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-center gap-2 text-sm text-green-700 font-medium">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></div>
                </div>
                NOW PLAYING - RADIO GURBABA
              </div>
              <p className="text-xs text-green-600 mt-1">Bringing you the best music 24/7</p>
            </div>
          )}

          <audio
            ref={audioRef}
            src={radioStreamUrl}
            preload="none"
            onLoadStart={() => console.log('Loading radio stream...')}
            onError={(e) => console.error('Audio error:', e)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RadioPlayer;