"use client";

import { motion } from "framer-motion";
import { BULLET } from "../config/game-config";

interface BulletProps {
  id: number;
  initialPosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
}

export default function Bullet({
  id,
  initialPosition,
  targetPosition,
}: BulletProps) {
  // Calculate bullet trajectory angle for proper orientation
  const angle =
    Math.atan2(
      targetPosition.y - initialPosition.y,
      targetPosition.x - initialPosition.x
    ) *
    (180 / Math.PI);

  // Calculate animation duration based on distance (faster bullets for farther targets)
  const dx = targetPosition.x - initialPosition.x;
  const dy = targetPosition.y - initialPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const duration = Math.min(BULLET.MAX_DURATION, distance / BULLET.SPEED);

  return (
    <>
      {/* Bullet trail */}
      <motion.div
        className="absolute rounded-full bg-yellow-300/50"
        style={{
          width: BULLET.SIZE.WIDTH / 2,
          height: BULLET.SIZE.HEIGHT / 2,
          zIndex: 14,
        }}
        initial={{
          x: initialPosition.x,
          y: initialPosition.y,
          opacity: 0.7,
          scale: 0.5,
        }}
        animate={{
          x: targetPosition.x,
          y: targetPosition.y,
          opacity: 0,
          scale: 0.2,
        }}
        transition={{
          duration: duration,
          ease: "linear",
        }}
      />

      {/* Main bullet */}
      <motion.div
        id={`bullet-${id}`}
        data-bullet-id={id}
        className="absolute rounded-full bg-yellow-400 shadow-lg shadow-yellow-300"
        style={{
          width: BULLET.SIZE.WIDTH,
          height: BULLET.SIZE.HEIGHT,
          zIndex: 15,
        }}
        initial={{
          x: initialPosition.x,
          y: initialPosition.y,
          opacity: 1,
          scale: 0.5,
          rotate: angle,
        }}
        animate={{
          x: targetPosition.x,
          y: targetPosition.y,
          opacity: 1,
          scale: 1,
          rotate: angle,
        }}
        transition={{
          duration: duration,
          ease: "linear",
        }}
      />
    </>
  );
}
