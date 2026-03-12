import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

function FloatingBeans() {
  const beans = Array.from({ length: 12 }, (_, i) => ({
    id: i, x: Math.random() * 100, delay: Math.random() * 4, dur: 4 + Math.random() * 4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {beans.map((b) => (
        <motion.div
          key={b.id}
          className="absolute w-3 h-4 rounded-full opacity-10"
          style={{ left: `${b.x}%`, bottom: '-20px', background: 'hsl(25 31% 33%)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
          animate={{ y: [0, '-110vh'], rotate: [0, 720] }}
          transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    setLoading(true);
    // Simulate auth
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative noise-overlay overflow-hidden" style={{ background: 'hsl(var(--espresso))' }}>
      <FloatingBeans />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-lg p-8 md:p-10 w-full max-w-md mx-4 relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-3xl gold-text tracking-wider">VOLCA BREW</Link>
          <p className="font-accent italic text-foreground/50 text-lg mt-1">"Your cup is waiting."</p>
        </div>

        {/* Social Auth */}
        <div className="space-y-3 mb-6">
          <button className="w-full flex items-center justify-center gap-3 py-3 rounded bg-white text-gray-900 font-body text-sm font-medium hover:shadow-lg transition-all hover:-translate-y-0.5">
            <span className="text-lg">G</span> Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 py-3 rounded bg-black text-white border border-white/10 font-body text-sm font-medium hover:shadow-lg transition-all hover:-translate-y-0.5">
            <span className="text-lg"></span> Continue with Apple
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-foreground/30 font-body">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-body uppercase tracking-widest text-foreground/40 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-gold w-full text-sm"
              placeholder="hello@example.com"
            />
          </div>

          <div>
            <label className="text-xs font-body uppercase tracking-widest text-foreground/40 block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-gold w-full text-sm pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-gold"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-xs font-body text-foreground/40 hover:text-gold transition-colors">
              Forgot password?
            </Link>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-destructive font-body bg-destructive/10 rounded px-3 py-2"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-3 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-espresso/30 border-t-espresso rounded-full animate-spin" />
            ) : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm font-body text-foreground/40">
          Don't have an account?{' '}
          <Link to="/signup" className="text-gold hover:underline">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}
