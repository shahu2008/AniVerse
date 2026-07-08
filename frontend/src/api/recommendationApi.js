import api from "./api";

/* Content-Based Recommendation */
export const getContentRecommendations = async (title) => {

  const response = await api.get(
    `/recommend/content/${encodeURIComponent(title)}`
  );

  return response.data;
};

/* Hybrid Recommendation */
export const getHybridRecommendations = async (
  animeTitle,
  userId
) => {

  const response = await api.get(
    `/recommend/hybrid?anime_title=${encodeURIComponent(
      animeTitle
    )}&user_id=${userId}`
  );

  return response.data;
};

/* Popular Recommendation */
export const getPopularRecommendations = async () => {

  const response = await api.get(
    "/recommend/popular"
  );

  return response.data;
};