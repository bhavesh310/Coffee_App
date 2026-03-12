import Navigation from '@/components/Navigation';
import OriginMap from '@/components/sections/OriginMap';
import Footer from '@/components/Footer';

export default function OriginsPage() {
  return (
    <>
      <Navigation />
      <div className="pt-20">
        <OriginMap />
      </div>
      <Footer />
    </>
  );
}
