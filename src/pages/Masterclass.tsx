import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuraStore } from '@/store/useAuraStore';
import { toast } from '@/components/ui/use-toast';

const classes = [
  {
    id: 'mc1',
    title: 'Espresso Fundamentals',
    subtitle: 'Master the extraction science behind a perfect shot',
    duration: '3 hours',
    seats: '8 seats',
    level: 'Beginner',
    price: 95,
    date: 'Mar 22, 2026',
    tag: 'SELLING FAST',
    gradient: 'from-amber-900/40 to-transparent',
  },
  {
    id: 'mc2',
    title: 'Pour Over Mastery',
    subtitle: 'Bloom, pour, and patience — the art of manual brewing',
    duration: '2.5 hours',
    seats: '6 seats',
    level: 'Intermediate',
    price: 85,
    date: 'Apr 5, 2026',
    tag: '',
    gradient: 'from-stone-800/40 to-transparent',
  },
  {
    id: 'mc3',
    title: 'Latte Art Workshop',
    subtitle: 'Microfoam technique, free-pour rosettas and tulips',
    duration: '4 hours',
    seats: '10 seats',
    level: 'Intermediate',
    price: 110,
    date: 'Apr 12, 2026',
    tag: 'POPULAR',
    gradient: 'from-yellow-900/30 to-transparent',
  },
  {
    id: 'mc4',
    title: 'Origin Cupping Session',
    subtitle: 'Taste 8 single-origins and train your palate',
    duration: '2 hours',
    seats: '12 seats',
    level: 'All levels',
    price: 65,
    date: 'Apr 19, 2026',
    tag: '',
    gradient: 'from-orange-900/30 to-transparent',
  },
  {
    id: 'mc5',
    title: 'Home Roasting Intensive',
    subtitle: 'Drum roast, maillard reactions, and first crack timing',
    duration: '5 hours',
    seats: '6 seats',
    level: 'Advanced',
    price: 160,
    date: 'May 3, 2026',
    tag: 'NEW',
    gradient: 'from-red-900/30 to-transparent',
  },
  {
    id: 'mc6',
    title: 'Coffee & Food Pairing',
    subtitle: 'How flavour compounds in coffee complement food',
    duration: '2 hours',
    seats: '14 seats',
    level: 'All levels',
    price: 75,
    date: 'May 10, 2026',
    tag: '',
    gradient: 'from-teal-900/20 to-transparent',
  },
];

const levelColor: Record<string, string> = {
  Beginner: 'text-emerald-400 border-emerald-400/40',
  Intermediate: 'text-gold border-gold/40',
  Advanced: 'text-red-400 border-red-400/40',
  'All levels': 'text-foreground/50 border-foreground/20',
};

export default function MasterclassPage() {
  const { addToCart, toggleCart } = useAuraStore();

  const handleReserve = (cls: typeof classes[0]) => {
    addToCart({ id: cls.id, name: cls.title, price: cls.price });
    toggleCart();
  };

  return (
    <>
      <Navigation />
      <div className="pt-20 min-h-screen noise-overlay" style={{ background: 'hsl(var(--background))' }}>
        <div className="container section-pad">

          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <p className="font-accent text-gold/60 italic tracking-widest mb-3">Learn from the best</p>
            <h1 className="font-display text-5xl md:text-7xl text-foreground mb-5">
              Coffee <span className="gold-text italic">Masterclass</span>
            </h1>
            <p className="font-body text-foreground/50 max-w-lg mx-auto leading-relaxed">
              Small-batch workshops led by our head roaster. Walk away with new skills,
              tasting notes, and a bag of freshly roasted beans.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls, i) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="card-dark p-0 overflow-hidden group hover-lift cursor-pointer"
              >
                {/* Colour band */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${cls.gradient.replace('to-transparent', 'to-gold/60')} opacity-60`} />

                <div className="p-6">
                  {/* Tag + level */}
                  <div className="flex items-center gap-2 mb-4">
                    {cls.tag && (
                      <span className="text-[9px] font-body uppercase tracking-widest border border-gold/40 text-gold px-2 py-0.5 rounded">
                        {cls.tag}
                      </span>
                    )}
                    <span className={`text-[9px] font-body uppercase tracking-widest border px-2 py-0.5 rounded ${levelColor[cls.level]}`}>
                      {cls.level}
                    </span>
                  </div>

                  <h3 className="font-display text-xl text-foreground mb-1.5 group-hover:text-gold transition-colors duration-300">
                    {cls.title}
                  </h3>
                  <p className="font-body text-sm text-foreground/45 mb-5 leading-relaxed">
                    {cls.subtitle}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-4 mb-5 text-foreground/40">
                    <span className="flex items-center gap-1.5 font-body text-xs">
                      <Clock size={11} />
                      {cls.duration}
                    </span>
                    <span className="flex items-center gap-1.5 font-body text-xs">
                      <Users size={11} />
                      {cls.seats}
                    </span>
                    <span className="flex items-center gap-1.5 font-body text-xs">
                      <Star size={11} />
                      {cls.date}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="gold-text font-display text-2xl">${cls.price}</span>
                     <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReserve(cls)}
                      className="btn-gold text-xs py-2 px-5 flex items-center gap-1.5"
                    >
                      Reserve
                      <ChevronRight size={12} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Private events CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-16 text-center card-dark p-10"
          >
            <p className="font-accent italic text-gold/60 tracking-widest mb-2">Bespoke experiences</p>
            <h2 className="font-display text-3xl text-foreground mb-3">Private Group Events</h2>
            <p className="font-body text-foreground/45 max-w-md mx-auto mb-6">
              Hosting a corporate event or private celebration? We'll craft a custom coffee
              experience for your team of 10–50 people.
            </p>
            <Link to="/find-us" className="btn-gold inline-block px-8 py-3 text-sm">
              Get in Touch
            </Link>
          </motion.div>

        </div>
      </div>
      <Footer />
    </>
  );
}
