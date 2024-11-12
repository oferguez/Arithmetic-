import { useState } from 'react';
import { NumberInput } from './components/NumberInput';
import { ExerciseCard } from './components/ExerciseCard';
import { Celebration } from './components/Celebration';
import { generateExercises } from './utils/mathUtils';
import { GameState } from './types';
import { Brain, Trophy, RotateCcw } from 'lucide-react';

function App() {
  const [started, setStarted] = useState(false);
  const [startRange, setStartRange] = useState(1);
  const [endRange, setEndRange] = useState(10);
  const [exerciseCount, setExerciseCount] = useState(10);
  const [gameState, setGameState] = useState<GameState>({
    currentExercise: 0,
    exercises: [],
    score: 0,
    showCelebration: false,
  });

  const handleStart = () => {
    const exercises = generateExercises(startRange, endRange, exerciseCount);
    setGameState({
      currentExercise: 0,
      exercises,
      score: 0,
      showCelebration: false,
    });
    setStarted(true);
  };

  const handleRestart = () => {
    handleStart();
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setGameState((prev) => ({
        ...prev,
        score: prev.score + 1,
        showCelebration: true,
      }));

      setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          currentExercise: prev.currentExercise + 1,
          showCelebration: false,
        }));
      }, 2000);
    }
  };

  const isGameComplete = gameState.currentExercise >= gameState.exercises.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Brain className="w-12 h-12 text-purple-600 mr-4" />
          <h1 className="text-4xl font-bold text-purple-600">Math Adventure</h1>
        </div>

        {!started ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-purple-600 mb-6">Setup Your Practice</h2>
            <div className="flex flex-wrap gap-8 mb-8">
              <NumberInput
                label="Start Number"
                value={startRange}
                onChange={setStartRange}
                min={1}
              />
              <NumberInput
                label="End Number"
                value={endRange}
                onChange={setEndRange}
                min={startRange}
              />
              <NumberInput
                label="Number of Exercises"
                value={exerciseCount}
                onChange={setExerciseCount}
                min={1}
                max={20}
              />
            </div>
            <button
              onClick={handleStart}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full text-xl transform transition hover:scale-105"
            >
              Start Learning!
            </button>
          </div>
        ) : isGameComplete ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-purple-600 mb-4">
              Fantastic Job! 🎉
            </h2>
            <p className="text-xl mb-6">
              You got {gameState.score} out of {exerciseCount} correct!
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setStarted(false)}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full text-xl transform transition hover:scale-105"
              >
                New Game
              </button>
              <button
                onClick={handleRestart}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full text-xl transform transition hover:scale-105 flex items-center"
              >
                <RotateCcw className="w-6 h-6 mr-2" />
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <p className="text-xl font-medium text-purple-600">
                Exercise {gameState.currentExercise + 1} of {exerciseCount}
              </p>
              <p className="text-lg text-purple-500">
                Score: {gameState.score}
              </p>
              <button
                onClick={handleRestart}
                className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full transform transition hover:scale-105 flex items-center mx-auto"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Restart
              </button>
            </div>
            <ExerciseCard
              exercise={gameState.exercises[gameState.currentExercise]}
              onAnswer={handleAnswer}
            />
          </>
        )}
      </div>

      {gameState.showCelebration && <Celebration />}
    </div>
  );
}

export default App;