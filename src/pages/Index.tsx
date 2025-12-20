import AureekaHeader from "../components/header/AureekaHeader";
import AureekaFooter from "../components/footer/AureekaFooter";
import HeroBanner from "../components/home/HeroBanner";
import OrnamentHub from "../components/home/OrnamentHub";
import BrandSection from "../components/home/BrandSection";
import LatestSparkles from "../components/home/LatestSparkles";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AureekaHeader />
      
      <main>
        <HeroBanner />
        <OrnamentHub />
        <LatestSparkles />
        <BrandSection />
      </main>
      
      <AureekaFooter />
    </div>
  );
};

export default Index;
