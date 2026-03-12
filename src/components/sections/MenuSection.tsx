import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { WordReveal } from '@/components/WordReveal';
import { useAuraStore } from '@/store/useAuraStore';
import { X, Plus } from 'lucide-react';

const categories = ['Espresso', 'Pour Over', 'Cold Brew', 'Seasonal', 'Signature'] as const;

const menuItems = [
  { id: 'e1', cat: 'Espresso', name: 'Espresso Royale', tags: ['Bold', 'Chocolatey', 'Rich'], price: 4.5, intensity: 90, origin: 'Colombia', method: 'Espresso', notes: 'Deep cacao with a syrupy body and lingering caramel finish.', pairing: 'Dark chocolate, Almond biscotti' },
  { id: 'e2', cat: 'Espresso', name: 'Velvet Macchiato', tags: ['Smooth', 'Creamy', 'Sweet'], price: 5.0, intensity: 65, origin: 'Brazil', method: 'Espresso', notes: 'Velvety micro-foam layered over bright espresso with vanilla notes.', pairing: 'Vanilla shortbread, Honey tart' },
  { id: 'e3', cat: 'Espresso', name: 'Dark Cortado', tags: ['Intense', 'Nutty', 'Bold'], price: 4.0, intensity: 85, origin: 'Guatemala', method: 'Espresso', notes: 'Equal parts espresso and warm milk, nutty and precise.', pairing: 'Hazelnut croissant' },
  { id: 'p1', cat: 'Pour Over', name: 'Ethiopian Pour Over', tags: ['Fruity', 'Bright', 'Floral'], price: 6.0, intensity: 55, origin: 'Ethiopia', method: 'V60 Pour Over', notes: 'Jasmine and stone fruit aromatics with a clean, tea-like finish.', pairing: 'Lemon tart, Fruit cake' },
  { id: 'p2', cat: 'Pour Over', name: 'Guatemala Chemex', tags: ['Smooth', 'Caramel', 'Nutty'], price: 5.5, intensity: 60, origin: 'Guatemala', method: 'Chemex', notes: 'Caramel sweetness with a silky, clean body and almond notes.', pairing: 'Cinnamon roll, Pecan pie' },
  { id: 'c1', cat: 'Cold Brew', name: 'Midnight Cold Brew', tags: ['Chilled', 'Bold', 'Smooth'], price: 5.5, intensity: 75, origin: 'Brazil', method: '24h Cold Steep', notes: 'Full-bodied, low-acidity brew with dark chocolate notes over ice.', pairing: 'Chocolate mousse, Banana bread' },
  { id: 'c2', cat: 'Cold Brew', name: 'Nitro Oat Float', tags: ['Creamy', 'Sweet', 'Refreshing'], price: 6.5, intensity: 60, origin: 'Colombia', method: 'Nitro Cold Brew', notes: 'Silky nitrogen-infused brew with oat milk — tastes like coffee ice cream.', pairing: 'Waffles, Vanilla sorbet' },
  { id: 's1', cat: 'Seasonal', name: 'Sakura Cold Brew', tags: ['Floral', 'Light', 'Delicate'], price: 7.0, intensity: 40, origin: 'Japan', method: 'Cold Brew', notes: 'Cherry blossom infused cold brew — ephemeral and extraordinary.', pairing: 'Mochi, Cherry tart' },
  { id: 'sig1', cat: 'Signature', name: 'Aura Blend', tags: ['Complex', 'Balanced', 'Unique'], price: 7.5, intensity: 80, origin: 'Multi-origin', method: 'Signature Pull', notes: 'Our house blend — three origins in perfect harmony, gold-kissed crema.', pairing: 'Anything you desire' },
  { id: 'sig2', cat: 'Signature', name: 'Oat Velvet Latte', tags: ['Smooth', 'Creamy', 'Sweet'], price: 6.0, intensity: 55, origin: 'Colombia', method: 'Espresso + Steam', notes: 'Single-origin espresso with house oat milk, velvety and warm.', pairing: 'Almond croissant, Banana bread' },
  { id: 'sig3', cat: 'Signature', name: 'Rose Gold Cappuccino', tags: ['Floral', 'Sweet', 'Elegant'], price: 6.5, intensity: 50, origin: 'Ethiopia', method: 'Cappuccino', notes: 'Rosewater and Ethiopian espresso — a truly cinematic cup.', pairing: 'Rose macaron, Pistachio cake' },
  { id: 'p3', cat: 'Pour Over', name: 'Indian Coorg Drip', tags: ['Spiced', 'Earthy', 'Rich'], price: 5.5, intensity: 70, origin: 'India', method: 'Kalita Wave', notes: 'Earthy and spiced single origin from Coorg with a cedar finish.', pairing: 'Cardamom cookies' },
];

