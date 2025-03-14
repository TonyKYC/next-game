export interface Position {
  x: number;
  y: number;
}

export interface EnemyPosition {
  id: number;
  x: number;
  y: number;
  distance: number;
}

export interface DebugInfo {
  enemiesInRange: number;
  closestEnemyDistance: number;
  enemyPositions: EnemyPosition[];
}

export interface GameState {
  gameActive: boolean;
  gameOver: boolean;
  score: number;
  enemies: Array<{
    id: number;
    position: Position;
  }>;
  bullets: Array<{
    id: number;
    targetX: number;
    targetY: number;
    createdAt: number;
  }>;
  lastBulletFiredTime: number;
  gameAreaSize: {
    width: number;
    height: number;
  };
  debugInfo: DebugInfo;
  fpsCount: number;
}
