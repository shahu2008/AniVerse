import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

import {
  rateAnime,
  getUserRating,
} from "../api/ratingApi";

function RatingStars({ animeId }) {

  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadRating = async () => {

      try {

        const data = await getUserRating(animeId);

        if (data) {
          setRating(data.rating);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

    };

    loadRating();

  }, [animeId]);

  const handleRating = async (value) => {

    try {

      await rateAnime(animeId, value);

      setRating(value);

    } catch (err) {

      console.error(err);

    }

  };

  if (loading) return null;

  return (

    <div className="flex items-center gap-2">

      {[1, 2, 3, 4, 5].map((star) => (

        <FaStar
          key={star}
          size={28}
          onClick={() => handleRating(star)}
          className={`cursor-pointer transition ${
            star <= rating
              ? "text-yellow-400"
              : "text-gray-500 hover:text-yellow-300"
          }`}
        />

      ))}

      <span className="ml-3 text-gray-300">

        {rating > 0 ? `${rating}/5` : "Not Rated"}

      </span>

    </div>

  );

}

export default RatingStars;