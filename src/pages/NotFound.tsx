import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating stars animation
  const stars = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className="absolute rounded-full bg-white opacity-60"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${Math.random() * 3 + 2}s`,
      }}
    />
  ));

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(139, 69, 238, 0.3) 0%, 
            rgba(59, 130, 246, 0.2) 35%, 
            rgba(16, 185, 129, 0.1) 70%, 
            transparent 100%)`
        }}
      />

      {/* Floating stars */}
      <div className="absolute inset-0">
        {stars.map((star, index) => (
          <div
            key={index}
            className="animate-pulse"
            style={{
              ...star.props.style,
              animationDelay: star.props.style.animationDelay,
            }}
          >
            {star}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl">
          
          {/* Animated astronaut character */}
          <div className="relative mb-8">
            <div className="w-80 h-80 mx-auto relative">
              {/* Planet background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300 opacity-20 animate-pulse" />
              
              {/* Astronaut SVG */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="transition-transform duration-500 ease-out"
                  style={{
                    transform: isHovering ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                  }}
                >
                  <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
                    {/* Helmet */}
                    <circle cx="100" cy="70" r="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                    <circle cx="100" cy="70" r="35" fill="rgba(139, 69, 238, 0.2)"/>
                    
                    {/* Face */}
                    <circle cx="100" cy="70" r="25" fill="#fbbf24"/>
                    <circle cx="92" cy="65" r="3" fill="#1f2937"/>
                    <circle cx="108" cy="65" r="3" fill="#1f2937"/>
                    <path d="M 95 75 Q 100 80 105 75" stroke="#1f2937" strokeWidth="2" fill="none"/>
                    
                    {/* Body */}
                    <ellipse cx="100" cy="130" rx="30" ry="40" fill="rgba(255,255,255,0.9)"/>
                    <ellipse cx="100" cy="130" rx="25" ry="35" fill="rgba(59, 130, 246, 0.3)"/>
                    
                    {/* Arms */}
                    <ellipse cx="70" cy="120" rx="12" ry="25" fill="rgba(255,255,255,0.9)" transform="rotate(-20 70 120)"/>
                    <ellipse cx="130" cy="120" rx="12" ry="25" fill="rgba(255,255,255,0.9)" transform="rotate(20 130 120)"/>
                    
                    {/* Legs */}
                    <ellipse cx="85" cy="170" rx="10" ry="20" fill="rgba(255,255,255,0.9)"/>
                    <ellipse cx="115" cy="170" rx="10" ry="20" fill="rgba(255,255,255,0.9)"/>
                    
                    {/* Floating effect particles */}
                    <circle cx="60" cy="50" r="2" fill="rgba(255,255,255,0.6)" className="animate-bounce">
                      <animate attributeName="cy" values="50;45;50" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="140" cy="60" r="1.5" fill="rgba(255,255,255,0.4)" className="animate-bounce">
                      <animate attributeName="cy" values="60;55;60" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.5)" className="animate-bounce">
                      <animate attributeName="cy" values="40;35;40" dur="1.8s" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 404 Text with gradient */}
          <div className="mb-6">
            <h1 className="text-8xl md:text-9xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
          </div>

          {/* Message */}
          <div className="mb-8 space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 animate-pulse">
              Houston, we have a problem!
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
              The page you're looking for has drifted off into the cosmic void. Let's navigate you back to safety.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <Link to="/">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  🚀 Launch Back Home
                </span>
              </Link>
            </button>
            
            <button className="group px-8 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-2xl hover:bg-purple-400 hover:text-white transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-2">
                🛸 Explore Universe
              </span>
            </button>
          </div>

          {/* Fun floating elements */}
          <div className="absolute top-20 left-10 animate-spin" style={{ animationDuration: '10s' }}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-70" />
          </div>
          <div className="absolute top-40 right-20 animate-bounce">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-blue-500 opacity-60" />
          </div>
          <div className="absolute bottom-40 left-20 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite alternate;
        }
        
        @keyframes twinkle {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default NotFound;