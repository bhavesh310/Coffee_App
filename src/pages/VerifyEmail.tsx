import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function VerifyEmailPage() {
  const location = useLocation();
  const email = (location.state as { email?: string })?.email ?? 'you@example.com';
  const [resent, setResent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleResend = () => {
    if (countdown > 0) return;
    setResent(true);
    setCountdown(60);
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(t); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative noise-overlay overflow-hidden" style={{ background: 'hsl(var(--espresso))' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-lg p-10 w-full max-w-md mx-4 text-center relative z-10"
      >
        {/* Animated envelope */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="text-6xl mb-6"
        >
          ✉️
        </motion.div>

        <h2 className="font-display text-3xl text-foreground mb-3">Check your inbox!</h2>
        <p className="font-body text-foreground/60 mb-2">We sent a verification link to</p>
        <p className="font-body text-gold font-semibold mb-8">{email}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-xs py-3 px-6"
          >
            Open Gmail
          </a>
          <a
            href="https://www.icloud.com/mail"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-xs py-3 px-6"
          >
            Open Apple Mail
          </a>
        </div>

        <div className="h-px bg-border mb-6" />

        <p className="text-sm font-body text-foreground/40 mb-3">
          Didn't get it?{' '}
          <button
            onClick={handleResend}
            disabled={countdown > 0}
            className={`font-body text-sm transition-colors ${countdown > 0 ? 'text-foreground/30' : 'text-gold hover:underline'}`}
          >
            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend email'}
          </button>
        </p>
        {resent && countdown > 0 && (
          <p className="text-xs text-gold font-body mb-3">✓ Email sent!</p>
        )}

        <Link to="/login" className="text-xs font-body text-foreground/40 hover:text-gold transition-colors">
          ← Back to Login
        </Link>
      </motion.div>
    </div>
  );
}
