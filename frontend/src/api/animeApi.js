import api from "./api";

export const getTopAnime = async (limit = 24) => {
  const response = await api.get(`/anime/top?limit=${limit}`);
  return response.data;
};
export const searchAnime = async (query) => {
  const response = await api.get(`/anime/search?query=${query}`);
  return response.data;
};

export const getAnime = async (limit = 20) => {
  const response = await api.get(`/anime?limit=${limit}`);
  return response.data;
};
export const getAnimeDetails = async (id) => {
    const response = await api.get(`/anime/${id}/details`);
    return response.data;
};
export const getFeaturedAnime = async () => {
  const res = await api.get("/anime/featured");
  return res.data;
};
export const getAllAnime = async () => {

  const response = await api.get("/anime");

  return response.data;

};

export const getMovieAnime = async () => {

  const response = await api.get("/anime");

  return response.data.filter(
    (anime) => anime.type === "Movie"
  );

};

export const getTVAnime = async () => {

  const response = await api.get("/anime");

  return response.data.filter(
    (anime) => anime.type === "TV"
  );

};