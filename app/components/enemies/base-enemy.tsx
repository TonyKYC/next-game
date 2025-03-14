import { motion } from "framer-motion";
import { ENEMY, ENEMY_TYPES } from "../../config/game-config";

export interface BaseEnemyProps {
  id: number;
  type: keyof typeof ENEMY_TYPES;
  initialPosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
}

export default function BaseEnemy({
  id,
  type,
  initialPosition,
  targetPosition,
  children,
}: BaseEnemyProps & { children?: React.ReactNode }) {
  // Get enemy configuration based on type
  const enemyConfig = ENEMY_TYPES[type];

  // Calculate distance to target
  const dx = targetPosition.x - initialPosition.x;
  const dy = targetPosition.y - initialPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Calculate duration based on speed (distance / speed = time)
  const duration = distance / enemyConfig.SPEED;

  return (
    <motion.div
      id={`enemy-${id}`}
      className={`absolute border ${enemyConfig.COLOR} ${enemyConfig.BORDER_COLOR}`}
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
    >
      {children}
    </motion.div>
  );
}
