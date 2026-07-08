import { useEffect, useState } from "react";

import { getHybridRecommendations } from "../api/recommendationApi";

import RecommendationCard from "../components/RecommendationCard";
import SkeletonCard from "../components/SkeletonCard";

function Recommendation() {

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchRecommendations = async () => {

      try {

        // Change these values later to use the logged-in user
        const data = await getHybridRecommendations(
          "Naruto",
          1
        );

        setRecommendations(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    fetchRecommendations();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen bg-black px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {[...Array(8)].map((_, index) => (

            <SkeletonCard key={index} />

          ))}

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white px-8 py-12">

      <h1 className="text-5xl font-black mb-10">

        🤖 Recommended For You

      </h1>

      {recommendations.length === 0 ? (

        <div className="text-center mt-24">

          <h2 className="text-3xl text-gray-300">

            No recommendations available.

          </h2>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {recommendations.map((anime) => (

            <RecommendationCard
              key={anime.anime_id}
              anime={anime}
              reason="✨ Hybrid Recommendation"
            />

          ))}

        </div>

      )}

    </div>

  );

}

export default Recommendation;