'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  const [foundItems, setFoundItems] = useState<boolean[]>(Array(9).fill(false));
  const [gameScore, setGameScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false); // user must start
  const darkMode = true; // always dark on this page
  const [wrongClicks, setWrongClicks] = useState(0);

  // Generate initial microphone positions (6 out of 9)
  const generateMicrophones = () => {
    const positions = Array(9).fill(false);
    const indices: number[] = [];
    while (indices.length < 6) {
      const randomIndex = Math.floor(Math.random() * 9);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    indices.forEach((index) => (positions[index] = true));
    return positions;
  };

  const [microphonePositions, setMicrophonePositions] = useState<boolean[]>(
    generateMicrophones()
  );

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("microphoneGameHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
    // Set dark mode
    document.documentElement.classList.add("dark");
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
      if (gameScore > highScore) {
        setHighScore(gameScore);
        localStorage.setItem("microphoneGameHighScore", gameScore.toString());
      }
    }
  }, [timeLeft, gameActive, gameScore, highScore]);

  const handleItemClick = (index: number) => {
    if (!gameActive || foundItems[index]) return;

    const newFoundItems = [...foundItems];
    newFoundItems[index] = true;
    setFoundItems(newFoundItems);

    if (microphonePositions[index]) {
      // Correct click
      const points = level * 100;
      setGameScore(gameScore + points);

      // Check if all microphones are found
      const foundMicrophones = newFoundItems.filter(
        (found, i) => found && microphonePositions[i]
      ).length;
      if (foundMicrophones === 6) {
        setLevel(level + 1);
        setFoundItems(Array(9).fill(false));
        setWrongClicks(0);
        setTimeLeft(timeLeft + 2); // Reduced increment
      }
    } else {
      // Wrong click
      setWrongClicks(wrongClicks + 1);
      if (wrongClicks + 1 >= 3) {
        setGameActive(false);
        if (gameScore > highScore) {
          setHighScore(gameScore);
          localStorage.setItem("microphoneGameHighScore", gameScore.toString());
        }
      }
    }
  };

  const resetGame = () => {
    setFoundItems(Array(9).fill(false));
    setGameScore(0);
    setLevel(1);
    setTimeLeft(30);
    setGameActive(false); // don't auto-start
    setWrongClicks(0);
    // Regenerate microphone positions
    const newPositions = generateMicrophones();
    setMicrophonePositions(newPositions);
  };

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  //   if (!darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="text-9xl font-black">404</div>
          <h1 className="text-4xl font-bold">The Stage is Empty!</h1>
          <p className="text-xl text-gray-400">
            Oops! Looks like this gig is a no-show!
          </p>
        </div>

        {/* Game Stats */}
        <div className="flex justify-center space-x-4 text-lg font-semibold">
          <div>Score: {gameScore}</div>
          <div>High Score: {highScore}</div>
          <div>Level: {level}</div>
          <div>Time: {timeLeft}s</div>
          <div>Wrong Clicks: {wrongClicks}/3</div>
        </div>

        {/* Interactive MC Illustration */}
        <Card className="p-8 bg-gray-800 border-gray-700">
          <div className="relative">
            {/* MC Character */}
            <div className="text-6xl mb-4">🎤</div>
            <div
              className={`speech-bubble p-4 rounded-lg relative mb-6 ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <p className="font-medium text-white">
                {gameActive
                  ? `"Find 6 hidden microphones! 3 wrong clicks and you're out!"`
                  : `"Game Over! Too many wrong clicks or time's up. Try again?"`}
              </p>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-700"></div>
              </div>
            </div>

            {/* Gamification Element */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                🎮 Mini Game: Find the Hidden Microphones!
              </h3>
              <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                {foundItems.map((found, index) => (
                  <button
                    key={index}
                    onClick={() => handleItemClick(index)}
                    disabled={!gameActive || found}
                    className={`w-16 h-16 border-2 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center text-2xl ${
                      found
                        ? microphonePositions[index]
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-gray-600 hover:bg-gray-500 border-gray-500"
                    } ${
                      !gameActive || found
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {found ? (microphonePositions[index] ? "🎤" : "❌") : "❓"}
                  </button>
                ))}
              </div>

              {!gameActive && (
                <div className="animate-bounce">
                  <p className="text-lg font-bold">
                    🎉 Game Over! Final Score: {gameScore}
                  </p>
                  <p className="text-sm text-red-400">
                    {wrongClicks >= 3 ? "Too many wrong clicks!" : "Time's up!"}
                  </p>
                  {gameScore === highScore && gameScore > 0 && (
                    <p className="text-sm text-green-400">New High Score!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Game Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => setGameActive((s) => !s)}
            size="lg"
            className="font-semibold"
          >
            {gameActive ? "⏸️ Pause" : "▶️ Start"}
          </Button>
          <Button
            onClick={resetGame}
            variant="outline"
            size="lg"
            className="font-semibold"
          >
            🔄 Reset
          </Button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="font-semibold">
            <Link href="/">🏠 Back to Home Stage</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-semibold">
            <Link href="/contact">📞 Contact the MC</Link>
          </Button>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-gray-600">
          <p className="text-sm text-gray-400">
            Don't worry, even the best MCs sometimes lose their script!
            <br />
            Let's get you back to where the real entertainment happens.
          </p>
        </div>
      </div>
    </div>
  );
}