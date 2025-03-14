import { GAME_AREA, PERFORMANCE, ENEMY_TYPES } from "../config/game-config";

// Types
export interface EnemyType {
  id: number;
  type: keyof typeof ENEMY_TYPES;
  position: {
    x: number;
    y: number;
  };
}

// Cache for player position to avoid recalculating it for each enemy
let cachedPlayerCenter: { x: number; y: number } | null = null;
let playerCacheTimeout: number | null = null;

/**
 * Updates the cached player position
 * This is more efficient than recalculating it for every enemy
 */
export const updatePlayerPositionCache = () => {
  // Clear any existing timeout
  if (playerCacheTimeout !== null) {
    window.clearTimeout(playerCacheTimeout);
  }

  // Get player element and position
  const playerElement = document.getElementById("Player");
  if (!playerElement) {
    cachedPlayerCenter = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
  } else {
    const playerRect = playerElement.getBoundingClientRect();
    cachedPlayerCenter = {
      x: playerRect.left + playerRect.width / 2,
      y: playerRect.top + playerRect.height / 2,
    };
  }

  // Set timeout to clear the cache
  playerCacheTimeout = window.setTimeout(() => {
    cachedPlayerCenter = null;
    playerCacheTimeout = null;
  }, PERFORMANCE.POSITION_UPDATE_INTERVAL);
};

/**
 * Randomly selects an enemy type based on spawn weights
 */
export const getRandomEnemyType = (): keyof typeof ENEMY_TYPES => {
  const totalWeight = Object.values(ENEMY_TYPES).reduce(
    (sum, type) => sum + type.SPAWN_WEIGHT,
    0
  );

  let random = Math.random() * totalWeight;

  for (const [type, config] of Object.entries(ENEMY_TYPES)) {
    random -= config.SPAWN_WEIGHT;
    if (random <= 0) {
      return type as keyof typeof ENEMY_TYPES;
    }
  }

  return "BASIC"; // Fallback to basic type
};

/**
 * Generates a random position outside the visible screen area
 */
export const generateRandomPosition = () => {
  const angle = Math.random() * Math.PI * 2;
  // Make sure enemies spawn outside the visible area
  const distance =
    Math.max(window.innerWidth, window.innerHeight) *
    GAME_AREA.SPAWN_DISTANCE_MULTIPLIER;

  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
  };
};

/**
 * Creates a new enemy with random type
 */
export const createEnemy = (): EnemyType => {
  return {
    id: Date.now() + Math.random(),
    type: getRandomEnemyType(),
    position: generateRandomPosition(),
  };
};

/**
 * Gets the enemy position from the DOM relative to the player
 * Optimized for performance in the game loop
 */
export const getEnemyPosition = (enemyId: number) => {
  const enemyElement = document.getElementById(`enemy-${enemyId}`);
  if (!enemyElement) return null;

  const rect = enemyElement.getBoundingClientRect();
  const enemyCenterX = rect.left + rect.width / 2;
  const enemyCenterY = rect.top + rect.height / 2;

  // Update player position cache if it doesn't exist
  if (cachedPlayerCenter === null) {
    updatePlayerPositionCache();
  }

  // Use cached player position
  const playerCenterX = cachedPlayerCenter?.x ?? window.innerWidth / 2;
  const playerCenterY = cachedPlayerCenter?.y ?? window.innerHeight / 2;

  // Calculate position relative to player center
  return {
    x: enemyCenterX - playerCenterX,
    y: enemyCenterY - playerCenterY,
  };
};
