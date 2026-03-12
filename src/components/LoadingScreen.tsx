import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Bean {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'beans' | 'logo' | 'done'>('beans');
  const [beans] = useState<Bean[]>(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 1.5 + Math.random() * 1,
      size: 8 + Math.random() * 12,
    }))
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('logo'), 1800);
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'hsl(11 11% 4%)' }}
        >
          {/* Falling beans */}
          {phase === 'beans' && beans.map((bean) => (
            <motion.div
              key={bean.id}
              className="absolute rounded-full"
              style={{
                left: `${bean.x}%`,
                width: bean.size,
                height: bean.size * 1.5,
                background: `hsl(${25 + Math.random() * 10} 31% ${20 + Math.random() * 15}%)`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              }}
              initial={{ y: '-10vh', opacity: 0, rotate: 0 }}
              animate={{ y: '110vh', opacity: [0, 1, 1, 0], rotate: 720 }}
              transition={{ duration: bean.duration, delay: bean.delay, ease: 'easeIn' }}
            />
          ))}

          {/* Logo reveal */}
          <AnimatePresence>
            {phase === 'logo' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center flex flex-col items-center gap-6"
              >
                {/* Coffee cup icon */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  className="text-6xl relative"
                >
                  ☕
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <div className="steam-wisp" />
                    <div className="steam-wisp" />
                    <div className="steam-wisp" />
                  </div>
                </motion.div>

                {/* Brand name */}
                <motion.h1
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                  className="font-display text-5xl md:text-7xl gold-text tracking-[0.2em]"
                >
                  VOLCA BREW
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="font-accent text-xl text-foreground/60 tracking-wider"
                >
                  "Coffee is not a drink. It's an experience."
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  onClick={onComplete}
                  className="btn-gold animate-pulse-gold mt-4 px-10 py-4 text-sm tracking-widest"
                >
                  Enter
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
