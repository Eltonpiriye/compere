"use client";

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
  const [gameActive, setGameActive] = useState(false);
  const [wrongClicks, setWrongClicks] = useState(0);

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

  useEffect(() => {
    const savedHighScore = localStorage.getItem("microphoneGameHighScore");
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore, 10));
    }
    document.documentElement.classList.add("dark");
  }, []);

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
      const points = level * 100;
      setGameScore(gameScore + points);

      const foundMicrophones = newFoundItems.filter(
        (found, i) => found && microphonePositions[i]
      ).length;
      if (foundMicrophones === 6) {
        setLevel(level + 1);
        setFoundItems(Array(9).fill(false));
        setWrongClicks(0);
        setTimeLeft(timeLeft + 2);
        setMicrophonePositions(generateMicrophones());
      }
    } else {
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
    setGameActive(false);
    setWrongClicks(0);
    const newPositions = generateMicrophones();
    setMicrophonePositions(newPositions);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-2 sm:p-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto text-center space-y-4 sm:space-y-8 w-full">
        <div className="space-y-2 sm:space-y-4">
          <div className="text-6xl sm:text-9xl font-black">404</div>
          <h1 className="text-2xl sm:text-4xl font-bold px-4">
            The Stage is Empty!
          </h1>
          <p className="text-base sm:text-xl text-gray-400 px-4">
            Oops! Looks like this gig is a no-show!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:justify-center gap-2 sm:gap-4 text-sm sm:text-lg font-semibold px-4">
          <div>Score: {gameScore}</div>
          <div>High: {highScore}</div>
          <div>Level: {level}</div>
          <div>Time: {timeLeft}s</div>
          <div className="col-span-2 sm:col-span-1 text-center sm:text-left">
            Wrong: {wrongClicks}/3
          </div>
        </div>

        <Card className="p-4 sm:p-8 bg-gray-800 border-gray-700 mx-2 sm:mx-0">
          <div className="relative">
            <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">🎤</div>
            <div className="bg-gray-700 p-3 sm:p-4 rounded-lg relative mb-4 sm:mb-6">
              <p className="font-medium text-white text-sm sm:text-base">
                {gameActive
                  ? "Find 6 hidden microphones! 3 wrong clicks and you're out!"
                  : "Game Over! Too many wrong clicks or time's up. Try again?"}
              </p>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-700"></div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold">
                🎮 Mini Game: Find the Hidden Microphones!
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-[240px] sm:max-w-xs mx-auto">
                {foundItems.map((found, index) => (
                  <button
                    key={index}
                    onClick={() => handleItemClick(index)}
                    disabled={!gameActive || found}
                    className={`aspect-square border-2 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center text-lg sm:text-2xl ${
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
                  <p className="text-base sm:text-lg font-bold">
                    🎉 Game Over! Final Score: {gameScore}
                  </p>
                  <p className="text-xs sm:text-sm text-red-400">
                    {wrongClicks >= 3 ? "Too many wrong clicks!" : "Time's up!"}
                  </p>
                  {gameScore === highScore && gameScore > 0 && (
                    <p className="text-xs sm:text-sm text-green-400">
                      New High Score!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center px-2">
          <Button
            onClick={() => setGameActive((s) => !s)}
            size="lg"
            className="font-semibold w-full sm:w-auto"
          >
            {gameActive ? "⏸️ Pause" : "▶️ Start"}
          </Button>
          <Button
            onClick={resetGame}
            variant="outline"
            size="lg"
            className="font-semibold w-full sm:w-auto bg-transparent"
          >
            🔄 Reset
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center px-2">
          <Button asChild size="lg" className="font-semibold w-full sm:w-auto">
            <Link href="/">🏠 Back to Home Stage</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="font-semibold w-full sm:w-auto bg-transparent"
          >
            <Link href="/contact">📞 Contact the MC</Link>
          </Button>
        </div>

        <div className="pt-4 sm:pt-8 border-t border-gray-600 mx-4">
          <p className="text-xs sm:text-sm text-gray-400">
            Don't worry, even the best MCs sometimes lose their script!
            <br />
            Let's get you back to where the real entertainment happens.
          </p>
        </div>
      </div>
    </div>
  );
}
