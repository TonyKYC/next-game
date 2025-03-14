import { EnemyType } from "./enemy-actions";
import { isInRange } from "./utils";
import { getEnemyPosition } from "./enemy-actions";

// Define the bullet type for state management
export interface BulletType {
  id: number;
  targetX: number;
  targetY: number;
  createdAt: number;
}

// Data structure for tracking enemy positions for bullet targeting
interface EnemyPositionData {
  enemy: EnemyType;
  position: { x: number; y: number };
  distance: number;
}

/**
 * Creates a new bullet targeting a specific enemy
 */
export function createBullet(
  enemy: EnemyType,
  targetPosition: { x: number; y: number }
): BulletType {
  return {
    id: Date.now() + Math.random(),
    targetX: targetPosition.x,
    targetY: targetPosition.y,
    createdAt: Date.now(),
  };
}

/**
 * Finds the closest enemy within range for targeting
 */
export function findClosestEnemyInRange(
  enemies: EnemyType[],
  range: number
): EnemyPositionData | null {
  if (!enemies.length) return null;

  let closestEnemy: EnemyPositionData | null = null;
  let closestDistance = Infinity;

  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const position = getEnemyPosition(enemy.id);

    if (!position) continue;

    const { x, y } = position;
    const distance = Math.sqrt(x * x + y * y);

    // Only consider enemies in range
    if (distance <= range && distance < closestDistance) {
      closestDistance = distance;
      closestEnemy = {
        enemy,
        position,
        distance,
      };
    }
  }

  return closestEnemy;
}

/**
 * Checks for collisions between bullets and enemies
 * Returns an array of [bulletId, enemyId] pairs for collisions
 */
export function checkBulletCollisions(
  bullets: BulletType[],
  enemies: EnemyType[]
): [number, number][] {
  if (!bullets.length || !enemies.length) return [];

  const collisions: [number, number][] = [];

  // Get all bullet elements
  const bulletElements = document.querySelectorAll("[id^='bullet-']");

  // Early return if no bullet elements found in DOM
  if (!bulletElements.length) return [];

  // Build a map of bullet DOM elements by ID for faster lookup
  const bulletElementMap = new Map<number, Element>();
  bulletElements.forEach((element) => {
    // Extract the numeric ID from the element ID (format: "bullet-{id}")
    const idString = element.id.replace("bullet-", "");
    const bulletId = Number(idString);
    if (!isNaN(bulletId)) {
      bulletElementMap.set(bulletId, element);
    }
  });

  // Check each bullet against each enemy
  for (const bullet of bullets) {
    const bulletElement = bulletElementMap.get(bullet.id);
    if (!bulletElement) continue;

    const bulletRect = bulletElement.getBoundingClientRect();
    const bulletCenterX = bulletRect.left + bulletRect.width / 2;
    const bulletCenterY = bulletRect.top + bulletRect.height / 2;

    for (const enemy of enemies) {
      const enemyElement = document.getElementById(`enemy-${enemy.id}`);
      if (!enemyElement) continue;

      const enemyRect = enemyElement.getBoundingClientRect();
      const enemyCenterX = enemyRect.left + enemyRect.width / 2;
      const enemyCenterY = enemyRect.top + enemyRect.height / 2;

      // Calculate squared distance between centers (more efficient than using sqrt)
      const dx = bulletCenterX - enemyCenterX;
      const dy = bulletCenterY - enemyCenterY;
      const distanceSquared = dx * dx + dy * dy;

      // Collision threshold based on the combined size of bullet and enemy
      // Using half of enemy size for tighter collisions
      const collisionThreshold = (bulletRect.width + enemyRect.width) / 3;
      const collisionThresholdSquared = collisionThreshold * collisionThreshold;

      if (distanceSquared <= collisionThresholdSquared) {
        collisions.push([bullet.id, enemy.id]);
        // Break the inner loop as this bullet can only collide with one enemy
        break;
      }
    }
  }

  return collisions;
}
