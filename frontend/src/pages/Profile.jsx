import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaBookmark,
  FaStar,
  FaComment,
  FaUserCircle,
} from "react-icons/fa";

import { getProfile } from "../api/profileApi";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);

        // User not logged in or request failed
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-3xl">
        Loading Profile...
      </div>
    );
  }

  // User not logged in
  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="max-w-xl w-full rounded-3xl bg-slate-900 border border-slate-800 p-12 text-center">

          <FaUserCircle className="mx-auto text-7xl text-cyan-400 mb-6" />

          <h1 className="text-4xl font-black">
            You're not logged in
          </h1>

          <p className="mt-5 text-gray-400">
            Login to view your profile, ratings,
            favorites and watchlist.
          </p>

          <div className="mt-10 flex justify-center gap-5">

            <Link to="/login">
              <button className="rounded-xl bg-cyan-500 px-8 py-3 font-bold hover:bg-cyan-400 transition">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="rounded-xl border border-cyan-500 px-8 py-3 font-bold hover:bg-cyan-500 transition">
                Register
              </button>
            </Link>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-8 py-12">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="bg-slate-900 rounded-3xl p-10 mb-10">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-cyan-500 flex items-center justify-center text-4xl font-black">

              {profile.username.charAt(0).toUpperCase()}

            </div>

            <div>

              <h1 className="text-5xl font-black">

                {profile.username}

              </h1>

              <p className="text-gray-400 mt-2">

                {profile.email}

              </p>

            </div>

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <StatCard
            icon={<FaHeart />}
            title="Favorites"
            value={profile.favorites}
            color="text-red-400"
          />

          <StatCard
            icon={<FaBookmark />}
            title="Watchlist"
            value={profile.watchlist}
            color="text-cyan-400"
          />

          <StatCard
            icon={<FaStar />}
            title="Ratings"
            value={profile.ratings}
            color="text-yellow-400"
          />

          <StatCard
            icon={<FaComment />}
            title="Reviews"
            value={profile.reviews}
            color="text-green-400"
          />

        </div>

      </div>

    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 text-center hover:scale-105 transition">

      <div className={`text-4xl mb-4 ${color}`}>
        {icon}
      </div>

      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <p className="text-5xl font-black mt-4">
        {value}
      </p>

    </div>
  );
}

export default Profile;