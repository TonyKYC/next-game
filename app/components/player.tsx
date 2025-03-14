"use client";

import { motion } from "framer-motion";

export default function Player() {
  return (
    <motion.div
      id="Player"
      className="absolute w-16 h-16 rounded-full bg-blue-500 border-2 border-blue-300"
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        boxShadow: [
          "0 0 0px rgba(59, 130, 246, 0.5)",
          "0 0 20px rgba(59, 130, 246, 0.8)",
          "0 0 0px rgba(59, 130, 246, 0.5)",
        ],
      }}
      transition={{
        scale: { duration: 0.5 },
        boxShadow: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
      }}
      style={{ zIndex: 10 }}
    />
  );
}
