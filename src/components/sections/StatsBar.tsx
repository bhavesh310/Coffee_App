import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { icon: '☕', label: 'cups brewed today', end: 1247 },
  { icon: '🌍', label: 'countries sourced', end: 12 },
  { icon: '⭐', label: 'avg rating', end: 4.9, decimal: true },
  { icon: '👥', label: 'members', end: 8432 },
];

function CountUpNumber({ end, decimal, inView }: { end: number; decimal?: boolean; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * end);
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  if (decimal) return <>{count.toFixed(1)}</>;
  return <>{Math.floor(count).toLocaleString()}</>;
}

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="py-12 relative noise-overlay overflow-hidden"
      style={{ background: 'linear-gradient(135deg, hsl(var(--deep-roast)), hsl(var(--espresso)))' }}
    >
      {/* Gold line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-2xl mb-1">{stat.icon}</span>
              <span className="font-display text-3xl md:text-4xl gold-text">
                <CountUpNumber end={stat.end} decimal={stat.decimal} inView={inView} />
              </span>
              <span className="font-body text-xs uppercase tracking-widest text-foreground/40">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gold line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  );
}
