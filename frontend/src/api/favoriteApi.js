import api from "./api";

export const addFavorite = async (animeId) => {
  const response = await api.post(`/favorites/${animeId}`);
  return response.data;
};

export const removeFavorite = async (animeId) => {
  const response = await api.delete(`/favorites/${animeId}`);
  return response.data;
};

export const getFavorites = async () => {
  const response = await api.get("/favorites/");
  return response.data;
};

export const checkFavorite = async (animeId) => {
  const response = await api.get(`/favorites/check/${animeId}`);
  return response.data;
};