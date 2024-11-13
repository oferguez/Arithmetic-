import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Exercise } from '../types';
import { Star } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onAnswer,
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [shake, setShake] = useState(false);

  const shakeAnimation = useSpring({
    transform: shake ? 'translateX(-5px)' : 'translateX(0px)',
    config: { tension: 300, friction: 10 },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = parseInt(userAnswer) === exercise.answer;

    if (isCorrect) {
      onAnswer(true);
      setUserAnswer('');
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <animated.div
      style={shakeAnimation}
      className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full"
    >
      <div className="flex items-center justify-center mb-6">
        <Star className="text-yellow-400 w-8 h-8" />
        <h2 className="text-3xl font-bold text-purple-600 mx-4">
          Problem Time!
        </h2>
        <Star className="text-yellow-400 w-8 h-8" />
      </div>

      <div className="text-4xl font-bold text-center mb-8 text-gray-700">
        {exercise.num1} {exercise.operation} {exercise.num2} = ?
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-32 text-center text-3xl p-4 border-4 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none"
          autoFocus
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full text-xl transform transition hover:scale-105"
        >
          Check Answer
        </button>
      </form>
    </animated.div>
  );
};
