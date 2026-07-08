import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../api/favoriteApi";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {

    loadFavorites();

  }, []);

  const loadFavorites = async () => {

    try {

      const data = await getFavorites();

      setFavorites(data);

    } catch (err) {

      console.error(err);

    }

  };

  const isFavorite = (animeId) => {

    return favorites.some(
      (anime) => anime.anime_id === animeId
    );

  };

  const toggleFavorite = async (animeId) => {

    try {

      if (isFavorite(animeId)) {

        await removeFavorite(animeId);

        setFavorites((prev) =>
          prev.filter(
            (anime) => anime.anime_id !== animeId
          )
        );

        toast.success("💔 Removed from Favorites");

      } else {

        await addFavorite(animeId);

        await loadFavorites();

        toast.success("❤️ Added to Favorites");

      }

    } catch (err) {

      console.error(err);

      toast.error("Something went wrong.");

    }

  };

  return (

    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        loadFavorites,
      }}
    >

      {children}

    </FavoritesContext.Provider>

  );

}

export function useFavorites() {

  return useContext(FavoritesContext);

}