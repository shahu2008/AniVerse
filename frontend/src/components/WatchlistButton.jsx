import { BsBookmarkPlusFill } from "react-icons/bs";
import { useWatchlist } from "../context/WatchlistContext";

function WatchlistButton({ animeId }) {

  const {
    isWatchlisted,
    toggleWatchlist,
  } = useWatchlist();

  const watchlisted = isWatchlisted(animeId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleWatchlist(animeId);
      }}
      className={`flex justify-center items-center gap-2 py-2 rounded-xl transition w-full ${
        watchlisted
          ? "bg-cyan-700 hover:bg-cyan-800"
          : "bg-cyan-500 hover:bg-cyan-600"
      }`}
    >
      <BsBookmarkPlusFill />
      {watchlisted ? "Watchlisted" : "Watchlist"}
    </button>
  );
}

export default WatchlistButton;