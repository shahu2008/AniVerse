import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAnimeDetails } from "../api/animeApi";

import RatingStars from "../components/RatingStars";
import ReviewSection from "../components/ReviewSection";
import FavoriteButton from "../components/FavoriteButton";
import WatchlistButton from "../components/WatchlistButton";
import RecommendationCarousel from "../components/RecommendationCarousel";

import {
  FaStar,
  FaUsers,
  FaTv,
  FaFilm,
} from "react-icons/fa";

function AnimeDetails() {
  const { id } = useParams();

  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const data = await getAnimeDetails(id);
        setAnime(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnime();
  }, [id]);

  if (!anime) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage: `url(${anime.jikan.images.jpg.large_image_url})`,
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

      <div className="relative max-w-7xl mx-auto px-8 py-14 grid lg:grid-cols-[380px_1fr] gap-12">

        {/* Poster */}
        <div className="flex justify-center">

          <img
            src={anime.jikan.images.jpg.large_image_url}
            alt={anime.database.title}
            className="w-full max-w-sm rounded-3xl border border-slate-700 shadow-[0_25px_80px_rgba(0,0,0,0.7)]"
          />

        </div>

        {/* Right Side */}
        <div>

          <h1 className="text-6xl font-black leading-tight">
            {anime.database.title}
          </h1>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-8">

            <div className="flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2 font-bold text-black">
              <FaStar />
              {anime.database.rating}
            </div>

            <div className="flex items-center gap-2 rounded-full bg-slate-800 px-5 py-2">
              <FaTv />
              {anime.database.type}
            </div>

            <div className="flex items-center gap-2 rounded-full bg-slate-800 px-5 py-2">
              <FaFilm />
              {anime.database.episodes} Episodes
            </div>

            <div className="flex items-center gap-2 rounded-full bg-slate-800 px-5 py-2">
              <FaUsers />
              {anime.database.members.toLocaleString()}
            </div>

          </div>

          {/* Favorite + Watchlist */}
          <div className="grid grid-cols-2 gap-4 mt-10">

            <FavoriteButton animeId={anime.database.anime_id} />

            <WatchlistButton animeId={anime.database.anime_id} />

          </div>

          {/* Synopsis */}
          <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-8">

            <h2 className="mb-6 text-3xl font-black">
              📖 Synopsis
            </h2>

            <p className="text-lg leading-9 text-gray-300">
              {anime.jikan.synopsis}
            </p>

          </div>

          {/* Rating */}
          <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-8">

            <h3 className="mb-6 text-2xl font-black">
              ⭐ Your Rating
            </h3>

            <RatingStars
              animeId={anime.database.anime_id}
            />

          </div>

          {/* Reviews */}
          <div className="mt-12">

            <RecommendationCarousel
  title={anime.database.title}
/>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AnimeDetails;