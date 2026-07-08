import { useWatchlist } from "../context/WatchlistContext";
import AnimeCard from "../components/AnimeCard";

function Watchlist() {

  const { watchlist } = useWatchlist();

  return (
    <div className="min-h-screen bg-black text-white px-8 py-12">

      <h1 className="text-5xl font-black mb-10">
        📑 My Watchlist
      </h1>

      {watchlist.length === 0 ? (

        <div className="text-center mt-24">

          <h2 className="text-3xl text-gray-300">
            Your watchlist is empty.
          </h2>

          <p className="text-gray-500 mt-4">
            Add anime to watch later.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {watchlist.map((anime) => (

            <AnimeCard
              key={anime.watchlist_id}
              anime={anime}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default Watchlist;