import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

function PasswordStrength({ password }: { password: string }) {
  const strength = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 8 ? 2
    : /[0-9]/.test(password) || /[^a-zA-Z0-9]/.test(password) ? 3
    : 3;

  const labels = ['', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const colors = ['bg-transparent', 'bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400'];
  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={`h-1 flex-1 rounded transition-all duration-300 ${s <= strength ? colors[strength] : 'bg-border'}`} />
        ))}
      </div>
      <span className={`text-xs font-body ${['', 'text-red-400', 'text-orange-400', 'text-yellow-400', 'text-green-400'][strength]}`}>
        {labels[strength]}
      </span>
    </div>
  );
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showP, setShowP] = useState(false);
  const [showC, setShowC] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative noise-overlay overflow-hidden" style={{ background: 'hsl(var(--espresso))' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-lg p-10 w-full max-w-md mx-4 relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl text-foreground mb-2">Set New Password</h2>
          <p className="font-body text-foreground/50 text-sm">Choose a strong, unique password.</p>
        </div>

        {done ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
            <div className="text-5xl mb-4">✅</div>
            <p className="font-display text-xl text-gold mb-2">Password updated!</p>
            <p className="font-body text-sm text-foreground/50">Redirecting to login...</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-body uppercase tracking-widest text-foreground/40 block mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showP ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-gold w-full text-sm pr-10"
                  placeholder="Min. 8 characters"
                />
                <button type="button" onClick={() => setShowP(!showP)} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-gold">
                  {showP ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            <div>
              <label className="text-xs font-body uppercase tracking-widest text-foreground/40 block mb-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showC ? 'text' : 'password'}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="input-gold w-full text-sm pr-10"
                  placeholder="Repeat password"
                />
                <button type="button" onClick={() => setShowC(!showC)} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-gold">
                  {showC ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-destructive font-body bg-destructive/10 rounded px-3 py-2">{error}</div>
            )}

            <button type="submit" disabled={loading} className="btn-gold w-full py-3 flex items-center justify-center gap-2">
              {loading ? <div className="w-4 h-4 border-2 border-espresso/30 border-t-espresso rounded-full animate-spin" /> : 'Update Password'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
