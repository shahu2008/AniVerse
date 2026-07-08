import { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";
import Loader from "./Loader";
import { getTopAnime } from "../api/animeApi";

function TrendingSection() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);

        const data = await getTopAnime();

        console.log("Top Anime:", data);

        setAnimeList(data);
      } catch (error) {
        console.error("Error fetching anime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-6">

    

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {animeList.map((anime) => (
          <AnimeCard
            key={anime.anime_id}
            anime={anime}
          />
        ))}

      </div>

    </div>
  </section>
);
}

export default TrendingSection;