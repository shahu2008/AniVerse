import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaPlay,
  FaStar,
  FaUsers,
  FaTv
} from "react-icons/fa";

import SearchBar from "./SearchBar";
import { getFeaturedAnime } from "../api/animeApi";

function Hero() {

  const [anime, setAnime] = useState(null);

  useEffect(() => {

    const loadFeatured = async () => {

      try {

        const data = await getFeaturedAnime();

        setAnime(data);

      } catch (err) {

        console.error(err);

      }

    };

    loadFeatured();

  }, []);

  if (!anime) return null;

  return (

    <section
      className="relative min-h-[85vh] overflow-hidden"
      style={{
        backgroundImage: `url(${anime.poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      <div className="absolute inset-0 bg-black/75"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-8 pt-20">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >

          <p className="mb-3 text-cyan-400 font-bold tracking-[5px] uppercase">

            Featured Anime

          </p>

          <h1 className="text-6xl lg:text-7xl font-black leading-tight">

            {anime.title}

          </h1>

          <div className="mt-8 flex flex-wrap gap-4">

            <span className="flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 font-bold text-black">

              <FaStar />

              {anime.rating}

            </span>

            <span className="rounded-full bg-slate-800 px-4 py-2">

              <FaTv className="inline mr-2" />

              {anime.type}

            </span>

            <span className="rounded-full bg-slate-800 px-4 py-2">

              {anime.episodes} Episodes

            </span>

            <span className="rounded-full bg-slate-800 px-4 py-2">

              <FaUsers className="inline mr-2" />

              {anime.members.toLocaleString()}

            </span>

          </div>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300 line-clamp-4">

            {anime.synopsis}

          </p>

          <div className="mt-10 flex flex-wrap gap-5">

 <Link to={`/anime/${anime.anime_id}`}>
    <button className="flex items-center gap-3 rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 hover:bg-cyan-400 shadow-lg shadow-cyan-500/40">
        <FaPlay />
        Watch Now
    </button>
</Link>
<button className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black">
    ❤️ Favorite
</button>

  <button className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-md transition hover:bg-white hover:text-black">
    ❤️ Add to Watchlist
  </button>

          </div>

         <div className="mt-12 max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl">
    <SearchBar />
</div>
        </motion.div>

      </div>

    </section>

  );

}

export default Hero;