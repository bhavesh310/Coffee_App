import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

function PasswordStrength({ password }: { password: string }) {
  const strength = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 8 ? 2
    : /[0-9]/.test(password) || /[^a-zA-Z0-9]/.test(password) ? 3
    : (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[^a-zA-Z0-9]/.test(password)) ? 4 : 3;

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

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agree, setAgree] = useState(false);
  const [marketing, setMarketing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) { setError('Please fill in all fields.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (!agree) { setError('Please agree to the Terms & Privacy Policy.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    navigate('/verify-email', { state: { email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative noise-overlay overflow-hidden py-12" style={{ background: 'hsl(var(--espresso))' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-lg p-8 md:p-10 w-full max-w-md mx-4 relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-3xl gold-text tracking-wider">VOLCA BREW</Link>
          <p className="font-accent italic text-foreground/50 text-lg mt-1">"Start your coffee journey."</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Full Name', type: 'text', value: name, set: setName, placeholder: 'Your name' },
            { label: 'Email Address', type: 'email', value: email, set: setEmail, placeholder: 'hello@example.com' },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs font-body uppercase tracking-widest text-foreground/40 block mb-1">{f.label}</label>
              <input
                type={f.type}
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                className="input-gold w-full text-sm"
                placeholder={f.placeholder}
              />
            </div>
          ))}

          <div>
            <label className="text-xs font-body uppercase tracking-widest text-foreground/40 block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-gold w-full text-sm pr-10"
                placeholder="Min. 8 characters"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-gold">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <PasswordStrength password={password} />
          </div>

          <div>
            <label className="text-xs font-body uppercase tracking-widest text-foreground/40 block mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="input-gold w-full text-sm pr-10"
                placeholder="Repeat password"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-gold">
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <label className="flex items-start gap-3 mt-2">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-gold" />
            <span className="text-xs font-body text-foreground/50">
              I agree to the <a href="#" className="text-gold hover:underline">Terms & Privacy Policy</a>
            </span>
          </label>

          <label className="flex items-start gap-3">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-0.5 accent-gold" />
            <span className="text-xs font-body text-foreground/50">Send me exclusive brew drops & offers</span>
          </label>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-destructive font-body bg-destructive/10 rounded px-3 py-2"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-3 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <div className="w-4 h-4 border-2 border-espresso/30 border-t-espresso rounded-full animate-spin" /> : 'Create My Account'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-foreground/30 font-body">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-3 py-3 rounded bg-white text-gray-900 font-body text-sm font-medium hover:shadow-lg transition-all hover:-translate-y-0.5">
            <span>G</span> Sign up with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 py-3 rounded bg-black text-white border border-white/10 font-body text-sm font-medium hover:shadow-lg transition-all hover:-translate-y-0.5">
            <span></span> Sign up with Apple
          </button>
        </div>

        <p className="text-center mt-6 text-sm font-body text-foreground/40">
          Already have an account?{' '}
          <Link to="/login" className="text-gold hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
