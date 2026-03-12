import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordReveal } from '@/components/WordReveal';
import { useAuraStore } from '@/store/useAuraStore';

const moods = [
  { emoji: '😴', label: 'Tired & Need a Boost', drinks: ['Double Espresso', 'Cold Brew'], bg: 'from-slate-900 to-stone-900', accent: '#6F4E37' },
  { emoji: '💛', label: 'Feeling Romantic', drinks: ['Rose Latte', 'Honey Oat Cappuccino'], bg: 'from-rose-950 to-amber-950', accent: '#D4AF37' },
  { emoji: '🧠', label: 'Need to Focus', drinks: ['Ethiopian Pour Over', 'Aeropress'], bg: 'from-teal-950 to-emerald-950', accent: '#20B2AA' },
  { emoji: '🎉', label: 'Celebrating', drinks: ['Caramel Frappé', 'Signature Aura Blend'], bg: 'from-amber-950 to-yellow-950', accent: '#FFD700' },
  { emoji: '🌧', label: 'Cozy Rainy Day', drinks: ['Spiced Chai Latte', 'Flat White'], bg: 'from-indigo-950 to-slate-950', accent: '#9B9BC0' },
];

export default function MoodOrdering() {
  const { addToCart, toggleCart } = useAuraStore();
  const [activeMood, setActiveMood] = useState<number | null>(null);

  return (
    <section
      className="section-pad relative noise-overlay overflow-hidden transition-all duration-700"
      style={{ background: activeMood !== null ? `hsl(var(--deep-roast))` : 'hsl(var(--background))' }}
    >
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-accent text-gold/60 italic tracking-widest mb-3">Mood-Based</p>
          <WordReveal
            text="What's Your Vibe Today?"
            as="h2"
            className="font-display text-4xl md:text-6xl text-foreground mb-4"
            stagger={0.1}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {moods.map((mood, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <motion.button
                whileHover={{ y: -8 }}
                onClick={() => setActiveMood(activeMood === i ? null : i)}
                className={`card-dark w-full p-6 text-center transition-all ${activeMood === i ? 'border-gold/50 bg-gold/5' : ''}`}
              >
                <div className="text-5xl mb-3">{mood.emoji}</div>
                <p className="font-body text-sm text-foreground/70">{mood.label}</p>
              </motion.button>

              <AnimatePresence>
                {activeMood === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 card-dark p-4 border-gold/20"
                  >
                    <p className="text-xs text-foreground/50 uppercase tracking-wider mb-2 font-body">Recommended</p>
                    {mood.drinks.map((drink) => (
                      <div key={drink} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                        <span className="text-sm text-foreground/80 font-body">☕ {drink}</span>
                        <button onClick={() => { addToCart({ id: `mood-${drink}`, name: drink, price: 5.5 }); toggleCart(); }} className="text-xs text-gold hover:text-warm-amber transition-colors">Order →</button>
                      </div>
                    ))}
                    <button onClick={() => { if (activeMood !== null) { moods[activeMood].drinks.forEach(d => addToCart({ id: `mood-${d}`, name: d, price: 5.5 })); toggleCart(); } }} className="btn-gold w-full text-xs py-2 mt-3">Order This Mood</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
