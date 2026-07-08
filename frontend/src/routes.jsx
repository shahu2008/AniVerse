import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Recommendation from "./pages/Recommendation";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import Profile from "./pages/Profile";
import AnimeDetails from "./pages/AnimeDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/home" element={<Home />} />

      <Route path="/search" element={<Search />} />

      <Route path="/anime/:id" element={<AnimeDetails />} />

      <Route path="/recommendation" element={<Recommendation />} />

      <Route path="/favorites" element={<Favorites />} />

      <Route path="/watchlist" element={<Watchlist />} />

      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default AppRoutes;