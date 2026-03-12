import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const badges = [
  { emoji: '☕', name: 'First Espresso', unlocked: true },
  { emoji: '🌍', name: 'Origin Explorer', unlocked: true },
  { emoji: '🎓', name: 'Brew Master', unlocked: false },
  { emoji: '🔥', name: '30-Day Streak', unlocked: false },
  { emoji: '⭐', name: 'Signature Hunter', unlocked: true },
  { emoji: '🍵', name: 'Pour Over Pro', unlocked: false },
];

export default function PassportPage() {
  return (
    <>
      <Navigation />
      <div className="pt-20 min-h-screen noise-overlay" style={{ background: 'hsl(var(--background))' }}>
        <div className="container section-pad max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="font-accent text-gold/60 italic tracking-widest mb-3">Your Journey</p>
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-4">
              Coffee <span className="gold-text italic">Passport</span>
            </h1>
          </motion.div>

          {/* Passport card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-dark p-8 border-gold/20 mb-8"
            style={{ boxShadow: '0 0 40px hsl(43 62% 52% / 0.1)' }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gold/20 border-2 border-gold/40 flex items-center justify-center text-3xl">
                ☕
              </div>
              <div>
                <h2 className="font-display text-3xl text-foreground">Coffee Traveller</h2>
                <p className="font-body text-foreground/50 text-sm mt-1">Member since March 2026</p>
                <div className="flex gap-4 mt-3">
                  <div className="text-center">
                    <p className="gold-text font-display text-2xl">47</p>
                    <p className="text-xs text-foreground/40 font-body">Drinks Logged</p>
                  </div>
                  <div className="text-center">
                    <p className="gold-text font-display text-2xl">12</p>
                    <p className="text-xs text-foreground/40 font-body">Day Streak</p>
                  </div>
                  <div className="text-center">
                    <p className="gold-text font-display text-2xl">5</p>
                    <p className="text-xs text-foreground/40 font-body">Origins</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Badges */}
          <div className="mb-8">
            <h3 className="font-display text-2xl text-foreground mb-4">Your Badges</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`card-dark p-4 flex flex-col items-center gap-2 ${!badge.unlocked ? 'opacity-30 grayscale' : 'border-gold/20'}`}
                >
                  <span className="text-3xl">{badge.emoji}</span>
                  <span className="text-[10px] font-body text-center text-foreground/60">{badge.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA to sign in */}
          <div className="card-dark p-8 text-center border-gold/20">
            <div className="text-4xl mb-3">☕</div>
            <h3 className="font-display text-2xl mb-2">Sign in to unlock your full Passport</h3>
            <p className="font-body text-sm text-foreground/50 mb-6">Track every brew, earn badges, and get your monthly Coffee Story.</p>
            <div className="flex gap-3 justify-center">
              <Link to="/login" className="btn-gold text-sm py-3 px-8">Sign In</Link>
              <Link to="/signup" className="btn-ghost text-sm py-3 px-8">Create Account</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
