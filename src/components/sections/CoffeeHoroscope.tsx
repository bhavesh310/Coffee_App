import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { WordReveal } from '@/components/WordReveal';
import { useAuraStore } from '@/store/useAuraStore';

const zodiacData = [
  { sign: '♈', name: 'Aries', coffee: 'Bold Double Espresso', desc: 'Your fiery energy demands nothing less than a double shot of pure intensity.' },
  { sign: '♉', name: 'Taurus', coffee: 'Oat Velvet Latte', desc: 'Luxury and comfort speak to your sensual nature. Sip slowly and savour every drop.' },
  { sign: '♊', name: 'Gemini', coffee: 'Nitro Cold Brew', desc: 'Versatile and electric, this dual-nature brew matches your ever-shifting energy.' },
  { sign: '♋', name: 'Cancer', coffee: 'Honey Oat Cappuccino', desc: 'Warm, nurturing and slightly sweet — just like you on your best days.' },
  { sign: '♌', name: 'Leo', coffee: 'Signature Aura Blend', desc: 'Only the finest single-origin gold blend honours your royal presence today.' },
  { sign: '♍', name: 'Virgo', coffee: 'Ethiopian Pour Over', desc: 'Clean, precise, nuanced — a cup brewed with as much care as you give everything.' },
  { sign: '♎', name: 'Libra', coffee: 'Rose Gold Cappuccino', desc: 'Beauty, balance and elegance. This floral cup is your perfect daily harmony.' },
  { sign: '♏', name: 'Scorpio', coffee: 'Dark Espresso Royale', desc: 'Your intensity matches this bold single-origin. Trust your instincts — and this shot.' },
  { sign: '♐', name: 'Sagittarius', coffee: 'Guatemala Chemex', desc: 'An adventurous pour over from distant highlands — perfect for your wandering spirit.' },
  { sign: '♑', name: 'Capricorn', coffee: 'Black Cold Brew', desc: 'No frills. Pure results. This clean, focused brew matches your disciplined ambition.' },
  { sign: '♒', name: 'Aquarius', coffee: 'Sakura Cold Brew', desc: 'Unique and visionary — this rare seasonal brew is as singular as your mind.' },
  { sign: '♓', name: 'Pisces', coffee: 'Almond Dream Latte', desc: 'Dreamy, gentle and deeply intuitive. Let this soft almond latte carry you today.' },
];

export default function CoffeeHoroscope() {
  const { addToCart, toggleCart } = useAuraStore();
  const [selected, setSelected] = useState<number | null>(null);
  const [shared, setShared] = useState(false);

  const result = selected !== null ? zodiacData[selected] : null;

  const handleShare = useCallback(() => {
    if (!result) return;
    const text = `My ${result.name} brew today is ${result.coffee}! ☕ #VolcaBrew`;
    try {
      if (navigator.share) {
        navigator.share({ title: 'My Volca Brew Horoscope', text });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(() => {});
      } else {
        const el = document.createElement('textarea');
        el.value = text;
        el.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
        document.body.appendChild(el);
        el.focus();
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
    } catch (_) {}
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  }, [result]);

  return (
    <section className="section-pad relative noise-overlay overflow-hidden" style={{ background: 'hsl(var(--espresso))' }}>
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px rounded-full bg-gold"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{ repeat: Infinity, duration: 2 + Math.random() * 3, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="container relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-accent text-gold/60 italic tracking-widest mb-3">Daily Ritual</p>
          <WordReveal
            text={"Your Daily Brew\nHoroscope"}
            as="h2"
            className="font-display text-4xl md:text-6xl text-foreground mb-4"
            stagger={0.1}
          />
        </motion.div>

        {/* Zodiac grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mb-10">
          {zodiacData.map((z, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(i)}
              className={`card-dark p-3 flex flex-col items-center gap-1 transition-all ${
                selected === i ? 'border-gold/60 bg-gold/10' : ''
              }`}
            >
              <span className="text-xl gold-text">{z.sign}</span>
              <span className="text-[10px] font-body text-foreground/50">{z.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Result */}
        {result && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="card-dark p-8 border-gold/30 text-center"
            style={{ boxShadow: '0 0 40px hsl(43 62% 52% / 0.15)' }}
          >
            <div className="text-5xl gold-text mb-2">{result.sign}</div>
            <p className="font-accent text-gold/60 italic mb-1">{result.name} — Today's Brew</p>
            <h3 className="font-display text-3xl text-foreground mb-4">{result.coffee}</h3>
            <p className="font-accent text-lg italic text-foreground/60 mb-6 max-w-sm mx-auto">
              "{result.desc}"
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button onClick={() => { if (result) { addToCart({ id: `horoscope-${result.coffee}`, name: result.coffee, price: 6.0 }); toggleCart(); } }} className="btn-gold text-xs py-3 px-8">Order This Brew</button>
              <button onClick={handleShare} className="btn-ghost text-xs py-3 px-8">{shared ? '✓ Copied!' : 'Share My Horoscope'}</button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
