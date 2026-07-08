import api from "./api";

export const rateAnime = async (animeId, rating) => {
  const response = await api.post(
    `/ratings/${animeId}?rating=${rating}`
  );

  return response.data;
};

export const getUserRating = async (animeId) => {
  const response = await api.get(
    `/ratings/${animeId}`
  );

  return response.data;
};