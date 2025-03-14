"use client";

import { motion } from "framer-motion";
import { ENEMY } from "../config/game-config";

interface EnemyProps {
  id: number;
  initialPosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
}

export default function Enemy({
  id,
  initialPosition,
  targetPosition,
}: EnemyProps) {
  // Calculate distance to target
  const dx = targetPosition.x - initialPosition.x;
  const dy = targetPosition.y - initialPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Calculate duration based on speed (distance / speed = time)
  const duration = distance / ENEMY.MOVEMENT_SPEED;

  return (
    <motion.div
      id={`enemy-${id}`}
      className="absolute bg-red-500 border border-red-300"
      style={{
        width: ENEMY.SIZE.WIDTH,
        height: ENEMY.SIZE.HEIGHT,
        zIndex: 5,
      }}
      initial={{
        x: initialPosition.x,
        y: initialPosition.y,
        rotate: 0,
      }}
      animate={{
        x: targetPosition.x,
        y: targetPosition.y,
        rotate: 180,
      }}
      transition={{
        x: { duration, ease: "linear" },
        y: { duration, ease: "linear" },
        rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY },
      }}
    />
  );
}
