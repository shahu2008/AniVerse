import { useEffect, useState } from "react";

import {
  addReview,
  getAnimeReviews,
  deleteReview,
} from "../api/reviewApi";

function ReviewSection({ animeId }) {

  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {

    try {

      const data = await getAnimeReviews(animeId);

      setReviews(data);

    } catch (err) {

      console.error(err);

    }

  };

  useEffect(() => {

    loadReviews();

  }, [animeId]);

  const submitReview = async () => {

    if (!review.trim()) return;

    try {

      await addReview(animeId, review);

      setReview("");

      loadReviews();

    } catch (err) {

      console.error(err);

    }

  };

  const handleDelete = async (reviewId) => {

    try {

      await deleteReview(reviewId);

      loadReviews();

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div className="mt-16">

      <h2 className="text-3xl font-black mb-8">

        Community Reviews

      </h2>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={5}
        placeholder="Share your thoughts..."
        className="w-full bg-slate-900 rounded-2xl p-5 border border-slate-700 outline-none resize-none"
      />

      <button
        onClick={submitReview}
        className="mt-5 bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl font-bold transition"
      >
        Submit Review
      </button>

      <div className="space-y-6 mt-10">

        {reviews.length === 0 ? (

          <div className="text-center py-10 text-gray-400">

            No reviews yet. Be the first to review this anime!

          </div>

        ) : (

          reviews.map((item) => (

            <div
              key={item.review_id}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
            >

              <div className="flex justify-between items-center">

                <h3 className="font-bold text-cyan-400 text-lg">

                  {item.username}

                </h3>

                <button
                  onClick={() => handleDelete(item.review_id)}
                  className="text-red-400 hover:text-red-500 text-sm font-semibold transition"
                >
                  Delete
                </button>

              </div>

              <p className="text-gray-300 mt-4 leading-7">

                {item.review}

              </p>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default ReviewSection;