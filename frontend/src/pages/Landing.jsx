import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedHero from "../components/FeaturedHero";
import TrendingSection from "../components/TrendingSection";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import HeroStats from "../components/HeroStats";
import CTASection from "../components/CTASection";
import BackgroundGlow from "../components/BackgroundGlow";
import SectionTitle from "../components/SectionTitle";
import GenreSection from "../components/GenreSection";

function Landing() {
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">

      <BackgroundGlow />

      <Navbar />

      <Hero />

<HeroStats />

<FeaturedHero />

<section className="px-8 md:px-16 py-20">

        <SectionTitle
          title="🔥 Trending Anime"
          subtitle="Most loved anime by the community"
        />

        <TrendingSection />

<FeaturedHero />

<GenreSection />
      </section>

      <section className="px-8 md:px-16 py-20">

        <SectionTitle
          title="Why Choose AniVerse?"
          subtitle="Everything you need in one place"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <FeatureCard
            emoji="🤖"
            title="AI Recommendations"
            description="Personalized anime suggestions."
          />

          <FeatureCard
            emoji="❤️"
            title="Favorites"
            description="Save your favorite anime."
          />

          <FeatureCard
            emoji="📺"
            title="Watchlist"
            description="Track what you want to watch."
          />

          <FeatureCard
            emoji="⭐"
            title="Ratings"
            description="Rate anime and improve recommendations."
          />

        </div>

      </section>

      <CTASection />

      <Footer />

    </div>
  );
}

export default Landing;