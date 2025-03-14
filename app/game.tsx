"use client";

import { useState, useEffect, useRef } from "react";
import Player from "@/app/components/player";
import Enemy from "@/app/components/enemy";
import Bullet from "@/app/components/bullet";
import RangeIndicator from "@/app/components/range-indicator";
import {
  EnemyType,
  generateRandomPosition,
  getEnemyPosition,
  updatePlayerPositionCache,
} from "./actions/enemy-actions";
import {
  BulletType,
  createBullet,
  findClosestEnemyInRange,
  checkBulletCollisions,
} from "./actions/bullet-actions";
import { createInitialGameState, resetGameState } from "./actions/game-state";
import { isInRange } from "./lib/utils";
import { checkPlayerCollisions } from "./actions/collision-detection";
import { trackEnemiesInRange } from "./actions/range-detection";
import GameUserInterface from "./components/game-user-interface";
import type { GameState } from "./types/game-state";

interface GameProps {
  onEndGame: (score: number) => void;
}

export default function Game({ onEndGame }: GameProps) {
  // Define the shooting range
  const SHOOTING_RANGE = 200;
  // Define the cooldown between shots (in ms)
  const BULLET_COOLDOWN = 500;

  // Initialize state using our utility functions
  const [state, setState] = useState(createInitialGameState());
  const gameAreaRef = useRef(null);
  const gameLoopRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const fpsRef = useRef<number>(0);
  const stateRef = useRef(state); // Reference to current state to avoid closure issues

  // Destructure state for easier access
  const {
    gameActive,
    score,
    enemies,
    bullets,
    gameAreaSize,
    gameOver,
    lastBulletFiredTime,
    debugInfo,
  } = state;

  // Keep stateRef in sync with state
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Initialize game area size and start the game
  useEffect(() => {
    function updateSize() {
      if (gameAreaRef.current) {
        setState((prev) => ({
          ...prev,
          gameAreaSize: {
            width: window.innerWidth,
            height: window.innerHeight,
          },
        }));
      }
    }

    updateSize();
    window.addEventListener("resize", updateSize);

    // Start the game automatically when component mounts
    setState((prev) => ({
      ...resetGameState(prev),
      gameActive: true,
    }));

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Add handleEndGame function
  const handleEndGame = () => {
    if (gameActive) {
      setState((prev) => ({ ...prev, gameActive: false, gameOver: true }));
      onEndGame(score);
    }
  };

  // Handle game over condition
  useEffect(() => {
    if (gameOver) {
      handleEndGame();
    }
  }, [gameOver, score]);

  // Game loop using requestAnimationFrame for smoother updates
  useEffect(() => {
    if (!gameActive || gameOver) {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    console.log("Game loop initialized with", enemies.length, "enemies");

    // Variables for FPS calculation
    let lastFpsUpdateTime = 0;

    // Main game loop function
    const gameLoop = (timestamp: number) => {
      // Calculate delta time (time since last update)
      const deltaTime = timestamp - (lastUpdateTimeRef.current || timestamp);
      lastUpdateTimeRef.current = timestamp;

      // Update player position cache for efficient enemy position calculation
      updatePlayerPositionCache();

      // Update game state
      updateGameState(deltaTime, timestamp);

      // Update FPS counter every second
      frameCountRef.current++;
      if (timestamp - lastFpsUpdateTime > 1000) {
        fpsRef.current = Math.round(
          (frameCountRef.current * 1000) / (timestamp - lastFpsUpdateTime)
        );
        frameCountRef.current = 0;
        lastFpsUpdateTime = timestamp;
      }

      // Continue the loop (only if game is still active)
      if (stateRef.current.gameActive && !stateRef.current.gameOver) {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
      } else {
        console.log("Game loop stopped due to game state change");
      }
    };

    // Start the game loop
    lastUpdateTimeRef.current = performance.now();
    frameCountRef.current = 0;
    gameLoopRef.current = requestAnimationFrame(gameLoop);

    // Cleanup on unmount or when game state changes
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
        console.log("Game loop cleanup");
      }
    };
  }, [gameActive, gameOver, enemies.length]);

  // Game state update logic
  const updateGameState = (deltaTime: number, timestamp: number) => {
    const currentState = stateRef.current;
    const currentEnemies = currentState.enemies;
    const currentBullets = currentState.bullets;

    // Skip update if no enemies
    if (currentEnemies.length === 0) return;

    // Track enemies in range
    const rangeResult = trackEnemiesInRange(currentEnemies, SHOOTING_RANGE);

    // Check for collisions between player and enemies
    const playerCollision = checkPlayerCollisions(currentEnemies);

    if (playerCollision) {
      console.log("PLAYER COLLISION DETECTED - GAME OVER");
      setState((prev) => ({ ...prev, gameOver: true }));
      return;
    }

    // Check for bullet-enemy collisions
    const bulletCollisions = checkBulletCollisions(
      currentBullets,
      currentEnemies
    );
    let scoreIncrease = 0;
    let updatedEnemies = [...currentEnemies];
    let updatedBullets = [...currentBullets];

    // Handle bullet-enemy collisions
    if (bulletCollisions.length > 0) {
      // Get unique enemies and bullets involved in collisions
      const enemyIdsToRemove = new Set(
        bulletCollisions.map(([_, enemyId]) => enemyId)
      );
      const bulletIdsToRemove = new Set(
        bulletCollisions.map(([bulletId, _]) => bulletId)
      );

      // Update score
      scoreIncrease = enemyIdsToRemove.size * 10;

      // Filter out hit enemies and bullets
      updatedEnemies = updatedEnemies.filter(
        (enemy) => !enemyIdsToRemove.has(enemy.id)
      );
      updatedBullets = updatedBullets.filter(
        (bullet) => !bulletIdsToRemove.has(bullet.id)
      );

      console.log(
        `Bullet collisions: ${bulletCollisions.length}, Score +${scoreIncrease}`
      );
    }

    // Clean up bullets that are off-screen or too old (2 seconds)
    const currentTime = Date.now();
    updatedBullets = updatedBullets.filter((bullet) => {
      const bulletAge = currentTime - bullet.createdAt;
      return bulletAge < 2000; // Bullets live for max 2 seconds
    });

    // Fire a new bullet if enemies are in range and cooldown has passed
    let newBullet: BulletType | null = null;
    if (
      rangeResult.enemiesInRange > 0 &&
      currentTime - currentState.lastBulletFiredTime >= BULLET_COOLDOWN
    ) {
      // Find the closest enemy in range
      const closestEnemyData = findClosestEnemyInRange(
        currentEnemies,
        SHOOTING_RANGE
      );

      if (closestEnemyData) {
        // Create a new bullet targeting this enemy
        newBullet = createBullet(
          closestEnemyData.enemy,
          closestEnemyData.position
        );
        console.log(
          `Firing bullet at enemy ${
            closestEnemyData.enemy.id
          } at distance ${Math.round(closestEnemyData.distance)}`
        );
      }
    }

    // Update state based on results - only if there are actual changes
    setState((prev) => {
      // Add the new bullet if one was created
      const finalBullets = newBullet
        ? [...updatedBullets, newBullet]
        : updatedBullets;

      // Update last bullet fired time if a new bullet was created
      const newLastBulletFiredTime = newBullet
        ? currentTime
        : prev.lastBulletFiredTime;

      return {
        ...prev,
        enemies: updatedEnemies,
        bullets: finalBullets,
        score: prev.score + scoreIncrease,
        lastBulletFiredTime: newLastBulletFiredTime,
        debugInfo: {
          ...prev.debugInfo,
          ...rangeResult,
        },
      };
    });
  };

  // Spawn enemies on an interval
  useEffect(() => {
    if (!gameActive || gameOver) return;

    const spawnInterval = setInterval(() => {
      // Generate a random position outside the visible area
      const position = generateRandomPosition();
      const id = Date.now() + Math.random();

      console.log(
        `Spawning enemy: id=${id}, position=(${Math.round(
          position.x
        )}, ${Math.round(position.y)})`
      );

      setState((prev) => ({
        ...prev,
        enemies: [
          ...prev.enemies,
          {
            id,
            position,
          },
        ],
      }));
    }, 2000);

    return () => clearInterval(spawnInterval);
  }, [gameActive, gameOver]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <GameUserInterface
        state={{
          ...state,
          fpsCount: fpsRef.current,
        }}
        onEndGame={handleEndGame}
        shootingRange={SHOOTING_RANGE}
      />

      {/* Game Area */}
      <div
        ref={gameAreaRef}
        className="relative w-full h-full overflow-hidden flex items-center justify-center"
      >
        {gameActive && (
          <>
            <RangeIndicator range={SHOOTING_RANGE} />
            <Player />

            {enemies.map((enemy) => {
              const position = getEnemyPosition(enemy.id);
              const inRange = position
                ? isInRange(position.x, position.y, SHOOTING_RANGE)
                : false;

              return (
                <div key={enemy.id} className="relative">
                  <Enemy
                    id={enemy.id}
                    initialPosition={enemy.position}
                    targetPosition={{ x: 0, y: 0 }}
                  />
                  {inRange && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                    </div>
                  )}
                </div>
              );
            })}

            {bullets.map((bullet) => (
              <Bullet
                key={bullet.id}
                id={bullet.id}
                initialPosition={{ x: 0, y: 0 }}
                targetPosition={{ x: bullet.targetX, y: bullet.targetY }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
