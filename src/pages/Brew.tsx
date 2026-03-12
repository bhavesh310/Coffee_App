import Navigation from '@/components/Navigation';
import BrewSimulator from '@/components/sections/BrewSimulator';
import Footer from '@/components/Footer';

export default function BrewPage() {
  return (
    <>
      <Navigation />
      <div className="pt-20">
        <BrewSimulator />
      </div>
      <Footer />
    </>
  );
}
