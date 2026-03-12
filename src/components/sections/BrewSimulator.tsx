import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuraStore } from '@/store/useAuraStore';
import { WordReveal } from '@/components/WordReveal';

const beans = [
  { id: 'arabica', name: 'Arabica', emoji: '🌿', origin: '🇧🇷 Brazil', flavor: 'Sweet, Smooth, Mild acidity' },
  { id: 'robusta', name: 'Robusta', emoji: '⚡', origin: '🇮🇳 India', flavor: 'Strong, Earthy, High caffeine' },
  { id: 'yirg', name: 'Yirgacheffe', emoji: '🌸', origin: '🇪🇹 Ethiopia', flavor: 'Floral, Fruity, Bright' },
];

const methods = [
  { id: 'french', name: 'French Press', icon: '🫖', desc: 'Full immersion, bold body' },
  { id: 'espresso', name: 'Espresso Machine', icon: '⚙️', desc: 'Pressure-extracted, intense' },
  { id: 'pourover', name: 'Pour Over', icon: '🫗', desc: 'Precise, clean, nuanced' },
];

const recommendations: Record<string, Record<string, string>> = {
  arabica: { french: 'Santos Breakfast Blend', espresso: 'Velvet Macchiato', pourover: 'Guatemala Chemex' },
  robusta: { french: 'Midnight Cold Brew', espresso: 'Dark Cortado', pourover: 'Indian Coorg Drip' },
  yirg: { french: 'Ethiopian Natural Press', espresso: 'Rose Gold Cappuccino', pourover: 'Ethiopian Pour Over' },
};

