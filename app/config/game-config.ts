// Game Area Configuration
export const GAME_AREA = {
  SPAWN_DISTANCE_MULTIPLIER: 0.75, // Multiplier of screen size for enemy spawn distance
} as const;

// Player Configuration
export const PLAYER = {
  SHOOTING_RANGE: 200, // Shooting range in pixels
  POSITION_CACHE_TIMEOUT: 100, // Player position cache timeout in ms
} as const;

// Enemy Configuration
export const ENEMY = {
  MOVEMENT_DURATION: 6.5, // Time for enemy to reach player in seconds
  SPAWN_INTERVAL: 2000, // Time between enemy spawns in ms
  SIZE: {
    WIDTH: 40, // Width in pixels
    HEIGHT: 40, // Height in pixels
  },
  COLLISION_PADDING: 5, // Extra padding for collision detection in pixels
} as const;

// Bullet Configuration
export const BULLET = {
  COOLDOWN: 500, // Time between shots in ms
  LIFETIME: 2000, // How long bullets exist before disappearing in ms
  MAX_DURATION: 0.5, // Maximum animation duration in seconds
  SPEED: 600, // Pixels per second
  SIZE: {
    WIDTH: 4, // Width in pixels
    HEIGHT: 4, // Height in pixels
  },
  COLLISION_DIVISOR: 3, // Divisor for collision threshold calculation
} as const;

// Scoring Configuration
export const SCORING = {
  POINTS_PER_ENEMY: 10, // Points awarded for destroying an enemy
} as const;

// Debug Configuration
export const DEBUG = {
  ENEMY_POSITION_LIMIT: 3, // Number of enemy positions to track for debugging
} as const;

// Performance Configuration
export const PERFORMANCE = {
  POSITION_UPDATE_INTERVAL: 100, // How often to update cached positions in ms
} as const;
