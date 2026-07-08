import api from "./api";

export const addReview = async (animeId, review) => {
  const response = await api.post(
    `/reviews/${animeId}?review_text=${encodeURIComponent(review)}`
  );

  return response.data;
};

export const getAnimeReviews = async (animeId) => {
  const response = await api.get(
    `/reviews/anime/${animeId}`
  );

  return response.data;
};

export const deleteReview = async (reviewId) => {
  const response = await api.delete(
    `/reviews/${reviewId}`
  );

  return response.data;
};