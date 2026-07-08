import { FaStar, FaUsers, FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import FavoriteButton from "./FavoriteButton";
import WatchlistButton from "./WatchlistButton";

function AnimeCard({ anime }) {
  return (
    <Link to={`/anime/${anime.anime_id}`}>

      <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-lg shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-cyan-500/60 hover:shadow-cyan-500/30">

        {/* Poster */}

        <div className="relative h-80 overflow-hidden">

          {anime.poster ? (

            <img
              src={anime.poster}
              alt={anime.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />

          ) : (

            <div className="w-full h-full bg-gradient-to-br from-cyan-600 via-purple-700 to-slate-900 flex items-center justify-center text-8xl">
              🎬
            </div>

          )}

          {/* Overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* Rating */}

          <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-yellow-400 px-3 py-1 font-bold text-black shadow-lg">

            <FaStar />

            {anime.rating}

          </div>

          {/* Type */}

          <div className="absolute top-4 right-4 rounded-full bg-cyan-500/90 px-3 py-1 text-sm font-semibold backdrop-blur-md">

            {anime.type}

          </div>

          {/* View Details */}

          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold opacity-0 backdrop-blur-md transition duration-500 group-hover:opacity-100">

            <FaPlayCircle />

            View Details

          </div>

        </div>

        {/* Card Content */}

        <div className="p-6">

          <h2 className="min-h-[60px] text-xl font-bold leading-7 line-clamp-2">

            {anime.title}

          </h2>

          <div className="mt-4 flex items-center justify-between text-gray-400">

            <span>

              📺 {anime.episodes} Episodes

            </span>

            <span className="flex items-center gap-2 text-cyan-400">

              <FaUsers />

              {anime.members.toLocaleString()}

            </span>

          </div>

          {/* Buttons */}

          <div className="mt-6 grid grid-cols-2 gap-3">

            <FavoriteButton animeId={anime.anime_id} />

            <WatchlistButton animeId={anime.anime_id} />

          </div>

        </div>

      </div>

    </Link>
  );
}

export default AnimeCard;