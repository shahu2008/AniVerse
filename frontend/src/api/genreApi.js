import api from "./api";

export const getGenres = async () => {
    const response = await api.get("/genres");
    return response.data;
};

export const getAnimeByGenre = async (genre) => {
    const response = await api.get(`/genres/${genre}/anime`);
    return response.data;
};