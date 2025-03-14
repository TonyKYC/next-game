// Types
export interface EnemyType {
  id: number;
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

  // Set timeout to clear the cache after 100ms
  playerCacheTimeout = window.setTimeout(() => {
    cachedPlayerCenter = null;
    playerCacheTimeout = null;
  }, 100);
};

/**
 * Generates a random position outside the visible screen area
 */
export const generateRandomPosition = () => {
  const angle = Math.random() * Math.PI * 2;
  // Make sure enemies spawn outside the visible area
  const distance = Math.max(window.innerWidth, window.innerHeight) * 0.75;

  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
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
