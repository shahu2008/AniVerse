import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

 const handleLogin = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    await loginUser(email, password);

    navigate("/home");

  } catch (err) {
    console.error(err);

    setError(
      err.response?.data?.detail || "Login Failed"
    );

  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 flex justify-center items-center px-6">

      {/* Background Glow */}

      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[180px] rounded-full left-0 top-0"></div>

      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[180px] rounded-full right-0 bottom-0"></div>

      {/* Login Card */}

      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
      >

        <h1 className="text-4xl font-black text-center mb-2">
          AniVerse
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Welcome Back
        </p>

        {error && (

          <div className="bg-red-500/20 text-red-300 p-3 rounded-xl mb-5">

            {error}

          </div>

        )}

        {/* Email */}

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-slate-900 p-4 rounded-xl outline-none mb-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-slate-900 p-4 rounded-xl outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-5 top-5"
          >

            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}

          </button>

        </div>

        {/* Login */}

        <button
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 rounded-xl py-4 mt-8 font-bold transition"
        >

          {loading ? "Logging in..." : "Login"}

        </button>

        <p className="text-center mt-8 text-gray-400">

          Don't have an account?

          <Link
            to="/register"
            className="text-cyan-400 ml-2"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;