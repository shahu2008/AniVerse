import { useEffect, useState } from "react";
import { getFavorites } from "../api/favoriteApi";
import AnimeCard from "../components/AnimeCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center text-2xl">
        Loading Favorites...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-8 py-12">

      <h1 className="text-5xl font-black mb-10">
        ❤️ My Favorites
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-3xl mb-3">No favorites yet.</p>
          <p>Add your favorite anime to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {favorites.map((anime) => (
            <AnimeCard
              key={anime.favorite_id}
              anime={anime}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Favorites;