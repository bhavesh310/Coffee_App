import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WordReveal } from '@/components/WordReveal';
import { useAuraStore } from '@/store/useAuraStore';

const TARGET_DATE = new Date('2025-05-31T23:59:59');

function getTimeLeft() {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-16 h-16 md:w-20 md:h-20 card-dark flex items-center justify-center border-gold/20"
      >
        <span className="font-display text-2xl md:text-3xl gold-text tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </motion.div>
      <span className="text-xs font-body uppercase tracking-widest text-foreground/40 mt-2">{label}</span>
    </div>
  );
}

const pastDrops = [
  { name: 'Winter Solstice Blend', emoji: '❄️', season: 'Winter 2024' },
  { name: 'Autumn Spice Brew', emoji: '🍂', season: 'Autumn 2024' },
  { name: 'Summer Citrus Cold Brew', emoji: '🍋', season: 'Summer 2024' },
  { name: 'Spring Blossom Espresso', emoji: '🌷', season: 'Spring 2024' },
  { name: 'Holiday Blend Reserve', emoji: '🎄', season: 'Holiday 2023' },
];

export default function SeasonalDrops() {
  const { addToCart, toggleCart } = useAuraStore();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section-pad relative noise-overlay overflow-hidden" style={{ background: 'hsl(var(--deep-roast))' }}>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-accent text-gold/60 italic tracking-widest mb-3">Limited Edition</p>
          <WordReveal
            text="Season Drops"
            as="h2"
            className="font-display text-4xl md:text-6xl text-foreground mb-2"
            stagger={0.13}
          />
          <p className="font-body text-foreground/50 max-w-md mx-auto">
            Rare, limited-run coffees. Once they're gone, they're gone.
          </p>
        </motion.div>

        {/* Current Drop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="card-dark p-8 md:p-12 border-gold/20 mb-12 text-center relative overflow-hidden"
          style={{ boxShadow: '0 0 60px hsl(43 62% 52% / 0.1)' }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none" />

          <div className="text-6xl mb-4">🌸</div>
          <p className="font-accent text-gold/60 italic tracking-widest mb-2">Current Drop</p>
          <h3 className="font-display text-4xl md:text-5xl text-foreground mb-2">Spring Sakura Blend</h3>
          <p className="font-body text-foreground/60 text-lg mb-2">Cherry Blossom Cold Brew</p>
          <p className="font-accent italic text-foreground/40 mb-8">Available: April 1 – May 31</p>

          {/* Countdown */}
          <div className="flex gap-4 justify-center mb-10">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <CountdownUnit value={timeLeft.minutes} label="Mins" />
            <CountdownUnit value={timeLeft.seconds} label="Secs" />
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={() => { addToCart({ id: 'seasonal-sakura', name: 'Spring Sakura Blend', price: 16.0 }); toggleCart(); }} className="btn-gold text-sm py-3 px-10">Pre-Order Now</button>
            {!joined ? (
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-gold text-sm py-2 px-4 w-48"
                />
                <button
                  onClick={() => email && setJoined(true)}
                  className="btn-ghost text-sm py-2 px-4"
                >
                  Notify Me
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gold text-sm">
                ✓ You're on the list!
              </div>
            )}
          </div>
        </motion.div>

        {/* Past Drops */}
        <div>
          <h3 className="font-display text-2xl text-foreground/60 mb-6 text-center">Past Drops</h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {pastDrops.map((drop, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-dark p-5 min-w-48 flex-shrink-0 text-center opacity-60 hover:opacity-100 transition-opacity"
              >
                <div className="text-3xl mb-2">{drop.emoji}</div>
                <p className="font-body text-sm text-foreground/70">{drop.name}</p>
                <p className="text-xs text-foreground/30 mt-1">{drop.season}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
