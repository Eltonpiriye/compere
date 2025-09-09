"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

interface Props {
  idleMinutes?: number;
}

export default function OfflineGamePrompt({ idleMinutes = 10 }: Props) {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showPrompt, setShowPrompt] = useState(false);
  const [idleTimer, setIdleTimer] = useState<number | null>(null);

  const [foundItems, setFoundItems] = useState<boolean[]>(Array(9).fill(false));
  const [gameScore, setGameScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [wrongClicks, setWrongClicks] = useState(0);
  const [showGame, setShowGame] = useState(false);

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

  useEffect(() => {
    function handleOnline() {
      setIsOffline(false);
      setShowPrompt(false);
      setShowGame(false);
    }
    function handleOffline() {
      setIsOffline(true);
      setShowPrompt(true);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (!navigator.onLine) setShowPrompt(true);

    const savedHighScore = localStorage.getItem("microphoneGameHighScore");
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore, 10));
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (idleTimer) clearTimeout(idleTimer);
    };
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
    setMicrophonePositions(generateMicrophones());
  };

  const startGame = () => {
    setShowGame(true);
    setShowPrompt(false);
    resetGame();
  };

  function startIdleCountdown() {
    const ms = idleMinutes * 2 * 1000;
    if (idleTimer) clearTimeout(idleTimer);
    const t = window.setTimeout(() => {
      setShowPrompt(true);
    }, ms);
    setIdleTimer(t);
  }

  return (
    <>
      <Dialog open={showPrompt && !showGame} onOpenChange={setShowPrompt}>
        <DialogContent className="sm:max-w-md max-w-[90vw] mx-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
              You appear to be offline
            </DialogTitle>
          </DialogHeader>
          <p className="py-4 text-sm sm:text-base">
            You're disconnected from the internet. Would you like to play our
            offline mini-game while you reconnect?
          </p>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button onClick={startGame} className="w-full sm:w-auto">
              🎮 Play Game
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowPrompt(false)}
              className="w-full sm:w-auto"
            >
              Not now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showGame} onOpenChange={setShowGame}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] sm:max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl text-center">
              🎤 Find the Hidden Microphones!
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 sm:flex sm:justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold">
              <div>Score: {gameScore}</div>
              <div>High: {highScore}</div>
              <div>Level: {level}</div>
              <div>Time: {timeLeft}s</div>
              <div className="col-span-2 sm:col-span-1 text-center sm:text-left">
                Wrong: {wrongClicks}/3
              </div>
            </div>

            <Card className="p-4 sm:p-6 bg-gray-800 border-gray-700">
              <div className="text-center space-y-4">
                <div className="text-3xl sm:text-4xl">🎤</div>
                <div className="bg-gray-700 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-white">
                    {gameActive
                      ? "Find 6 hidden microphones! 3 wrong clicks and you're out!"
                      : "Game Over! Too many wrong clicks or time's up. Try again?"}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-[240px] sm:max-w-xs mx-auto">
                  {foundItems.map((found, index) => (
                    <button
                      key={index}
                      onClick={() => handleItemClick(index)}
                      disabled={!gameActive || found}
                      className={`aspect-square border-2 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center text-lg sm:text-xl ${
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
                      {found
                        ? microphonePositions[index]
                          ? "🎤"
                          : "❌"
                        : "❓"}
                    </button>
                  ))}
                </div>

                {!gameActive && (
                  <div className="animate-bounce space-y-1">
                    <p className="text-sm sm:text-base font-bold">
                      🎉 Game Over! Final Score: {gameScore}
                    </p>
                    <p className="text-xs sm:text-sm text-red-400">
                      {wrongClicks >= 3
                        ? "Too many wrong clicks!"
                        : "Time's up!"}
                    </p>
                    {gameScore === highScore && gameScore > 0 && (
                      <p className="text-xs sm:text-sm text-green-400">
                        New High Score!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
              <Button
                onClick={() => setGameActive(!gameActive)}
                className="w-full sm:w-auto font-semibold"
              >
                {gameActive ? "⏸️ Pause" : "▶️ Start"}
              </Button>
              <Button
                onClick={resetGame}
                variant="outline"
                className="w-full sm:w-auto font-semibold bg-transparent"
              >
                🔄 Reset
              </Button>
              <Button
                onClick={() => setShowGame(false)}
                variant="secondary"
                className="w-full sm:w-auto font-semibold"
              >
                ✕ Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
