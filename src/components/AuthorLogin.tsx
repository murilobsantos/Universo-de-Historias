import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AuthorLogin() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const success = await login(email.trim(), password.trim());

      if (success && user) {
        setMessage("Login successful!");
        setEmail("");
        setPassword("");
        // Redirect based on user role
        if (user.role === 'author') {
          navigate(`/profile/author/${user.id}`);
        } else {
          navigate(`/profile/reader/${user.id}`);
        }
      } else {
        setMessage("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-md border border-white/20">
      <h3 className="text-xl font-semibold mb-4 text-white">Login as Author</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-white/30 rounded bg-white/10 text-white placeholder-white/70 backdrop-blur-sm"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-white/30 rounded bg-white/10 text-white placeholder-white/70 backdrop-blur-sm"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white p-2 rounded hover:brightness-110 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Entrando..." : "Login"}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-white">{message}</p>}
    </div>
  );
}

export default AuthorLogin;
