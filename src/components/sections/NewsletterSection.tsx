import { useState } from 'react';
import { motion } from 'framer-motion';
import { WordReveal } from '@/components/WordReveal';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  return (
    <section className="section-pad relative noise-overlay overflow-hidden" style={{ background: 'hsl(var(--deep-roast))' }}>
      {/* Decorative gold orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, hsl(var(--gold)), transparent)' }}
        />
      </div>

      <div className="container relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-accent text-gold/60 italic tracking-widest mb-3">Join the Circle</p>
          <WordReveal
            text={"Join the Volca Brew\nInner Circle"}
            as="h2"
            className="font-display text-4xl md:text-6xl text-foreground mb-6"
            stagger={0.09}
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 text-left max-w-xs mx-auto">
            {[
              'Early access to seasonal drops',
              'Monthly coffee passport summary',
              '10% off your first order',
              'Exclusive brewing tips',
            ].map((benefit) => (
              <div key={benefit} />
            ))}
          </div>

          <ul className="inline-flex flex-col gap-2 mb-10 text-left">
            {[
              '✦ Early access to seasonal drops',
              '✦ Monthly coffee passport summary',
              '✦ 10% off your first order',
              '✦ Exclusive brewing tips',
            ].map((b) => (
              <li key={b} className="font-body text-sm text-foreground/60">{b}</li>
            ))}
          </ul>

          {!joined ? (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-gold flex-1 text-sm"
              />
              <button
                onClick={() => email && setJoined(true)}
                className="btn-gold text-sm py-3 px-8 whitespace-nowrap"
              >
                Join Now
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4 px-8 card-dark border-gold/30 inline-block mb-4"
            >
              <span className="gold-text font-display text-lg">☕ Welcome to the Circle!</span>
            </motion.div>
          )}

          <p className="font-body text-xs text-foreground/30">
            No spam. Just really good coffee.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
