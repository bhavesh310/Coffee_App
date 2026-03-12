import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordReveal } from '@/components/WordReveal';
import { useAuraStore } from '@/store/useAuraStore';

const questions = [
  {
    q: 'How do you like your coffee?',
    options: ['Strong & Bold', 'Smooth & Mellow', 'Sweet & Creamy'],
  },
  {
    q: 'Milk or black?',
    options: ['Black', 'With Milk', 'Plant-Based', 'Extra Foam'],
  },
  {
    q: "Flavor mood today?",
    options: ['Chocolatey', 'Fruity & Bright', 'Nutty & Warm', 'Caramel & Sweet'],
  },
];

const recommendations: Record<string, Record<string, Record<string, { name: string; desc: string; emoji: string }>>> = {
  'Strong & Bold': {
    'Black': { 'Chocolatey': { name: 'Dark Espresso Royale', desc: 'Intense, bold, dark chocolate finish', emoji: '☕' }, 'Fruity & Bright': { name: 'Ethiopian Pour Over', desc: 'Vibrant, bright, full-bodied', emoji: '🌸' }, 'Nutty & Warm': { name: 'Guatemala Chemex', desc: 'Nutty, smooth, warm caramel', emoji: '🫗' }, 'Caramel & Sweet': { name: 'Dark Cortado', desc: 'Bold with caramel sweetness', emoji: '☕' } },
    'With Milk': { 'Chocolatey': { name: 'Velvet Macchiato', desc: 'Rich espresso with creamy milk', emoji: '☕' }, 'Fruity & Bright': { name: 'Rose Gold Cappuccino', desc: 'Floral and elegant', emoji: '🌹' }, 'Nutty & Warm': { name: 'Oat Velvet Latte', desc: 'Smooth oat milk, warm notes', emoji: '🥛' }, 'Caramel & Sweet': { name: 'Caramel Oat Cappuccino', desc: 'Caramel meets silky oat foam', emoji: '🍯' } },
    'Plant-Based': { 'Chocolatey': { name: 'Oat Dark Latte', desc: 'Earthy oat milk, dark roast', emoji: '🌿' }, 'Fruity & Bright': { name: 'Oat Bloom Latte', desc: 'Bright and floral', emoji: '🌺' }, 'Nutty & Warm': { name: 'Almond Cortado', desc: 'Nutty almond, precise espresso', emoji: '🥜' }, 'Caramel & Sweet': { name: 'Caramel Almond Latte', desc: 'Sweet and warm', emoji: '🍮' } },
    'Extra Foam': { 'Chocolatey': { name: 'Mocha Cloud', desc: 'Double chocolate foam', emoji: '☁️' }, 'Fruity & Bright': { name: 'Berry Foam Latte', desc: 'Light foam, bright notes', emoji: '🫐' }, 'Nutty & Warm': { name: 'Hazelnut Cappuccino', desc: 'Nutty, foamy, warm', emoji: '🌰' }, 'Caramel & Sweet': { name: 'Caramel Cloud Cap', desc: 'Extra foam, caramel drizzle', emoji: '🍯' } },
  },
  'Smooth & Mellow': {
    'Black': { 'Chocolatey': { name: 'Santos Pour Over', desc: 'Smooth and mildly chocolatey', emoji: '🫗' }, 'Fruity & Bright': { name: 'Colombia Aeropress', desc: 'Clean, bright fruit notes', emoji: '✨' }, 'Nutty & Warm': { name: 'Coorg Chemex', desc: 'Earthy, smooth, warm', emoji: '🌿' }, 'Caramel & Sweet': { name: 'Guatemala Pour Over', desc: 'Sweet, silky finish', emoji: '🫗' } },
    'With Milk': { 'Chocolatey': { name: 'Flat White', desc: 'Smooth espresso, micro-foam', emoji: '☕' }, 'Fruity & Bright': { name: 'Fruity Flat White', desc: 'Ethiopian base, silky milk', emoji: '🌸' }, 'Nutty & Warm': { name: 'Warm Nut Latte', desc: 'Hazelnut and warm milk', emoji: '🌰' }, 'Caramel & Sweet': { name: 'Honey Oat Cappuccino', desc: 'Honey drizzle, light foam', emoji: '🍯' } },
    'Plant-Based': { 'Chocolatey': { name: 'Oat Flat White', desc: 'Gentle, smooth, mellow', emoji: '🥛' }, 'Fruity & Bright': { name: 'Oat Bloom Latte', desc: 'Floral, bright and clean', emoji: '🌺' }, 'Nutty & Warm': { name: 'Almond Warm Latte', desc: 'Almond milk, warm spice', emoji: '🥜' }, 'Caramel & Sweet': { name: 'Oat Caramel Latte', desc: 'Smooth caramel, oat milk', emoji: '🍮' } },
    'Extra Foam': { 'Chocolatey': { name: 'Classic Cappuccino', desc: 'Perfect foam, rich espresso', emoji: '☕' }, 'Fruity & Bright': { name: 'Fruity Cappuccino', desc: 'Light, bright and foamy', emoji: '🌸' }, 'Nutty & Warm': { name: 'Nut Foam Cap', desc: 'Hazelnut, warm and foamy', emoji: '🌰' }, 'Caramel & Sweet': { name: 'Caramel Cappuccino', desc: 'Sweet caramel foam', emoji: '🍯' } },
  },
  'Sweet & Creamy': {
    'Black': { 'Chocolatey': { name: 'Midnight Cold Brew', desc: 'Sweet, cold, chocolatey', emoji: '🌙' }, 'Fruity & Bright': { name: 'Fruity Cold Brew', desc: 'Sweet and bright', emoji: '🍓' }, 'Nutty & Warm': { name: 'Pecan Cold Brew', desc: 'Nutty, sweet, smooth', emoji: '🥜' }, 'Caramel & Sweet': { name: 'Caramel Cold Brew', desc: 'Sweet caramel cold brew', emoji: '🍯' } },
    'With Milk': { 'Chocolatey': { name: 'Mocha Latte', desc: 'Chocolate, espresso, cream', emoji: '🍫' }, 'Fruity & Bright': { name: 'Sakura Cold Brew', desc: 'Floral, fruity, sweet', emoji: '🌸' }, 'Nutty & Warm': { name: 'Hazelnut Latte', desc: 'Sweet hazelnut cream', emoji: '🌰' }, 'Caramel & Sweet': { name: 'Caramel Frappé', desc: 'Iced, sweet and indulgent', emoji: '🧋' } },
    'Plant-Based': { 'Chocolatey': { name: 'Oat Mocha', desc: 'Chocolate oat perfection', emoji: '🍫' }, 'Fruity & Bright': { name: 'Berry Oat Latte', desc: 'Sweet, fruity and creamy', emoji: '🍓' }, 'Nutty & Warm': { name: 'Almond Mocha', desc: 'Nutty chocolate blend', emoji: '🥜' }, 'Caramel & Sweet': { name: 'Caramel Oat Cappuccino', desc: 'Caramel + oat heaven', emoji: '🍯' } },
    'Extra Foam': { 'Chocolatey': { name: 'Chocolate Cloud', desc: 'Chocolate foam dream', emoji: '☁️' }, 'Fruity & Bright': { name: 'Berry Foam Cap', desc: 'Sweet foam, bright notes', emoji: '🍇' }, 'Nutty & Warm': { name: 'Praline Cappuccino', desc: 'Rich praline with foam', emoji: '🌰' }, 'Caramel & Sweet': { name: 'Aura Signature Blend', desc: 'Our most loved cup', emoji: '⭐' } },
  },
};

