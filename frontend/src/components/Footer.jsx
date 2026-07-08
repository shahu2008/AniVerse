import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-800 bg-gradient-to-b from-slate-950 to-black">

      <div className="mx-auto max-w-7xl px-8 py-14">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Logo & Description */}

          <div>

            <h2 className="text-4xl font-black">

              <span className="text-white">Ani</span>

              <span className="text-cyan-400">Verse</span>

            </h2>

            <p className="mt-5 max-w-sm leading-7 text-gray-400">

              Discover your next favorite anime with
              intelligent AI-powered recommendations,
              personalized watchlists, ratings, and reviews.

            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-5 text-xl font-bold text-white">

              Quick Links

            </h3>

            <div className="flex flex-col gap-4">

              <Link
                to="/"
                className="text-gray-400 transition hover:text-cyan-400"
              >
                Home
              </Link>

              <Link
                to="/recommendation"
                className="text-gray-400 transition hover:text-cyan-400"
              >
                AI Recommendations
              </Link>

              <Link
                to="/favorites"
                className="text-gray-400 transition hover:text-cyan-400"
              >
                Favorites
              </Link>

              <Link
                to="/watchlist"
                className="text-gray-400 transition hover:text-cyan-400"
              >
                Watchlist
              </Link>

              <Link
                to="/profile"
                className="text-gray-400 transition hover:text-cyan-400"
              >
                Profile
              </Link>

            </div>

          </div>

          {/* Social */}

          <div>

            <h3 className="mb-5 text-xl font-bold text-white">

              Connect

            </h3>

            <div className="flex gap-5">

              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 transition hover:bg-cyan-500">

                <FaGithub size={22} />

              </button>

              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 transition hover:bg-cyan-500">

                <FaLinkedin size={22} />

              </button>

            </div>

            <p className="mt-6 text-sm leading-6 text-gray-500">

              Built using React, FastAPI,
              PostgreSQL and Machine Learning.

            </p>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-14 border-t border-slate-800 pt-8 text-center text-gray-500">

          <p>

            Made with{" "}

            <FaHeart className="mx-1 inline text-red-500" />

            by <span className="font-semibold text-cyan-400">AniVerse</span>

          </p>

          <p className="mt-3 text-sm">

            © 2026 AniVerse. All Rights Reserved.

          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;