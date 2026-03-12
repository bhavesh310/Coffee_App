import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ShoppingCart, Menu, X, Coffee, ChevronDown } from 'lucide-react';
import { useAuraStore } from '@/store/useAuraStore';

const navLinks = [
  { label: 'Menu', href: '/menu' },
  { label: 'Origins', href: '/origins' },
  { label: 'Masterclass', href: '/masterclass' },
  { label: 'Store', href: '/store' },
  { label: 'Find Us', href: '/find-us' },
];

/* Magnetic hover effect for nav links */
function MagneticLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.li
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative group"
    >
      <Link
        to={href}
        className={`relative font-body text-[11px] tracking-[0.2em] uppercase py-1 block transition-colors duration-300 ${
          isActive ? 'text-gold' : 'text-foreground/50 hover:text-foreground/90'
        }`}
      >
        {label}
        {/* Underline slide */}
        <span
          className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-gold to-warm-amber transition-all duration-500 ${
            isActive ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        />
      </Link>
    </motion.li>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, toggleCart } = useAuraStore();
  const location = useLocation();
  const count = cartCount();
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > 200 && y > lastY.current + 5);
      if (y < lastY.current - 5) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Main bar */}
      <div
        className={`relative transition-all duration-500 ${
          scrolled
            ? 'mx-4 mt-3 rounded-xl border border-gold/10'
            : 'mx-0 mt-0 rounded-none border-b border-transparent'
        }`}
        style={{
          background: scrolled
            ? 'hsl(16 53% 5% / 0.85)'
            : 'linear-gradient(180deg, hsl(11 11% 4% / 0.7) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        }}
      >
        {/* Gold top shimmer line — only when scrolled */}
        {scrolled && (
          <div className="absolute top-0 left-4 right-4 h-px rounded-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        )}

        <div className="flex items-center h-16 px-6 lg:px-8">

          {/* ── LOGO ── */}
          <Link to="/" className="flex-shrink-0 flex flex-col leading-none group w-36">
            <motion.span
              className="font-display text-xl tracking-[0.18em] gold-text"
              whileHover={{ letterSpacing: '0.26em' }}
              transition={{ duration: 0.3 }}
            >
              VOLCA BREW
            </motion.span>
            <span className="font-accent italic text-[9px] text-foreground/30 tracking-[0.3em] mt-0.5">
              EST. MMXXVI
            </span>
          </Link>

          {/* ── CENTER LINKS ── */}
          <ul className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <MagneticLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={location.pathname === link.href}
              />
            ))}
          </ul>

          {/* ── RIGHT ACTIONS ── */}
          <div className="ml-auto flex items-center gap-3 lg:gap-4">

            {/* Passport pill */}
            <Link
              to="/passport"
              className="hidden lg:flex items-center gap-1.5 text-[10px] font-body text-foreground/50 hover:text-gold transition-all duration-300 uppercase tracking-[0.18em] group"
            >
              <span className="w-5 h-5 rounded-full border border-foreground/20 group-hover:border-gold/60 flex items-center justify-center transition-colors duration-300">
                <Coffee size={10} />
              </span>
              Passport
            </Link>

            {/* Divider */}
            <div className="hidden lg:block w-px h-4 bg-foreground/10" />

            {/* Cart */}
            <motion.button
              onClick={toggleCart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="relative p-1.5 text-foreground/50 hover:text-gold transition-colors duration-300"
            >
              <ShoppingCart size={16} strokeWidth={1.5} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gold text-espresso text-[8px] font-bold flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Sign In — premium pill */}
            <Link
              to="/login"
              className="hidden lg:flex items-center gap-2 relative overflow-hidden group"
            >
              <span
                className="relative z-10 text-[10px] font-body font-semibold uppercase tracking-[0.18em] px-5 py-2 rounded-full border border-gold/40 text-gold/80 group-hover:text-espresso transition-colors duration-400"
                style={{ transition: 'color 0.35s ease' }}
              >
                Sign In
                {/* Fill on hover */}
                <span
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-warm-amber scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 -z-10"
                  style={{ transition: 'transform 0.35s cubic-bezier(0.77,0,0.175,1)' }}
                />
              </span>
            </Link>

            {/* Mobile Toggle */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden flex flex-col gap-1 p-2 group"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-px bg-foreground/60 group-hover:bg-gold transition-colors origin-left"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block w-3.5 h-px bg-foreground/60 group-hover:bg-gold transition-colors"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-px bg-foreground/60 group-hover:bg-gold transition-colors origin-left"
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:hidden mx-4 mt-1 rounded-xl border border-gold/10 overflow-hidden"
            style={{
              background: 'hsl(16 53% 5% / 0.96)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={link.href}
                    className={`block py-3 font-body text-xs tracking-[0.2em] uppercase border-b border-border/30 transition-colors duration-200 ${
                      location.pathname === link.href ? 'text-gold' : 'text-foreground/60 hover:text-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                className="pt-4 flex gap-3"
              >
                <Link to="/login" className="btn-gold flex-1 text-center text-xs py-3">
                  Sign In
                </Link>
                <Link to="/signup" className="btn-ghost flex-1 text-center text-xs py-3">
                  Create Account
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
