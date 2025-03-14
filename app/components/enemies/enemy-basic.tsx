import BaseEnemy, { BaseEnemyProps } from "./base-enemy";

export default function BasicEnemy(props: BaseEnemyProps) {
  return (
    <BaseEnemy {...props} type="BASIC">
      {/* Add any basic-enemy specific visual elements here */}
    </BaseEnemy>
  );
}
