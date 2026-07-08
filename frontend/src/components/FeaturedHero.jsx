import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedAnime } from "../api/animeApi";
import {
  FaStar,
  FaUsers,
  FaCalendarAlt,
  FaPlay,
} from "react-icons/fa";

function FeaturedHero() {
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getFeaturedAnime();
        setAnime(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFeatured();
  }, []);

  if (!anime) return null;

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{
        backgroundImage: `url(${anime.poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>

          <p className="uppercase tracking-[6px] text-cyan-400 font-bold">
            Featured Anime
          </p>

          <h1 className="text-5xl lg:text-7xl font-black mt-5 leading-tight">
            {anime.title}
          </h1>

          {/* Stats */}

          <div className="flex flex-wrap gap-4 mt-8">

            <span className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
              <FaStar />
              {anime.rating}
            </span>

            <span className="bg-slate-800 px-4 py-2 rounded-full">
              📺 {anime.type}
            </span>

            <span className="bg-slate-800 px-4 py-2 rounded-full">
              🎞 {anime.episodes} Episodes
            </span>

            <span className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full">
              <FaCalendarAlt />
              {anime.year}
            </span>

            <span className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full">
              <FaUsers />
              {anime.members.toLocaleString()}
            </span>

          </div>

          {/* Synopsis */}

          <p className="mt-8 text-gray-300 text-lg leading-8 max-w-2xl line-clamp-5">
            {anime.synopsis}
          </p>

          {/* Buttons */}

          <div className="flex flex-wrap gap-5 mt-10">

            <Link to={`/anime/${anime.anime_id}`}>

              <button className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105">

                <FaPlay />

                View Details

              </button>

            </Link>

            <button className="border border-white/30 backdrop-blur-md bg-white/10 hover:bg-white hover:text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105">

              + Watchlist

            </button>

          </div>

        </div>

        {/* RIGHT POSTER */}

        <div className="hidden lg:flex justify-center">

          <img
            src={anime.poster}
            alt={anime.title}
            className="w-[360px] rounded-3xl shadow-2xl shadow-cyan-500/30 hover:scale-105 transition duration-500"
          />

        </div>

      </div>
    </section>
  );
}

export default FeaturedHero;