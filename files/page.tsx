import HeroCurtainReveal from '@/components/hero/HeroCurtainReveal';
import MarqueeBand from '@/components/ui/MarqueeBand';
import TrustBar from '@/components/sections/TrustBar';
import HowItWorks from '@/components/sections/HowItWorks';
import Categories from '@/components/sections/Categories';
import FamilyCareCTA from '@/components/sections/FamilyCareCTA';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      {/* Hero with Curtain Reveal Animation */}
      <HeroCurtainReveal />
      
      {/* Trust Bar */}
      <TrustBar />
      
      {/* Marquee */}
      <MarqueeBand text="LE PROCESSUS" />
      
      {/* How it Works */}
      <HowItWorks />
      
      {/* Categories */}
      <Categories />
      
      {/* Family Care CTA */}
      <FamilyCareCTA />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
