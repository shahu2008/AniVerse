import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";

function FavoriteButton({ animeId }) {

  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const favorite = isFavorite(animeId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleFavorite(animeId);
      }}
      className={`flex justify-center items-center gap-2 py-2 rounded-xl transition w-full ${
        favorite
          ? "bg-red-600 hover:bg-red-700"
          : "bg-red-500 hover:bg-red-600"
      }`}
    >
      <FaHeart />

      {favorite ? "Favorited" : "Favorite"}

    </button>
  );
}

export default FavoriteButton;