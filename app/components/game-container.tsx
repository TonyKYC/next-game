"use client";

import { useState } from "react";
import Game from "../game";
import MainMenu from "../components/main-menu";

export default function GameContainer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastScore, setLastScore] = useState<number | undefined>(undefined);

  const handleStartGame = () => {
    setIsPlaying(true);
  };

  const handleEndGame = (score: number) => {
    setLastScore(score);
    setIsPlaying(false);
  };

  return (
    <div className="w-full h-full bg-gray-900/80">
      {isPlaying ? (
        <Game onEndGame={handleEndGame} />
      ) : (
        <MainMenu onStartGame={handleStartGame} lastScore={lastScore} />
      )}
    </div>
  );
}