export default function BrewSimulator() {
  const [step, setStep] = useState(0);
  const [bean, setBean] = useState('');
  const [method, setMethod] = useState('');
  const [milk, setMilk] = useState(30);
  const [sugar, setSugar] = useState(20);
  const [hot, setHot] = useState(true);
  const [result, setResult] = useState(false);

  const handleFinish = () => {
    setResult(true);
  };

  const reset = () => {
    setBean(''); setMethod(''); setMilk(30); setSugar(20); setHot(true); setResult(false); setStep(0);
  };

  const { addToCart, toggleCart } = useAuraStore();
  const brewName = bean && method ? recommendations[bean]?.[method] ?? 'Volca Signature Blend' : '';

  const handleAddToOrder = () => {
    addToCart({ id: `brew-${bean}-${method}`, name: brewName, price: 6.5 });
    toggleCart();
  };

  return (
    <section id="brew-simulator" className="section-pad relative noise-overlay overflow-hidden" style={{ background: 'hsl(var(--background))' }}>
      <div className="container relative z-10 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-accent text-gold/60 italic tracking-widest mb-3">Interactive</p>
          <WordReveal
            text={"Brew Your\nPerfect Cup"}
            as="h2"
            className="font-display text-4xl md:text-6xl text-foreground mb-4"
            stagger={0.11}
          />
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-gold/60 text-xl">~</span>
            <div className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
        </motion.div>

        {/* Step indicator */}
        {!result && (
          <div className="flex items-center justify-center gap-3 mb-10">
            {[0, 1, 2].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-bold transition-all duration-300 ${
                  s === step ? 'bg-gold text-espresso' : s < step ? 'bg-gold/40 text-gold' : 'bg-muted text-foreground/30'
                }`}>
                  {s + 1}
                </div>
                {s < 2 && <div className={`w-12 h-px transition-all duration-300 ${s < step ? 'bg-gold/60' : 'bg-border'}`} />}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 0: Choose beans */}
          {!result && step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h3 className="font-display text-2xl text-center mb-6 text-foreground/80">Choose Your Beans</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {beans.map((b) => (
                  <motion.button
                    key={b.id}
                    whileHover={{ y: -4 }}
                    onClick={() => { setBean(b.id); setStep(1); }}
                    className={`card-dark p-6 text-left transition-all ${bean === b.id ? 'border-gold/60 bg-gold/5' : ''}`}
                  >
                    <div className="text-4xl mb-3">{b.emoji}</div>
                    <h4 className="font-display text-lg mb-1">{b.name}</h4>
                    <p className="text-xs text-foreground/50 mb-2">{b.origin}</p>
                    <p className="text-xs text-foreground/40 font-body">{b.flavor}</p>
                    {bean === b.id && <div className="mt-3 text-gold text-xs">✓ Selected</div>}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 1: Choose method */}
          {!result && step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h3 className="font-display text-2xl text-center mb-6 text-foreground/80">Choose Your Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {methods.map((m) => (
                  <motion.button
                    key={m.id}
                    whileHover={{ y: -4 }}
                    onClick={() => { setMethod(m.id); setStep(2); }}
                    className={`card-dark p-6 text-center transition-all ${method === m.id ? 'border-gold/60 bg-gold/5' : ''}`}
                  >
                    <div className="text-4xl mb-3">{m.icon}</div>
                    <h4 className="font-display text-lg mb-1">{m.name}</h4>
                    <p className="text-xs text-foreground/40 font-body">{m.desc}</p>
                    {method === m.id && <div className="mt-3 text-gold text-xs">✓ Selected</div>}
                  </motion.button>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <button onClick={() => setStep(0)} className="btn-ghost text-xs py-2 px-6">← Back</button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Customize */}
          {!result && step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h3 className="font-display text-2xl text-center mb-6 text-foreground/80">Customize Your Cup</h3>
              <div className="card-dark p-8 space-y-8">
                {/* Hot/Iced toggle */}
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-foreground/70">Temperature</span>
                  <div className="flex gap-2">
                    <button onClick={() => setHot(true)} className={`px-4 py-1.5 rounded text-sm font-body transition-all ${hot ? 'bg-gold text-espresso font-semibold' : 'border border-border text-foreground/40'}`}>☕ Hot</button>
                    <button onClick={() => setHot(false)} className={`px-4 py-1.5 rounded text-sm font-body transition-all ${!hot ? 'bg-gold text-espresso font-semibold' : 'border border-border text-foreground/40'}`}>🧊 Iced</button>
                  </div>
                </div>

                {/* Milk slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-body text-foreground/70">
                    <span>Milk Amount</span>
                    <span className="text-gold">{milk}%</span>
                  </div>
                  <input type="range" min={0} max={100} value={milk} onChange={(e) => setMilk(+e.target.value)} className="w-full accent-gold" />
                  <div className="flex justify-between text-xs text-foreground/30"><span>Black</span><span>Extra Milky</span></div>
                </div>

                {/* Sugar slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-body text-foreground/70">
                    <span>Sweetness</span>
                    <span className="text-gold">{sugar}%</span>
                  </div>
                  <input type="range" min={0} max={100} value={sugar} onChange={(e) => setSugar(+e.target.value)} className="w-full accent-gold" />
                  <div className="flex justify-between text-xs text-foreground/30"><span>No sugar</span><span>Very sweet</span></div>
                </div>
              </div>

              <div className="flex gap-3 justify-center mt-6">
                <button onClick={() => setStep(1)} className="btn-ghost text-xs py-3 px-6">← Back</button>
                <button onClick={handleFinish} className="btn-gold text-xs py-3 px-8">Brew It ✨</button>
              </div>
            </motion.div>
          )}

          {/* Result */}
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-dark p-8 border-gold/30 text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl mb-4 relative inline-block"
              >
                ☕
                <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                  <div className="steam-wisp" /><div className="steam-wisp" /><div className="steam-wisp" />
                </div>
              </motion.div>

              <p className="font-accent text-gold/60 italic text-sm mb-2">✨ Your Perfect Brew</p>
              <h3 className="font-display text-3xl text-foreground mb-4">{brewName}</h3>

              <div className="my-6 space-y-2 text-left max-w-sm mx-auto">
                {[
                  { label: 'Strength', value: milk < 20 ? '████████░░ Strong' : milk < 60 ? '██████░░░░ Medium' : '████░░░░░░ Light' },
                  { label: 'Temperature', value: hot ? '☕ Hot' : '🧊 Iced' },
                  { label: 'Milk', value: `${milk}% — ${milk === 0 ? 'Black' : milk < 30 ? 'Splash' : milk < 60 ? 'Regular' : 'Extra'}` },
                  { label: 'Sweetness', value: `${sugar}% — ${sugar === 0 ? 'Bitter' : sugar < 30 ? 'Subtle' : sugar < 60 ? 'Balanced' : 'Sweet'}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm font-body border-b border-border pb-2">
                    <span className="text-foreground/50">{label}</span>
                    <span className="text-gold/80 font-mono text-xs">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 justify-center mt-6">
                <button onClick={reset} className="btn-ghost text-xs py-3 px-6">Try Again</button>
                <button onClick={handleAddToOrder} className="btn-gold text-xs py-3 px-8">Add This to My Order</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
