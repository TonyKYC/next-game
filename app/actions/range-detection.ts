import { EnemyType, getEnemyPosition } from "./enemy-actions";
import { distanceFromOrigin, isInRange } from "../lib/utils";

export interface EnemyWithDistance {
  id: number;
  x: number;
  y: number;
  distance: number;
}

export interface RangeDetectionResult {
  enemiesInRange: number;
  closestEnemyDistance: number;
  enemyPositions: EnemyWithDistance[];
}

/**
 * Tracks which enemies are within range of the player
 * Optimized for performance in the game loop
 */
export const trackEnemiesInRange = (
  enemies: EnemyType[],
  range: number
): RangeDetectionResult => {
  if (enemies.length === 0) {
    return {
      enemiesInRange: 0,
      closestEnemyDistance: Number.MAX_VALUE,
      enemyPositions: [],
    };
  }

  // Pre-allocate arrays to avoid reallocations
  const enemyDistances: EnemyWithDistance[] = [];
  let inRangeCount = 0;
  let closestDistance = Number.MAX_VALUE;

  // Process each enemy
  for (const enemy of enemies) {
    const position = getEnemyPosition(enemy.id);
    if (!position) continue;

    const x = position.x;
    const y = position.y;
    const distance = distanceFromOrigin(x, y);

    // Check if in range
    if (distance <= range) {
      inRangeCount++;
    }

    // Track closest enemy - ensure we're actually updating this value
    if (distance < closestDistance) {
      closestDistance = distance;
      // Debug log when closest enemy changes
      console.log(
        `New closest enemy: id=${enemy.id}, distance=${Math.round(distance)}`
      );
    }

    // Store enemy data for debugging display - keep all enemies sorted by distance
    enemyDistances.push({
      id: enemy.id,
      x,
      y,
      distance,
    });
  }

  // Sort enemy distances by proximity (closest first)
  enemyDistances.sort((a, b) => a.distance - b.distance);

  // Only return the first few for display
  const limitedDistances = enemyDistances.slice(0, 3);

  return {
    enemiesInRange: inRangeCount,
    closestEnemyDistance:
      closestDistance !== Number.MAX_VALUE ? closestDistance : 0,
    enemyPositions: limitedDistances,
  };
};
