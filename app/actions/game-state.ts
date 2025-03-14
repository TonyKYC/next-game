import { EnemyType } from "./enemy-actions";

export interface GameState {
  gameActive: boolean;
  score: number;
  enemies: EnemyType[];
  gameAreaSize: { width: number; height: number };
  gameOver: boolean;
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
 * Creates the initial game state
 */
export const createInitialGameState = (): GameState => ({
  gameActive: false,
  score: 0,
  enemies: [],
  gameAreaSize: { width: 0, height: 0 },
  gameOver: false,
  debugInfo: {
    enemiesInRange: 0,
    closestEnemyDistance: 0,
    enemyPositions: [],
  },
});

/**
 * Resets the game state for a new game
 */
export const resetGameState = (state: GameState): GameState => ({
  ...state,
  gameActive: true,
  score: 0,
  enemies: [],
  gameOver: false,
});
