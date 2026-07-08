import Hero from "../components/Hero";
import TrendingSection from "../components/TrendingSection";
import TopRatedSection from "../components/TopRatedSection";
import RecommendedSection from "../components/RecommendedSection";
import GenreSection from "../components/GenreSection";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero */}
      <Hero />

      {/* Content */}
      <main className="mx-auto max-w-[1700px]">

        <TrendingSection />

        <RecommendedSection />

        <TopRatedSection />

        <GenreSection />

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Home;