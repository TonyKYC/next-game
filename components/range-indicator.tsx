"use client";

import { motion } from "framer-motion";

interface RangeIndicatorProps {
  range: number;
}

export default function RangeIndicator({ range }: RangeIndicatorProps) {
  return (
    <motion.div
      className="absolute rounded-full border-2 border-blue-300/30 bg-blue-500/10"
      style={{
        width: range * 2,
        height: range * 2,
        zIndex: 1,
      }}
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{
        scale: { duration: 0.5 },
        opacity: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
      }}
    />
  );
}
