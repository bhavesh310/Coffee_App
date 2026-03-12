import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { useAuraStore } from '@/store/useAuraStore';

export default function CartDrawer() {
  const { cart, cartOpen, toggleCart, removeFromCart, addToCart } = useAuraStore();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleCart}
            className="fixed inset-0 z-[60]"
            style={{ background: 'hsl(0 0% 0% / 0.6)', backdropFilter: 'blur(4px)' }}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 right-0 h-full w-full max-w-sm z-[70] flex flex-col"
            style={{
              background: 'hsl(16 53% 5%)',
              borderLeft: '1px solid hsl(var(--gold) / 0.15)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '1px solid hsl(var(--gold) / 0.1)' }}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={16} className="text-gold" strokeWidth={1.5} />
                <span className="font-display text-lg text-foreground tracking-wide">Your Order</span>
              </div>
              <motion.button
                onClick={toggleCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 text-foreground/40 hover:text-foreground transition-colors"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence>
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-48 gap-3"
                  >
                    <ShoppingBag size={36} className="text-foreground/20" strokeWidth={1} />
                    <p className="font-body text-sm text-foreground/40 tracking-widest uppercase">
                      Your cart is empty
                    </p>
                  </motion.div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-4 p-4 rounded-xl"
                      style={{
                        background: 'hsl(var(--gold) / 0.04)',
                        border: '1px solid hsl(var(--gold) / 0.08)',
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-sm text-foreground truncate">{item.name}</p>
                        <p className="font-body text-xs text-foreground/40 mt-0.5">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      {/* Qty controls */}
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => {
                            if (item.qty === 1) removeFromCart(item.id);
                            else {
                              // Decrement by manipulating store directly via addToCart logic
                              useAuraStore.setState((s) => ({
                                cart: s.cart.map((c) =>
                                  c.id === item.id ? { ...c, qty: c.qty - 1 } : c
                                ),
                              }));
                            }
                          }}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-foreground/50 hover:text-gold transition-colors"
                          style={{ border: '1px solid hsl(var(--gold) / 0.2)' }}
                        >
                          <Minus size={10} />
                        </motion.button>

                        <span className="font-body text-sm text-foreground w-4 text-center">
                          {item.qty}
                        </span>

                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-foreground/50 hover:text-gold transition-colors"
                          style={{ border: '1px solid hsl(var(--gold) / 0.2)' }}
                        >
                          <Plus size={10} />
                        </motion.button>
                      </div>

                      <span className="font-display text-sm gold-text w-12 text-right">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>

                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => removeFromCart(item.id)}
                        className="text-foreground/25 hover:text-red-400 transition-colors ml-1"
                      >
                        <Trash2 size={13} />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div
                className="px-6 py-5 space-y-4"
                style={{ borderTop: '1px solid hsl(var(--gold) / 0.1)' }}
              >
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs uppercase tracking-widest text-foreground/40">
                    Subtotal
                  </span>
                  <span className="font-display text-xl gold-text">${total.toFixed(2)}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-gold w-full py-3.5 text-sm tracking-widest"
                >
                  Proceed to Checkout
                </motion.button>

                <button
                  onClick={toggleCart}
                  className="w-full text-center font-body text-xs text-foreground/30 hover:text-foreground/60 transition-colors tracking-widest uppercase py-1"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