export default function AIRecommender() {
  const { addToCart, toggleCart } = useAuraStore();
  const [answers, setAnswers] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<{ name: string; desc: string; emoji: string } | null>(null);

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      // Calculate recommendation
      const [a0, a1, a2] = newAnswers;
      const rec = recommendations[a0]?.[a1]?.[a2] ?? { name: 'Aura Signature Blend', desc: 'Our house favourite', emoji: '⭐' };
      setResult(rec);
    }
  };

  const reset = () => { setAnswers([]); setCurrent(0); setResult(null); };

  return (
    <section className="section-pad relative noise-overlay overflow-hidden" style={{ background: 'hsl(var(--deep-roast))' }}>
      <div className="container relative z-10 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-accent text-gold/60 italic tracking-widest mb-3">AI-Powered</p>
          <WordReveal
            text={"Let AI Find Your\nPerfect Coffee"}
            as="h2"
            className="font-display text-4xl md:text-6xl text-foreground mb-4"
            stagger={0.1}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="card-dark p-8"
            >
              {/* Progress dots */}
              <div className="flex gap-2 mb-8 justify-center">
                {questions.map((_, i) => (
                  <div key={i} className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-gold' : i < current ? 'w-2 h-2 bg-gold/60' : 'w-2 h-2 bg-border'}`} />
                ))}
              </div>

              <h3 className="font-display text-2xl md:text-3xl text-center mb-8 text-foreground">
                {questions[current].q}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {questions[current].options.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ y: -4, borderColor: 'hsl(var(--gold))' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(option)}
                    className="card-dark p-4 text-sm font-body text-foreground/70 hover:text-foreground text-center transition-all"
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-dark p-10 text-center border-gold/30"
              style={{ boxShadow: 'var(--gold-glow)' }}
            >
              <div className="text-6xl mb-4">{result.emoji}</div>

              <p className="font-accent text-gold/60 italic mb-2">☕ Recommended for You</p>
              <h3 className="font-display text-3xl text-foreground mb-3">{result.name}</h3>
              <p className="font-body text-foreground/60 mb-4">{result.desc}</p>

              <p className="font-accent text-lg italic text-foreground/50 mb-6">
                "The perfect match for your palate today."
              </p>

              <div className="inline-block px-3 py-1 rounded-full border border-gold/30 text-gold/70 text-xs font-body mb-8">
                98% Match
              </div>

              <div className="flex gap-3 justify-center flex-wrap">
                <button onClick={() => { if (result) { addToCart({ id: `ai-${result.name}`, name: result.name, price: 6.0 }); toggleCart(); } }} className="btn-gold text-xs py-3 px-8">Order Now</button>
                <button onClick={reset} className="btn-ghost text-xs py-3 px-8">Retake Quiz</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
