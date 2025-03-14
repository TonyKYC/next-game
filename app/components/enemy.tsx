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
        x: { duration: ENEMY.MOVEMENT_DURATION, ease: "linear" },
        y: { duration: ENEMY.MOVEMENT_DURATION, ease: "linear" },
        rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY },
      }}
    />
  );
}
