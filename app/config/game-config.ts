// Game Area Configuration
export const GAME_AREA = {
  /** Distance multiplier for enemy spawn points relative to screen size
   * - 0.75 means enemies spawn at 75% of the maximum screen dimension
   * - Higher values make enemies spawn further away
   * - Lower values make enemies spawn closer
   */
  SPAWN_DISTANCE_MULTIPLIER: 0.75,
} as const;

// Player Configuration
export const PLAYER = {
  /** Maximum distance at which the player can shoot enemies
   * - Measured in pixels from the player's center
   * - Larger values make the game easier
   * - Smaller values make the game harder
   */
  SHOOTING_RANGE: 200,

  /** How often to update the player's position cache
   * - Measured in milliseconds
   * - Lower values = more precise but higher CPU usage
   * - Higher values = less precise but lower CPU usage
   */
  POSITION_CACHE_TIMEOUT: 100,
} as const;

// Enemy Configuration
export const ENEMY = {
  /** Speed at which enemies move towards the player
   * - Measured in pixels per second
   * - Higher values make enemies move faster
   * - Lower values make enemies move slower
   * - Default: 120 (moves about 120 pixels every second)
   */
  MOVEMENT_SPEED: 120,

  /** How often new enemies spawn
   * - Measured in milliseconds
   * - Lower values = more enemies (harder)
   * - Higher values = fewer enemies (easier)
   */
  SPAWN_INTERVAL: 2000,

  /** Enemy size in pixels */
  SIZE: {
    WIDTH: 40,
    HEIGHT: 40,
  },

  /** Extra space around enemies for collision detection
   * - Measured in pixels
   * - Higher values make collisions more forgiving
   * - Lower values make collisions more precise
   */
  COLLISION_PADDING: 5,
} as const;

// Bullet Configuration
export const BULLET = {
  /** Time between shots
   * - Measured in milliseconds
   * - Lower values = faster shooting (easier)
   * - Higher values = slower shooting (harder)
   */
  COOLDOWN: 500,

  /** How long bullets exist before disappearing
   * - Measured in milliseconds
   * - Should be long enough for bullets to reach their target
   */
  LIFETIME: 2000,

  /** Maximum time a bullet can take to reach its target
   * - Measured in seconds
   * - Prevents very slow bullets at close range
   */
  MAX_DURATION: 0.5,

  /** How fast bullets travel
   * - Measured in pixels per second
   * - Higher values = faster bullets (easier to hit)
   * - Lower values = slower bullets (harder to hit)
   */
  SPEED: 600,

  /** Bullet size in pixels */
  SIZE: {
    WIDTH: 4,
    HEIGHT: 4,
  },

  /** How precise bullet collisions should be
   * - Higher values = more forgiving collisions
   * - Lower values = more precise collisions
   * - 3 means collision box is 1/3 of the combined sizes
   */
  COLLISION_DIVISOR: 3,
} as const;

// Scoring Configuration
export const SCORING = {
  /** Points awarded for destroying each enemy
   * - Higher values make score increase faster
   */
  POINTS_PER_ENEMY: 10,
} as const;

// Debug Configuration
export const DEBUG = {
  /** Number of closest enemies to track for debugging
   * - Higher values show more enemy positions
   * - Lower values improve performance
   */
  ENEMY_POSITION_LIMIT: 3,
} as const;

// Performance Configuration
export const PERFORMANCE = {
  /** How often to update cached positions
   * - Measured in milliseconds
   * - Lower values = more precise but higher CPU usage
   * - Higher values = less precise but lower CPU usage
   */
  POSITION_UPDATE_INTERVAL: 100,
} as const;
