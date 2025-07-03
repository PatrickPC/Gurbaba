
import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Play, Pause, Volume2, VolumeX, X, Radio } from 'lucide-react';

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
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg"
        >
          <Radio size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 bg-white shadow-xl border-2 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Radio className="text-red-600" size={20} />
              <div>
                <h3 className="font-bold text-sm text-gray-900">Radio Gurbaba</h3>
                <p className="text-xs text-gray-600">Live Stream</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="h-8 w-8 p-0"
              >
                <X size={14} />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <Button
              onClick={togglePlay}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
              size="sm"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            
            <div className="flex items-center gap-2 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="h-8 w-8 p-0"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </Button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>
          </div>

          {isPlaying && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                LIVE ON AIR
              </div>
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