import { EnemyType } from "./enemy-actions";
import { calculateDistance } from "../lib/utils";

/**
 * Checks for collisions between enemies and the player
 * Optimized for performance in the game loop
 * Returns true if a collision is detected
 */
export const checkPlayerCollisions = (enemies: EnemyType[]): boolean => {
  // Early return if no enemies
  if (enemies.length === 0) return false;

  // Get player element
  const playerElement = document.getElementById("Player");
  if (!playerElement) return false;

  const playerRect = playerElement.getBoundingClientRect();
  const playerCenter = {
    x: playerRect.left + playerRect.width / 2,
    y: playerRect.top + playerRect.height / 2,
  };

  // Collision threshold (half of player width + half of enemy width)
  // Using a slightly larger threshold to ensure collisions are detected reliably
  const collisionThreshold = playerRect.width / 2 + 5; // Adding 5px for enemy radius
  const collisionThresholdSquared = collisionThreshold * collisionThreshold;

  // Check each enemy for collision
  for (const enemy of enemies) {
    const enemyElement = document.getElementById(`enemy-${enemy.id}`);
    if (!enemyElement) continue;

    const enemyRect = enemyElement.getBoundingClientRect();
    const enemyCenter = {
      x: enemyRect.left + enemyRect.width / 2,
      y: enemyRect.top + enemyRect.height / 2,
    };

    // Calculate squared distance (faster than using square root)
    const dx = playerCenter.x - enemyCenter.x;
    const dy = playerCenter.y - enemyCenter.y;
    const distanceSquared = dx * dx + dy * dy;

    // Log collision data when very close for debugging
    if (distanceSquared < collisionThresholdSquared * 2) {
      console.log(
        `Collision check: distance=${Math.sqrt(
          distanceSquared
        )}, threshold=${collisionThreshold}`
      );
    }

    // Check if squared distance is less than squared threshold
    if (distanceSquared < collisionThresholdSquared) {
      console.log(
        `COLLISION DETECTED: distance=${Math.sqrt(
          distanceSquared
        )}, threshold=${collisionThreshold}`
      );
      return true;
    }
  }

  return false;
};

/**
 * Generic collision detection between two elements by their IDs
 * This can be used for bullet-enemy collisions in the future
 * @param id1 First element ID
 * @param id2 Second element ID
 * @param threshold Optional custom collision threshold
 * @returns True if collision detected, false otherwise
 */
export const checkElementCollision = (
  id1: string,
  id2: string,
  threshold?: number
): boolean => {
  const element1 = document.getElementById(id1);
  const element2 = document.getElementById(id2);

  if (!element1 || !element2) return false;

  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  const center1 = {
    x: rect1.left + rect1.width / 2,
    y: rect1.top + rect1.height / 2,
  };

  const center2 = {
    x: rect2.left + rect2.width / 2,
    y: rect2.top + rect2.height / 2,
  };

  // Default threshold is sum of half-widths
  const collisionThreshold = threshold ?? rect1.width / 2 + rect2.width / 2;

  // Calculate distance
  const dx = center1.x - center2.x;
  const dy = center1.y - center2.y;
  const distanceSquared = dx * dx + dy * dy;

  return distanceSquared < collisionThreshold * collisionThreshold;
};
