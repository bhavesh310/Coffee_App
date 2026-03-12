import { useState } from 'react';
import { motion } from 'framer-motion';
import { WordReveal } from '@/components/WordReveal';
import { useAuraStore } from '@/store/useAuraStore';

const origins = [
  { code: 'BR', flag: '🇧🇷', country: 'Brazil', name: 'Santos Bourbon', altitude: '900–1200m', harvest: 'May–September', flavor: ['Chocolate', 'Caramel', 'Nutty'], story: 'From lush Cerrado estates, these Bourbon cherries ripen slowly under golden sun, producing a sweet, balanced cup beloved worldwide.', x: 28, y: 68 },
  { code: 'ET', flag: '🇪🇹', country: 'Ethiopia', name: 'Yirgacheffe Natural', altitude: '1800–2200m', harvest: 'October–January', flavor: ['Jasmine', 'Blueberry', 'Peach'], story: 'Birthplace of coffee. Natural-processed on raised beds, these beans sing with florals and fruit in every sip — truly extraordinary.', x: 57, y: 53 },
  { code: 'CO', flag: '🇨🇴', country: 'Colombia', name: 'Huila Washed', altitude: '1700–1900m', harvest: 'September–December', flavor: ['Red Apple', 'Citrus', 'Honey'], story: 'From the Huila highlands, skilled smallholders use washed processing to reveal sparkling clarity — bright, sweet and perfectly balanced.', x: 27, y: 58 },
  { code: 'IN', flag: '🇮🇳', country: 'India', name: 'Coorg Arabica', altitude: '1000–1200m', harvest: 'November–February', flavor: ['Spice', 'Cedar', 'Dark Fruit'], story: 'Grown under shade-trees in Karnataka\'s Western Ghats, Coorg Arabica has a rare earthy complexity — forest, spice and lingering finish.', x: 72, y: 49 },
  { code: 'GT', flag: '🇬🇹', country: 'Guatemala', name: 'Antigua SHB', altitude: '1500–1700m', harvest: 'December–March', flavor: ['Dark Chocolate', 'Almond', 'Caramel'], story: 'Grown between three volcanoes near ancient Antigua, this strictly-hard-bean variety delivers rich chocolate depth with a clean, sweet finish.', x: 21, y: 52 },
];

export default function OriginMap() {
  const { addToCart, toggleCart } = useAuraStore();
  const [selected, setSelected] = useState<typeof origins[0] | null>(null);

  return (
    <section className="section-pad relative noise-overlay overflow-hidden" style={{ background: 'hsl(var(--background))' }}>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-accent text-gold/60 italic tracking-widest mb-3">Sourced Globally</p>
          <WordReveal
            text="Coffee Origins"
            as="h2"
            className="font-display text-4xl md:text-6xl text-foreground mb-4"
            stagger={0.13}
          />
          <p className="font-body text-foreground/50 max-w-md mx-auto">
            Every bean has a story. Explore the farms, people, and landscapes behind your cup.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Interactive origin cards */}
          <div className="space-y-3">
            {origins.map((origin, i) => (
              <motion.button
                key={origin.code}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 8 }}
                onClick={() => setSelected(selected?.code === origin.code ? null : origin)}
                className={`w-full card-dark p-5 flex items-center gap-4 text-left transition-all ${
                  selected?.code === origin.code ? 'border-gold/50 bg-gold/5' : ''
                }`}
              >
                <span className="text-3xl flex-shrink-0">{origin.flag}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-lg text-foreground">{origin.name}</h4>
                  <p className="font-body text-sm text-foreground/50">{origin.country} · {origin.altitude}</p>
                </div>
                <div className="flex gap-1 flex-wrap justify-end">
                  {origin.flavor.map((f) => (
                    <span key={f} className="text-[10px] border border-gold/20 text-gold/60 rounded px-2 py-0.5 font-body">
                      {f}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="sticky top-24">
            {selected ? (
              <motion.div
                key={selected.code}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="card-dark p-8 border-gold/20"
              >
                <div className="text-6xl mb-4">{selected.flag}</div>
                <p className="font-accent text-gold/60 italic text-sm mb-1">{selected.country}</p>
                <h3 className="font-display text-3xl text-foreground mb-4">{selected.name}</h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-muted/50 rounded p-3">
                    <div className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1">Altitude</div>
                    <div className="text-sm text-foreground">{selected.altitude}</div>
                  </div>
                  <div className="bg-muted/50 rounded p-3">
                    <div className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1">Harvest</div>
                    <div className="text-sm text-foreground">{selected.harvest}</div>
                  </div>
                </div>

                <p className="font-body text-foreground/60 leading-relaxed mb-6">{selected.story}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.flavor.map((f) => (
                    <span key={f} className="px-3 py-1 rounded-full border border-gold/30 text-gold/70 text-xs font-body">
                      {f}
                    </span>
                  ))}
                </div>

                <button onClick={() => { if (selected) { addToCart({ id: `origin-${selected.code}`, name: `${selected.name} (${selected.country})`, price: 18.0 }); toggleCart(); } }} className="btn-gold text-xs py-3 w-full">
                  Shop {selected.country} Coffee →
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card-dark p-8 flex flex-col items-center justify-center text-center min-h-64"
              >
                <div className="text-4xl mb-4">🌍</div>
                <p className="font-display text-xl text-foreground/40 mb-2">Select an Origin</p>
                <p className="font-body text-sm text-foreground/30">
                  Click any farm to explore its story, flavor profile, and harvest season.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
