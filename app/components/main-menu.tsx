import React from "react";

interface MainMenuProps {
  onStartGame: () => void;
  lastScore?: number;
}

export default function MainMenu({ onStartGame, lastScore }: MainMenuProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-30">
      <div className="text-center bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold text-white mb-4">Defender Game</h2>
        <p className="text-gray-300 mb-6">Defend against incoming enemies!</p>
        {lastScore !== undefined && (
          <p className="text-yellow-400 mb-6">Last Score: {lastScore}</p>
        )}
        <button
          onClick={onStartGame}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-semibold"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
