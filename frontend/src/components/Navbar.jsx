import { Link, NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-2xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-4xl font-black tracking-wide"
        >
          <span className="text-white">Ani</span>

          <span className="text-cyan-400">Verse</span>
        </Link>

        {/* Navigation */}

        <div className="hidden items-center gap-8 md:flex">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition font-semibold ${
                isActive
                  ? "text-cyan-400"
                  : "text-gray-300 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/recommendation"
            className={({ isActive }) =>
              `transition font-semibold ${
                isActive
                  ? "text-cyan-400"
                  : "text-gray-300 hover:text-white"
              }`
            }
          >
            AI Picks
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `transition font-semibold ${
                isActive
                  ? "text-cyan-400"
                  : "text-gray-300 hover:text-white"
              }`
            }
          >
            Favorites
          </NavLink>

          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `transition font-semibold ${
                isActive
                  ? "text-cyan-400"
                  : "text-gray-300 hover:text-white"
              }`
            }
          >
            Watchlist
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `transition font-semibold ${
                isActive
                  ? "text-cyan-400"
                  : "text-gray-300 hover:text-white"
              }`
            }
          >
            Profile
          </NavLink>

        </div>

        {/* Search Icon */}

        <button
          className="rounded-full bg-slate-800 p-3 transition hover:bg-cyan-500"
        >
          <FaSearch className="text-white" />
        </button>

      </div>

    </nav>
  );
}

export default Navbar;