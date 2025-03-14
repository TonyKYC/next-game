import { EnemyType } from "./enemy-actions";
import { BulletType } from "./bullet-actions";

export interface GameState {
  gameActive: boolean;
  gameOver: boolean;
  score: number;
  enemies: EnemyType[];
  bullets: BulletType[];
  gameAreaSize: { width: number; height: number };
  lastBulletFiredTime: number;
  debugInfo: {
    enemiesInRange: number;
    closestEnemyDistance: number;
    enemyPositions: Array<{
      id: number;
      x: number;
      y: number;
      distance: number;
    }>;
  };
}

/**
 * Creates the initial game state with default values
 */
export function createInitialGameState(): GameState {
  return {
    gameActive: false,
    gameOver: false,
    score: 0,
    enemies: [],
    bullets: [],
    gameAreaSize: { width: 0, height: 0 },
    lastBulletFiredTime: 0,
    debugInfo: {
      enemiesInRange: 0,
      closestEnemyDistance: Infinity,
      enemyPositions: [],
    },
  };
}

/**
 * Resets the game state to start a new game
 */
export function resetGameState(prevState: GameState): GameState {
  return {
    ...prevState,
    gameActive: true,
    gameOver: false,
    score: 0,
    enemies: [],
    bullets: [],
    lastBulletFiredTime: 0,
    debugInfo: {
      enemiesInRange: 0,
      closestEnemyDistance: Infinity,
      enemyPositions: [],
    },
  };
}
