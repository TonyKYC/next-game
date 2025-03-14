import { GameState } from "../types/game-state";

interface GameUIProps {
  state: GameState;
  onEndGame: () => void;
  shootingRange: number;
}

export default function GameUserInterface({
  state,
  onEndGame,
  shootingRange,
}: GameUIProps) {
  const { gameActive, score, enemies, bullets, debugInfo, fpsCount } = state;

  return (
    <>
      {/* Score - Top Left */}
      <div className="absolute top-4 left-4 z-20">
        <div className="text-white text-2xl font-bold bg-gray-800/70 px-4 py-2 rounded">
          Score: {score}
        </div>
      </div>

      {/* End Game Button - Top Right */}
      {gameActive && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onEndGame}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold"
          >
            End Game
          </button>
        </div>
      )}

      {/* Game Stats - Top Center */}
      {gameActive && (
        <div className="absolute w-[350px] top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="text-white text-sm bg-gray-800/70 px-4 py-2 rounded">
            {/* Top row with enemies, bullets, and FPS */}
            <div className="flex justify-between items-center font-medium mb-1">
              <span className="w-24">Enemies: {enemies.length}</span>
              <span className="w-24">Bullets: {bullets.length}</span>
              <span className="w-20">FPS: {fpsCount}</span>
            </div>
            {/* Bottom row with range info */}
            <div className="flex justify-between items-center">
              <div className="w-24">
                In Range:{" "}
                <span
                  className={
                    debugInfo.enemiesInRange > 0
                      ? "text-green-400 font-bold"
                      : ""
                  }
                >
                  {debugInfo.enemiesInRange}
                </span>
              </div>
              <div className="w-32">
                Closest:{" "}
                <span
                  className={
                    debugInfo.closestEnemyDistance <= shootingRange
                      ? "text-green-400 font-bold"
                      : ""
                  }
                >
                  {Math.round(debugInfo.closestEnemyDistance)}px
                </span>
              </div>
              <div className="w-24">Range: {shootingRange}px</div>
            </div>
          </div>
        </div>
      )}

      {/* Enemy List - Bottom Right */}
      {gameActive && (
        <div className="absolute bottom-4 right-4 z-20">
          <div className="text-white text-xs bg-gray-800/40 px-4 py-2 rounded max-w-[300px] max-h-[200px] overflow-y-auto">
            {debugInfo.enemyPositions.map((e) => (
              <div
                key={e.id}
                className={e.distance <= shootingRange ? "text-green-400" : ""}
              >
                Enemy {e.id.toString().slice(-4)}: x={Math.round(e.x)}, y=
                {Math.round(e.y)}, dist={Math.round(e.distance)}
                {e.distance <= shootingRange ? " (IN RANGE)" : ""}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
