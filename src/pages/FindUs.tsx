import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Instagram, ArrowUpRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const locations = [
  {
    id: 'l1',
    name: 'Volca Brew — Shoreditch',
    address: '14 Redchurch Street, London E2 7DJ',
    hours: 'Mon–Fri 7am–6pm · Sat–Sun 8am–7pm',
    phone: '+44 20 7946 0832',
    tag: 'FLAGSHIP',
    mapUrl: 'https://maps.google.com',
  },
  {
    id: 'l2',
    name: 'Volca Brew — Soho',
    address: '38 Brewer Street, London W1F 9TA',
    hours: 'Mon–Fri 7:30am–5:30pm · Sat 9am–6pm',
    phone: '+44 20 7946 1104',
    tag: '',
    mapUrl: 'https://maps.google.com',
  },
  {
    id: 'l3',
    name: 'Aura Roastery & Bar',
    address: '7 Vyner Street, London E2 9DG',
    hours: 'Wed–Sun 9am–5pm',
    phone: '+44 20 7946 0201',
    tag: 'ROASTERY',
    mapUrl: 'https://maps.google.com',
  },
];

export default function FindUsPage() {
  return (
    <>
      <Navigation />
      <div className="pt-20 min-h-screen noise-overlay" style={{ background: 'hsl(var(--background))' }}>
        <div className="container section-pad">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <p className="font-accent text-gold/60 italic tracking-widest mb-3">Come in, sit down</p>
            <h1 className="font-display text-5xl md:text-7xl text-foreground mb-5">
              Find <span className="gold-text italic">Us</span>
            </h1>
            <p className="font-body text-foreground/50 max-w-md mx-auto">
              Three spaces in East and Central London. Each with its own character,
              the same obsession with quality.
            </p>
          </motion.div>

          {/* Locations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="card-dark p-6 group hover-lift"
              >
                {loc.tag && (
                  <span className="inline-block text-[9px] font-body uppercase tracking-widest border border-gold/40 text-gold px-2 py-0.5 rounded mb-4">
                    {loc.tag}
                  </span>
                )}

                <h3 className="font-display text-xl text-foreground mb-4 group-hover:text-gold transition-colors duration-300">
                  {loc.name}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin size={13} className="text-gold/60 mt-0.5 flex-shrink-0" />
                    <p className="font-body text-sm text-foreground/55 leading-relaxed">{loc.address}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={13} className="text-gold/60 mt-0.5 flex-shrink-0" />
                    <p className="font-body text-sm text-foreground/55 leading-relaxed">{loc.hours}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={13} className="text-gold/60 mt-0.5 flex-shrink-0" />
                    <p className="font-body text-sm text-foreground/55">{loc.phone}</p>
                  </div>
                </div>

                <a
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-xs uppercase tracking-widest text-gold/60 hover:text-gold transition-colors duration-300 group/link"
                >
                  Open in Maps
                  <ArrowUpRight size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="card-dark overflow-hidden mb-16"
            style={{ height: '320px' }}
          >
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-4"
              style={{ background: 'hsl(var(--gold) / 0.03)' }}
            >
              <MapPin size={32} className="text-gold/30" strokeWidth={1} />
              <div className="text-center">
                <p className="font-display text-lg text-foreground/30 mb-1">Interactive Map</p>
                <p className="font-body text-xs text-foreground/20 tracking-widest uppercase">
                  London, United Kingdom
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact + Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Contact */}
            <div className="card-dark p-8">
              <h2 className="font-display text-2xl text-foreground mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <a
                  href="mailto:hello@aurabrew.com"
                  className="flex items-center gap-3 font-body text-sm text-foreground/50 hover:text-gold transition-colors duration-300 group"
                >
                  <span
                    className="w-8 h-8 rounded-full border border-gold/20 group-hover:border-gold/50 flex items-center justify-center transition-colors"
                  >
                    <Mail size={13} className="text-gold/60" />
                  </span>
                  hello@volcabrew.com
                </a>
                <a
                  href="tel:+442079460832"
                  className="flex items-center gap-3 font-body text-sm text-foreground/50 hover:text-gold transition-colors duration-300 group"
                >
                  <span
                    className="w-8 h-8 rounded-full border border-gold/20 group-hover:border-gold/50 flex items-center justify-center transition-colors"
                  >
                    <Phone size={13} className="text-gold/60" />
                  </span>
                  +44 20 7946 0832
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body text-sm text-foreground/50 hover:text-gold transition-colors duration-300 group"
                >
                  <span
                    className="w-8 h-8 rounded-full border border-gold/20 group-hover:border-gold/50 flex items-center justify-center transition-colors"
                  >
                    <Instagram size={13} className="text-gold/60" />
                  </span>
                  @volcabrew
                </a>
              </div>
            </div>

            {/* Hours summary */}
            <div className="card-dark p-8">
              <h2 className="font-display text-2xl text-foreground mb-6">Opening Hours</h2>
              <div className="space-y-3">
                {[
                  { day: 'Monday — Friday', time: '7:00 am — 6:00 pm' },
                  { day: 'Saturday', time: '8:00 am — 7:00 pm' },
                  { day: 'Sunday', time: '9:00 am — 5:00 pm' },
                  { day: 'Bank Holidays', time: '10:00 am — 4:00 pm' },
                ].map(({ day, time }) => (
                  <div key={day} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid hsl(var(--gold) / 0.07)' }}>
                    <span className="font-body text-xs uppercase tracking-widest text-foreground/40">{day}</span>
                    <span className="font-accent italic text-foreground/60 text-sm">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      <Footer />
    </>
  );
}
