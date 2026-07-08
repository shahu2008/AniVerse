import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";

import { getContentRecommendations } from "../api/recommendationApi";

function RecommendationCarousel({ title }) {

  const [anime, setAnime] = useState([]);

  useEffect(() => {

    const loadRecommendations = async () => {

      try {

        const data = await getContentRecommendations(title);

        setAnime(data);

      } catch (err) {

        console.error(err);

      }

    };

    loadRecommendations();

  }, [title]);

  if (anime.length === 0) return null;

  return (

    <div className="mt-16">

      <h2 className="text-3xl font-black mb-8">

        💡 You May Also Like

      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4">

        {anime.map((item) => (

          <Link
            key={item.anime.anime_id}
            to={`/anime/${item.anime.anime_id}`}
            className="min-w-[220px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-cyan-500 transition hover:-translate-y-2"
          >

            {item.anime.poster ? (

              <img
                src={item.anime.poster}
                alt={item.anime.title}
                className="w-full h-72 object-cover"
              />

            ) : (

              <div className="w-full h-72 flex items-center justify-center bg-slate-800 text-6xl">
                🎬
              </div>

            )}

            <div className="p-5">

              <h3 className="font-bold line-clamp-2">

                {item.anime.title}

              </h3>

              <div className="flex items-center justify-between mt-4">

                <span className="flex items-center gap-2 text-yellow-400">

                  <FaStar />

                  {item.anime.rating}

                </span>

                <span className="text-cyan-400 text-sm">

                  {Math.round(item.similarity * 100)}%

                </span>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </div>

  );

}

export default RecommendationCarousel;