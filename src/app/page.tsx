import NewsTicker      from "@/components/NewsTicker";
import Navigation      from "@/components/Navigation";
import Hero            from "@/components/Hero";
import WipeBanner      from "@/components/WipeBanner";
import FactionsSection from "@/components/FactionsSection";
import StatsSection    from "@/components/StatsSection";
import MobsSection     from "@/components/MobsSection";
import PerksSection    from "@/components/PerksSection";
import BuildMaker      from "@/components/BuildMaker";
import TipsSection     from "@/components/TipsSection";
import Footer          from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NewsTicker />
      <Navigation />
      <main>
        <Hero />
        <WipeBanner />
        <FactionsSection />
        <StatsSection />
        <MobsSection />
        <PerksSection />
        <BuildMaker />
        <TipsSection />
      </main>
      <Footer />
    </>
  );
}
