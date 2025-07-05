import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [rotationOrbit, setRotationOrbit] = useState(0);
  const [rotationPlanet, setRotationPlanet] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [emailCopied, setEmailCopied] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const cursorRef = useRef(null);

  // Вращение вокруг центральной оси
  useEffect(() => {
    if (isHovered || isMobile) return;
    const orbit = () => {
      setRotationOrbit((prev) => (prev + 0.2) % 360);
      requestAnimationFrame(orbit);
    };
    orbit();
  }, [isHovered, isMobile]);

  // Вращение самой планеты
  useEffect(() => {
    if (isMobile) return;
    const planetSpin = () => {
      setRotationPlanet((prev) => (prev + 0.5) % 360);
      requestAnimationFrame(planetSpin);
    };
    planetSpin();
  }, [isMobile]);

  // Обработка движения мыши (для кастомного курсора)
  useEffect(() => {
    if (isMobile) return;
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [isMobile]);

  // Копирование email
  const copyEmail = () => {
    navigator.clipboard.writeText("info@outpost.com").then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 1500);
    });
  };

  return (
    <div className="bg-black text-white min-h-screen font-mono overflow-hidden relative">
      {/* Custom Cursor (hidden on mobile) */}
      {!isMobile && (
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 w-6 h-6 pointer-events-none rounded-full border border-white/30 backdrop-blur-sm shadow-glow z-[9999]"
          style={{
            transform: `translate(${cursorPos.x - 12}px, ${cursorPos.y - 12}px)`,
            transition: isHovered ? 'transform 0.05s ease-out' : 'transform 0.1s ease-out',
          }}
        ></div>
      )}

      {/* Running Text Banner */}
      <div className="overflow-hidden whitespace-nowrap py-2 border-t border-b border-gray-800 fixed top-0 left-0 w-full z-10 backdrop-blur-md bg-black/30">
        <div className="animate-marquee text-xs sm:text-sm md:text-base text-gray-400 tracking-wider uppercase">
          An outpost for better thinking. // Всё начинается с идеи. // Мы на передовой мысли. // OUTPOST — точка доступа к креативу.
        </div>
      </div>

      {/* Starfield Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] opacity-20"></div>
        {[...Array(isMobile ? 40 : 80)].map((_, i) => {
          const speed = Math.random() * 10 + 5;
          const delay = Math.random() * 10;

          return (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 1.2 + 0.3}px`,
                height: `${Math.random() * 1.2 + 0.3}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.4 + 0.1,
                animation: isHovered ? 'none' : `slowTwinkle ${speed}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            ></div>
          );
        })}
      </div>

      {/* Main Content */}
      <main
        className="flex flex-col items-center justify-center h-screen px-4 sm:px-6 text-center relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Central Animated Scene */}
        <div className="relative w-full max-w-md h-[250px] sm:h-[300px] md:h-[400px] mb-6">
          {/* Orbiting Rings */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000"
            style={{ transform: `rotate(${rotationOrbit}deg)` }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-dashed border-blue-500/30"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-52 sm:h-52 rounded-full border border-dashed border-purple-500/30"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-72 sm:h-72 rounded-full border border-dashed border-cyan-500/20"></div>
          </div>

          {/* Center Logo with Glow */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <svg
              width={isMobile ? "100" : "160"}
              height={isMobile ? "100" : "160"}
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={isHovered ? 'scale-95 opacity-70' : 'animate-pulse-slow'}
            >
              <path
                d="M100 20L130 70H70L100 20ZM100 80L130 130H70L100 80ZM100 140L130 190H70L100 140Z"
                stroke="url(#logoGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#4b00ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Orbiting Planet */}
          <div
            className="absolute top-1/2 left-1/2 transform translate-x-14 -translate-y-1/2 z-0 origin-center"
            style={{
              transform: `rotate(${rotationOrbit}deg) translateX(${isMobile ? '40px' : '80px'}) rotate(-${rotationOrbit}deg)`,
            }}
          >
            <div
              className={`w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 ${
                isHovered ? 'opacity-80 scale-95' : 'animate-pulse-slow-delayed'
              }`}
              style={{ transform: `rotate(${rotationPlanet}deg)` }}
            ></div>
          </div>
        </div>

        {/* Tagline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wider mb-4 leading-tight">
          <span className="block">OUTPOST</span>
          <span className="text-gray-400 mt-1 block">An outpost for better thinking.</span>
        </h1>

        {/* Mission Statement */}
        <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-sm sm:max-w-md mx-auto leading-relaxed mb-6">
          Не штаб. Не база. А точка на передовой. Туда, где нужна идея. Пространство, где можно всё.
        </p>

        {/* Contact Info */}
        <div className="space-y-2 text-xs sm:text-sm md:text-base max-w-sm sm:max-w-md mx-auto">
          <div
            onClick={copyEmail}
            className="cursor-pointer text-gray-400 hover:text-white transition-colors duration-300 select-all py-2 px-3 rounded-lg"
            title={emailCopied ? 'Скопировано!' : 'Кликните, чтобы скопировать'}
          >
            {emailCopied ? '✅ info@outpost.com' : 'info@outpost.com'}
          </div>
          <a
            href="https://t.me/outpostagency "
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-400 hover:text-white hover:underline transition-colors duration-300 py-2 px-3 rounded-lg"
          >
            @outpostagency
          </a>
        </div>

        {/* Privacy Policy */}
        <div className="mt-6 text-xs text-gray-600 hover:text-gray-400 transition-colors duration-300">
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
        </div>
      </main>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        @keyframes slowTwinkle {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        @keyframes pingSlow {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.4);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
        }

        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }

        .animate-pulse-slow-delayed {
          animation: pulseSlow 6s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-ping-slow {
          animation: pingSlow 4s ease-in-out infinite;
        }

        .animate-ping-slow-delayed {
          animation: pingSlow 4s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .shadow-glow {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default App;