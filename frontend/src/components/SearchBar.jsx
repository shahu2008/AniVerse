import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { searchAnime } from "../api/animeApi";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const fetchAnime = async () => {
      try {
        const data = await searchAnime(query);
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnime();
  }, [query]);

  const handleAnimeClick = (animeId) => {
    navigate(`/anime/${animeId}`);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-10">

      <div className="flex items-center bg-slate-900 border border-slate-700 rounded-full px-6 py-4">

        <FiSearch
          className="text-cyan-400"
          size={22}
        />

        <input
          className="bg-transparent outline-none text-white ml-4 flex-1"
          placeholder="Search Anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

      </div>

      {results.length > 0 && (

        <div className="absolute w-full bg-slate-900 mt-3 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden max-h-[500px] overflow-y-auto z-50">

          {results.map((anime) => (

            <div
              key={anime.anime_id}
              onClick={() => handleAnimeClick(anime.anime_id)}
              className="flex items-center gap-5 p-4 hover:bg-slate-800 cursor-pointer transition border-b border-slate-800 last:border-none"
            >

              {anime.poster ? (

                <img
                  src={anime.poster}
                  alt={anime.title}
                  className="w-16 h-20 rounded-lg object-cover"
                />

              ) : (

                <div className="w-16 h-20 rounded-lg bg-slate-700 flex items-center justify-center text-2xl">
                  🎬
                </div>

              )}

              <div className="flex-1">

                <h2 className="font-bold text-lg">
                  {anime.title}
                </h2>

                <div className="flex gap-5 mt-2 text-sm text-gray-400">

                  <span>
                    ⭐ {anime.rating}
                  </span>

                  <span>
                    📺 {anime.type}
                  </span>

                  <span>
                    🎞 {anime.episodes} Episodes
                  </span>

                </div>

                <p className="text-cyan-400 text-sm mt-2">
                  👥 {anime.members.toLocaleString()} Members
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default SearchBar;