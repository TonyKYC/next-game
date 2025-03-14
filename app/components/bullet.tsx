"use client";

import { motion } from "framer-motion";

interface BulletProps {
  id: number | string;
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
  const duration = Math.min(0.5, distance / 600); // Max 0.5 seconds

  return (
    <>
      {/* Bullet trail */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-yellow-300/50"
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
        style={{ zIndex: 14 }}
      />

      {/* Main bullet */}
      <motion.div
        id={`bullet-${id}`}
        data-bullet-id={id} // Add data attribute for collision detection
        className="absolute w-4 h-4 rounded-full bg-yellow-400 shadow-lg shadow-yellow-300"
        initial={{
          x: initialPosition.x,
          y: initialPosition.y,
          opacity: 1,
          scale: 0.5,
          rotate: angle, // Add rotation based on trajectory
        }}
        animate={{
          x: targetPosition.x,
          y: targetPosition.y,
          opacity: 1,
          scale: 1,
          rotate: angle, // Maintain rotation during animation
        }}
        transition={{
          duration: duration,
          ease: "linear",
        }}
        style={{ zIndex: 15 }} // Higher z-index to ensure visibility
      />
    </>
  );
}
