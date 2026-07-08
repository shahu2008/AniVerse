import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getWatchlist,
  addWatchlist,
  removeWatchlist,
} from "../api/watchlistApi";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {

  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {

    try {

      const data = await getWatchlist();

      setWatchlist(data);

    } catch (err) {

      console.error(err);

    }

  };

  const isWatchlisted = (animeId) => {

    return watchlist.some(
      (anime) => anime.anime_id === animeId
    );

  };

  const toggleWatchlist = async (animeId) => {

    try {

      if (isWatchlisted(animeId)) {

        await removeWatchlist(animeId);

        setWatchlist((prev) =>
          prev.filter(
            (anime) => anime.anime_id !== animeId
          )
        );

        toast.success("🗑 Removed from Watchlist");

      } else {

        await addWatchlist(animeId);

        await loadWatchlist();

        toast.success("📑 Added to Watchlist");

      }

    } catch (err) {

      console.error(err);

      toast.error("Something went wrong.");

    }

  };

  return (

    <WatchlistContext.Provider
      value={{
        watchlist,
        isWatchlisted,
        toggleWatchlist,
        loadWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>

  );

}

export function useWatchlist() {

  return useContext(WatchlistContext);

}