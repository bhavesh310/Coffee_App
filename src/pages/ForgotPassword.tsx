import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative noise-overlay overflow-hidden" style={{ background: 'hsl(var(--espresso))' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-lg p-10 w-full max-w-md mx-4 text-center relative z-10"
      >
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="text-5xl mb-6">🔑</motion.div>
              <h2 className="font-display text-3xl text-foreground mb-2">Forgot your password?</h2>
              <p className="font-body text-foreground/50 mb-8 text-sm">
                Enter your email and we'll send you a reset link.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-body uppercase tracking-widest text-foreground/40 block mb-1 text-left">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-gold w-full text-sm"
                    placeholder="hello@example.com"
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-gold w-full py-3 flex items-center justify-center gap-2">
                  {loading ? <div className="w-4 h-4 border-2 border-espresso/30 border-t-espresso rounded-full animate-spin" /> : 'Send Reset Link'}
                </button>
              </form>
              <Link to="/login" className="block mt-6 text-sm font-body text-foreground/40 hover:text-gold transition-colors">
                ← Back to Login
              </Link>
            </motion.div>
          ) : (
            <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="text-5xl mb-6">✅</div>
              <h2 className="font-display text-3xl text-foreground mb-3">Reset link sent!</h2>
              <p className="font-body text-foreground/50 mb-8 text-sm">
                Check your inbox at <span className="text-gold">{email}</span>.
                <br />The link expires in 15 minutes.
              </p>
              <Link to="/login" className="btn-ghost text-sm py-3 px-8">← Back to Login</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
