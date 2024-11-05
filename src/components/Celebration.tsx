import React from 'react';
import Confetti from 'react-confetti';
import { useSpring, animated } from '@react-spring/web';
import { Heart, Sparkles } from 'lucide-react';

export const Celebration: React.FC = () => {
  const bounce = useSpring({
    from: { transform: 'scale(0)' },
    to: [
      { transform: 'scale(1.2)' },
      { transform: 'scale(0.9)' },
      { transform: 'scale(1)' },
    ],
    config: { tension: 300, friction: 10 },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
      />
      <animated.div style={bounce} className="flex flex-col items-center">
        <div className="flex gap-4 mb-4">
          <Heart className="w-16 h-16 text-pink-500" />
          <Sparkles className="w-16 h-16 text-yellow-400" />
          <Heart className="w-16 h-16 text-pink-500" />
        </div>
        <h2 className="text-4xl font-bold text-purple-600 bg-white px-8 py-4 rounded-full shadow-lg">
          Amazing Job! 🎉
        </h2>
      </animated.div>
    </div>
  );
};