function IntensityBar({ value, inView }: { value: number; inView: boolean }) {
  return (
    <div className="intensity-bar mt-3">
      <div
        className="intensity-bar-fill"
        style={{ width: inView ? `${value}%` : '0%' }}
      />
    </div>
  );
}

function MenuCard({ item, onOpen }: { item: typeof menuItems[0]; onOpen: (item: typeof menuItems[0]) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { addToCart } = useAuraStore();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="card-dark p-6 flex flex-col gap-4 group"
    >
      {/* Icon */}
      <div className="text-4xl group-hover:rotate-12 transition-transform duration-500">
        ☕
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-body uppercase tracking-widest px-2 py-0.5 rounded border border-gold/20 text-gold/60">
            {tag}
          </span>
        ))}
      </div>

      <h3 className="font-display text-xl text-foreground">{item.name}</h3>

      <div className="flex items-center justify-between text-sm">
        <span className="font-body text-foreground/50 text-xs uppercase tracking-wider">{item.origin}</span>
        <span className="gold-text font-display text-lg">${item.price.toFixed(2)}</span>
      </div>

      {/* Intensity */}
      <div>
        <div className="flex justify-between text-xs text-foreground/40 font-body mb-1">
          <span>Intensity</span>
          <span>{item.intensity}%</span>
        </div>
        <IntensityBar value={item.intensity} inView={inView} />
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-2">
        <button
          onClick={() => onOpen(item)}
          className="btn-ghost text-xs py-2 flex-1"
        >
          View Details
        </button>
        <button
          onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}
          className="btn-gold text-xs py-2 flex-1"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

function MenuModal({ item, onClose }: { item: typeof menuItems[0]; onClose: () => void }) {
  const { addToCart } = useAuraStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'hsl(0 0% 0% / 0.8)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="glass rounded-lg p-8 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-foreground/40 hover:text-gold transition-colors">
          <X size={20} />
        </button>

        <div className="text-5xl mb-4">☕</div>
        <h2 className="font-display text-3xl text-foreground mb-2">{item.name}</h2>
        <p className="font-accent text-gold/70 italic text-lg mb-6">{item.notes}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { label: 'Origin', value: item.origin },
            { label: 'Method', value: item.method },
            { label: 'Pairing', value: item.pairing },
            { label: 'Intensity', value: `${item.intensity}%` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-muted/50 rounded p-3">
              <div className="text-[10px] uppercase tracking-widest text-foreground/40 mb-1">{label}</div>
              <div className="text-sm text-foreground">{value}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => { addToCart({ id: item.id, name: item.name, price: item.price }); onClose(); }}
            className="btn-gold flex-1 py-3 flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add to Order — ${item.price.toFixed(2)}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MenuSection({ limit }: { limit?: number }) {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('Espresso');
  const [selectedItem, setSelectedItem] = useState<typeof menuItems[0] | null>(null);

  const filtered = menuItems
    .filter((m) => m.cat === activeCategory)
    .slice(0, limit);

  return (
    <section id="menu" className="section-pad noise-overlay relative" style={{ background: 'hsl(var(--deep-roast))' }}>
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-accent text-gold/60 italic tracking-widest mb-3">Our Craft</p>
          <WordReveal
            text="The Menu"
            className="font-display text-4xl md:text-6xl text-foreground mb-4"
          />
          <p className="text-foreground/50 font-body max-w-md mx-auto">
            Every cup is sourced, roasted, and brewed with purpose.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-1 mb-10 justify-start md:justify-center pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm font-body uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${
                activeCategory === cat
                  ? 'text-gold border-gold'
                  : 'text-foreground/40 border-transparent hover:text-foreground/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} onOpen={setSelectedItem} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
