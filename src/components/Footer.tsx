import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-16 relative noise-overlay overflow-hidden" style={{ background: 'hsl(var(--espresso))' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-3xl gold-text mb-3 tracking-wider">VOLCA BREW</h3>
            <p className="font-accent italic text-foreground/50 text-lg mb-4">
              "Coffee is not a drink. It's an experience."
            </p>
            <p className="font-body text-sm text-foreground/40 leading-relaxed max-w-xs">
              Specialty coffee sourced from the world's finest estates, roasted with intention and served with obsessive care.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: 'Our Menu', href: '/menu' },
                { label: 'Coffee Origins', href: '/origins' },
                { label: 'Masterclass', href: '/masterclass' },
                { label: 'Seasonal Drops', href: '/seasonal' },
                { label: 'Find Our Café', href: '/find-us' },
              ].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="font-body text-sm text-foreground/50 hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4">Account</h4>
            <ul className="space-y-3">
              {[
                { label: 'Coffee Passport', href: '/passport' },
                { label: 'My Orders', href: '/account/orders' },
                { label: 'Store', href: '/store' },
                { label: 'Sign In', href: '/login' },
                { label: 'Create Account', href: '/signup' },
              ].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="font-body text-sm text-foreground/50 hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px bg-border mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-foreground/30">
            © 2026 Volca Brew. All rights reserved.
          </p>

          <p className="font-body text-xs text-foreground/30">
              Crafted with care by{' '}
              <span className="gold-text font-semibold tracking-wide">Bhavesh</span>
          </p>

          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
              <a key={l} href="#" className="font-body text-xs text-foreground/30 hover:text-gold transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
