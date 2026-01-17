import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const redirect =
    new URLSearchParams(location.search).get("redirect") || "/";
  
  useEffect(() => {
    if (user) {
      navigate(redirect, { replace: true });
    }
  }, [user, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);   
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-8 rounded-lg border border-gray-300 shadow-sm"
    >
      <div className="flex justify-center mb-6">
        <h2 className="text-xl font-medium">CarbonNex</h2>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">
        Welcome Back!
      </h2>

      <p className="text-center mb-6 text-gray-600">
        Login to access your account and continue
      </p>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your Email"
          required
        />
      </div>

      {/* Password */}
      <div className="mb-4 relative">
        <label className="block text-sm font-semibold mb-2">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded pr-10"
          placeholder="Enter your Password"
          minLength={4}
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] cursor-pointer text-gray-600 hover:text-gray-800"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={22} />
          ) : (
            <AiOutlineEye size={22} />
          )}
        </span>
      </div>

      {/* Error */}
      {error && (
        <p className="text-center text-md text-red-500 mb-4">
          {error}
        </p>
      )}

      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="block text-sm font-semibold mb-2 text-blue-500 hover:text-blue-700 hover:underline transition"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <p className="mt-6 text-center text-sm">
        Don't have an account? {" "}
        <Link
          to={`/register?redirect=${encodeURIComponent(redirect)}`}
          className="text-blue-500"
        >
          Register Now
        </Link>
      </p>
    </form>
  </div>
  );
};

export default Login;
