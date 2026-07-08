import api from "./api";

export const addWatchlist = async (animeId) => {
  const response = await api.post(`/watchlist/${animeId}`);
  return response.data;
};

export const removeWatchlist = async (animeId) => {
  const response = await api.delete(`/watchlist/${animeId}`);
  return response.data;
};

export const getWatchlist = async () => {
  const response = await api.get("/watchlist/");
  return response.data;
};

export const checkWatchlist = async (animeId) => {
  const response = await api.get(`/watchlist/check/${animeId}`);
  return response.data;
};