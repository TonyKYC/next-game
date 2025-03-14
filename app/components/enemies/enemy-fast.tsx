import BaseEnemy, { BaseEnemyProps } from "./base-enemy";

export default function FastEnemy(props: BaseEnemyProps) {
  return (
    <BaseEnemy {...props} type="FAST">
      {/* Add speed trail effect */}
      <div className="absolute -inset-1 bg-yellow-500/20 blur-sm -z-10" />
      <div className="absolute -inset-2 bg-yellow-500/10 blur-md -z-20" />
    </BaseEnemy>
  );
}
