import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuraStore } from '@/store/useAuraStore';

const products = [
  { id: 'b1', emoji: '☕', name: 'Ethiopia Yirgacheffe', sub: '250g Whole Bean', price: 18, tag: 'BEST SELLER' },
  { id: 'b2', emoji: '🌿', name: 'Santos Bourbon Brazil', sub: '500g Whole Bean', price: 28, tag: '' },
  { id: 'b3', emoji: '⚡', name: 'Volca Signature Blend', sub: '1kg Ground', price: 45, tag: 'EXCLUSIVE' },
  { id: 'b4', emoji: '🫖', name: 'French Press Kit', sub: '600ml + Guide', price: 55, tag: '' },
  { id: 'b5', emoji: '🫗', name: 'Pour Over Set', sub: 'V60 + Filters + Scale', price: 75, tag: 'POPULAR' },
  { id: 'b6', emoji: '📦', name: 'Monthly Discovery Box', sub: '3 origins + notes', price: 49, tag: 'SUBSCRIBE' },
];

export default function StorePage() {
  const { addToCart, toggleCart } = useAuraStore();

  const handleAddToCart = (p: typeof products[0]) => {
    addToCart({ id: p.id, name: p.name, price: p.price });
    toggleCart();
  };

  return (
    <>
      <Navigation />
      <div className="pt-20 min-h-screen noise-overlay" style={{ background: 'hsl(var(--background))' }}>
        <div className="container section-pad">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <p className="font-accent text-gold/60 italic tracking-widest mb-3">Craft Sourced</p>
            <h1 className="font-display text-5xl md:text-7xl text-foreground mb-4">
              The <span className="gold-text italic">Store</span>
            </h1>
            <p className="font-body text-foreground/50 max-w-md mx-auto">
              Beans, equipment, and subscription boxes shipped fresh from our roastery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="card-dark p-6 group"
              >
                {p.tag && (
                  <span className="inline-block text-[10px] font-body uppercase tracking-widest border border-gold/40 text-gold px-2 py-0.5 rounded mb-3">
                    {p.tag}
                  </span>
                )}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{p.emoji}</div>
                <h3 className="font-display text-xl text-foreground mb-1">{p.name}</h3>
                <p className="font-body text-sm text-foreground/50 mb-4">{p.sub}</p>
                <div className="flex items-center justify-between">
                  <span className="gold-text font-display text-2xl">${p.price}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(p)}
                    className="btn-gold text-xs py-2 px-5"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
