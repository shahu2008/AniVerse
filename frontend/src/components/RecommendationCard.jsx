import AnimeCard from "./AnimeCard";

function RecommendationCard({ anime, reason }) {
  return (
    <div className="relative">

      <AnimeCard anime={anime} />

      <div className="absolute top-4 left-4 z-20">

        <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs px-4 py-2 rounded-full shadow-lg font-semibold">

          {reason}

        </span>

      </div>

    </div>
  );
}

export default RecommendationCard;