import React, { useState, useEffect, useRef } from 'react';
import { Zap, TrendingUp, Volume2, VolumeX } from 'lucide-react';
import ChungusButton from './components/ChungusButton';
import UpgradeButton from './components/UpgradeButton';
import ScoreDisplay from './components/ScoreDisplay';

// Import the background music
import backgroundMusic from '/assets/sounds/background-music.mp3';

// Sound effects (kept as base64 for simplicity)
const clickSound =
  'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==';
const upgradeSound =
  'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==';

function App() {
  const [score, setScore] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoClickPower, setAutoClickPower] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(backgroundMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // Set volume to 50%
    audioRef.current
      .play()
      .catch((error) => console.error('Failed to play music:', error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prevScore) => prevScore + autoClickPower);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoClickPower]);

  const handleClick = () => {
    setScore((prevScore) => prevScore + clickPower);
    playSound(clickSound);
  };

  const buyUpgrade = (cost: number, upgradeFunction: () => void) => {
    if (score >= cost) {
      setScore((prevScore) => prevScore - cost);
      upgradeFunction();
      playSound(upgradeSound);
    }
  };

  const playSound = (sound: string) => {
    const audio = new Audio(sound);
    audio
      .play()
      .catch((error) => console.error('Failed to play sound:', error));
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((error) => console.error('Failed to play music:', error));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-chungus bg-cover bg-center flex flex-col items-center justify-center p-4">
      <div className="bg-black bg-opacity-50 p-8 rounded-lg">
        <h1 className="text-6xl font-bold text-white mb-8">Chungus BLAST</h1>
        <ScoreDisplay score={score} />
        <ChungusButton onClick={handleClick} />
        <div className="mt-8 space-y-4">
          <UpgradeButton
            icon={<Zap className="mr-2" />}
            label="Upgrade Click Power"
            cost={10 * clickPower}
            onClick={() =>
              buyUpgrade(10 * clickPower, () =>
                setClickPower((prev) => prev + 1)
              )
            }
            disabled={score < 10 * clickPower}
          />
          <UpgradeButton
            icon={<TrendingUp className="mr-2" />}
            label="Upgrade Auto Click"
            cost={50 * (autoClickPower + 1)}
            onClick={() =>
              buyUpgrade(50 * (autoClickPower + 1), () =>
                setAutoClickPower((prev) => prev + 1)
              )
            }
            disabled={score < 50 * (autoClickPower + 1)}
          />
        </div>
        <button
          className="mt-8 flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={toggleMusic}
        >
          {isMusicPlaying ? (
            <VolumeX className="mr-2" />
          ) : (
            <Volume2 className="mr-2" />
          )}
          {isMusicPlaying ? 'Mute Music' : 'Play Music'}
        </button>
      </div>
    </div>
  );
}

export default App;
