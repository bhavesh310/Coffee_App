import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroCoffee from '@/assets/hero-coffee.jpg';
import heroEspresso from '@/assets/hero-espresso.png';

const SUBTITLE = "From single-origin estates to signature blends — every cup is a journey through flavour, crafted with obsessive attention to detail.";

function TypewriterText({ text, startDelay = 1.2 }: { text: string; startDelay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [done, setDone] = useState(false);

  // Start after delay
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay * 1000);
    return () => clearTimeout(t);
  }, [startDelay]);

  // Type each character
  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      setDone(true);
      return;
    }
    // Vary speed slightly per character for organic feel
    const base = 28;
    const jitter = Math.random() * 18 - 6;
    const pause = text[displayed.length] === '—' || text[displayed.length] === '.' ? 120 : base + jitter;
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, pause);
    return () => clearTimeout(t);
  }, [started, displayed, text]);

  // Blink cursor — stop blinking once done typing
  useEffect(() => {
    if (done) { setCursorVisible(false); return; }
    const t = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(t);
  }, [done]);

  return (
    <span className="font-body text-lg text-foreground/60 leading-relaxed">
      {displayed}
      <span
        className="inline-block w-0.5 h-[1.1em] align-middle ml-0.5 bg-gold/70 transition-opacity duration-100"
        style={{ opacity: cursorVisible && !done ? 1 : 0 }}
      />
    </span>
  );
}

function SteamWisps() {
  return (
    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-16 h-24 pointer-events-none">
      {[0, 1, 2].map((i) => (
        <div key={i} className="steam-wisp" style={{ animationDelay: `${i * 0.7}s` }} />
      ))}
    </div>
  );
}

function FloatingBean({ x, y, delay, size }: { x: number; y: number; delay: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full opacity-20 pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size * 1.5,
        background: 'hsl(25 31% 33%)',
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
      }}
      animate={{ y: [0, -24, 0], rotate: [0, 15, -15, 0] }}
      transition={{ repeat: Infinity, duration: 4 + delay, delay, ease: 'easeInOut' }}
    />
  );
}

const beans = [
  { x: 8, y: 15, delay: 0, size: 14 },
  { x: 90, y: 10, delay: 0.5, size: 10 },
  { x: 75, y: 70, delay: 1, size: 16 },
  { x: 5, y: 75, delay: 1.5, size: 12 },
  { x: 45, y: 5, delay: 0.8, size: 8 },
  { x: 95, y: 45, delay: 0.3, size: 11 },
  { x: 20, y: 88, delay: 2, size: 9 },
  { x: 60, y: 90, delay: 0.7, size: 13 },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Coffee drip position
  const dripY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Ken Burns background image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={heroCoffee}
          alt="Volca Brew hero coffee"
          className="w-full h-full object-cover"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.28 }}
          transition={{ scale: { duration: 18, ease: 'linear' }, opacity: { duration: 2, ease: 'easeOut' } }}
          style={{ transformOrigin: '60% 50%', scale: bgScale }}
        />

        {/* Bottom-to-top dark fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/50 to-background" />

        {/* ── Golden vignette edges ── */}
        {/* Left edge */}
        <div
          className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
          style={{ background: 'linear-gradient(to right, hsl(43 62% 10% / 0.6), transparent)' }}
        />
        {/* Right edge */}
        <div
          className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
          style={{ background: 'linear-gradient(to left, hsl(43 62% 10% / 0.6), transparent)' }}
        />
        {/* Top edge */}
        <div
          className="absolute inset-x-0 top-0 h-1/3 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, hsl(11 11% 4% / 0.9), transparent)' }}
        />
        {/* Radial warm-gold centre glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 55%, hsl(43 62% 18% / 0.18) 0%, transparent 70%)',
          }}
        />
        {/* Outer corner vignette — darkens all four corners */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 110% 100% at 50% 50%, transparent 40%, hsl(11 11% 2% / 0.85) 100%)',
          }}
        />
      </div>

      {/* Floating beans */}
      {beans.map((b, i) => <FloatingBean key={i} {...b} />)}

      {/* Coffee drip top-right */}
      <motion.div
        className="absolute top-0 right-24 hidden md:block"
        style={{ y: dripY }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="coffee-drip"
            style={{
              left: i * 12,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${2 + i * 0.4}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full mt-24 mb-16"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-accent text-lg text-gold/80 tracking-[0.3em] mb-6 uppercase"
        >
          Specialty Coffee · Crafted with Intention
        </motion.p>

        {/* Word-by-word headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.15] mb-8 overflow-hidden">
          {/* Line 1: "Where Every Sip" */}
          <span className="flex flex-wrap justify-center gap-x-[0.25em]">
            {['Where', 'Every', 'Sip'].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: '60%', filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
                transition={{
                  delay: 0.35 + i * 0.13,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
                style={{ color: 'hsl(var(--cream))' }}
              >
                {word}
              </motion.span>
            ))}
          </span>

          {/* Line 2: "Tells a Story" — gold italic, staggered after line 1 */}
          <span className="flex flex-wrap justify-center gap-x-[0.22em] mt-1">
            {[
              { word: 'Tells', gold: true },
              { word: 'a',     gold: false },
              { word: 'Story', gold: true },
            ].map(({ word, gold }, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: '60%', filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
                transition={{
                  delay: 0.74 + i * 0.13,
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block italic ${gold ? 'gold-text' : ''}`}
                style={!gold ? { color: 'hsl(var(--cream))' } : {}}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.4 }}
          className="mb-12 max-w-xl mx-auto min-h-[4rem] flex items-center justify-center"
        >
          <TypewriterText text={SUBTITLE} startDelay={1.2} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/menu" className="btn-gold text-sm px-10 py-4">
            Explore Our Brew
          </Link>
          <a href="#brew-simulator" className="btn-ghost text-sm px-10 py-4">
            Build Your Cup
          </a>
        </motion.div>

        {/* AI Espresso image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="relative w-48 h-48 md:w-64 md:h-64"
            style={{ filter: 'drop-shadow(0 0 40px hsl(43 62% 40% / 0.55))' }}
          >
            <img
              src={heroEspresso}
              alt="Premium espresso with golden steam"
              className="w-full h-full object-cover rounded-full"
              style={{
                maskImage: 'radial-gradient(ellipse 90% 90% at 50% 55%, black 55%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 55%, black 55%, transparent 100%)',
              }}
            />
            {/* Gold ring */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 0 1.5px hsl(43 62% 52% / 0.35), 0 0 60px hsl(43 62% 40% / 0.25)',
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs tracking-[0.3em] uppercase text-foreground/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
