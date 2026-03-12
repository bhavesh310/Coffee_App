import Navigation from '@/components/Navigation';
import SeasonalDrops from '@/components/sections/SeasonalDrops';
import Footer from '@/components/Footer';

export default function SeasonalPage() {
  return (
    <>
      <Navigation />
      <div className="pt-20">
        <SeasonalDrops />
      </div>
      <Footer />
    </>
  );
}
