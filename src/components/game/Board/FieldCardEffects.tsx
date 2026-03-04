import { motion } from "framer-motion";

export function SummonEffect({ isOpponent }: { isOpponent?: boolean }) {
  const glow = isOpponent ? "rgba(239,68,68" : "rgba(96,165,250";

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-visible">
      {/* Flash */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ background: `${glow},0.45)` }}
      />
      {/* Expanding glow ring */}
      <motion.div
        className="absolute rounded-full"
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ width: 180, height: 180, opacity: 0 }}
        transition={{ duration: 0.7 }}
        style={{ boxShadow: `0 0 30px 10px ${glow},0.55)` }}
      />
    </div>
  );
}

export function ExplosionEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-visible">
      {/* Central flash */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-orange-500/70"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Expanding rings */}
      {[
        { size: 130, color: "#f97316", delay: 0 },
        { size: 160, color: "#fbbf24", delay: 0.07 },
        { size: 200, color: "#ef4444", delay: 0.14 },
      ].map(({ size, color, delay }, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2"
          style={{ borderColor: color }}
          initial={{ width: 16, height: 16, opacity: 0.9 }}
          animate={{ width: size, height: size, opacity: 0 }}
          transition={{ duration: 0.55, delay }}
        />
      ))}

      {/* Flying particles */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-orange-400"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((angle * Math.PI) / 180) * 55,
            y: Math.sin((angle * Math.PI) / 180) * 55,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.5, delay: 0.08 }}
        />
      ))}
    </div>
  );
}
