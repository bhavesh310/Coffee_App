import Navigation from '@/components/Navigation';
import MenuSection from '@/components/sections/MenuSection';
import Footer from '@/components/Footer';

export default function MenuPage() {
  return (
    <>
      <Navigation />
      <div className="pt-20">
        <MenuSection />
      </div>
      <Footer />
    </>
  );
}
