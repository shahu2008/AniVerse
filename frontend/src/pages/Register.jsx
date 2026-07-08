import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration Successful!");

      navigate("/login");

    } catch (err) {
      setError(
        err.response?.data?.detail || "Registration Failed"
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

      <form
        onSubmit={handleRegister}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
      >

        <h1 className="text-4xl font-black text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Join AniVerse
        </p>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded-xl mb-5">
            {error}
          </div>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full bg-slate-900 p-4 rounded-xl outline-none mb-4"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full bg-slate-900 p-4 rounded-xl outline-none mb-4"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="relative mb-4">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full bg-slate-900 p-4 rounded-xl outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full bg-slate-900 p-4 rounded-xl outline-none mb-6"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 rounded-xl py-4 font-bold transition"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center mt-8 text-gray-400">
          Already have an account?
          <Link
            to="/login"
            className="text-cyan-400 ml-2"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;