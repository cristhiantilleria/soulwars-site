import NewsTicker      from "@/components/NewsTicker";
import Navigation      from "@/components/Navigation";
import Hero            from "@/components/Hero";
import WipeBanner      from "@/components/WipeBanner";
import GameOverview    from "@/components/GameOverview";
import GuideNav        from "@/components/GuideNav";
import LevelingGuide   from "@/components/LevelingGuide";
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
        <GameOverview />
        <GuideNav />
        <TipsSection />
        <LevelingGuide />
        <FactionsSection />
        <StatsSection />
        <MobsSection />
        <PerksSection />
        <BuildMaker />
      </main>
      <Footer />
    </>
  );
}
