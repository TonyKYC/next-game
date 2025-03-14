"use client";

import { motion } from "framer-motion";

interface EnemyProps {
  id: number | string;
  initialPosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
}

export default function Enemy({
  id,
  initialPosition,
  targetPosition,
}: EnemyProps) {
  // Enemy movement duration - increased by 30% (from 5 to 6.5 seconds)
  const movementDuration = 6.5;

  return (
    <motion.div
      id={`enemy-${id}`}
      className="absolute w-10 h-10 bg-red-500 border border-red-300"
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
        x: { duration: movementDuration, ease: "linear" },
        y: { duration: movementDuration, ease: "linear" },
        rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY },
      }}
      style={{ zIndex: 5 }}
    />
  );
}
