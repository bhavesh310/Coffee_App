import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import ScrollProgress from '@/components/ScrollProgress';
import HeroSection from '@/components/sections/HeroSection';
import MenuSection from '@/components/sections/MenuSection';
import BrewSimulator from '@/components/sections/BrewSimulator';
import AIRecommender from '@/components/sections/AIRecommender';
import OriginMap from '@/components/sections/OriginMap';
import MoodOrdering from '@/components/sections/MoodOrdering';
import SeasonalDrops from '@/components/sections/SeasonalDrops';
import StatsBar from '@/components/sections/StatsBar';
import CoffeeHoroscope from '@/components/sections/CoffeeHoroscope';
import NewsletterSection from '@/components/sections/NewsletterSection';
import Footer from '@/components/Footer';

export default function Index() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <ScrollProgress />
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {loaded && (
        <>
          <Navigation />
          <main>
            <HeroSection />
            <StatsBar />
            <MenuSection />
            <BrewSimulator />
            <AIRecommender />
            <OriginMap />
            <MoodOrdering />
            <SeasonalDrops />
            <CoffeeHoroscope />
            <NewsletterSection />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
