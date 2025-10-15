import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ReaderRegistration() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await register(name, email, password, 'reader');

      if (result.success && result.user) {
        setMessage("Registration successful!");
        // Clear form
        setName("");
        setEmail("");
        setPassword("");
        setBio("");
        // Redirect to reader profile
        navigate(`/profile/reader/${result.user.id}`);
      } else {
        setMessage(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cosmic-dark/70 backdrop-blur-xs p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-white">Register as Reader</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-cosmic-purple rounded bg-cosmic-dark text-white placeholder-cosmic-purple focus:outline-none focus:ring-2 focus:ring-primary"
          required
          autoComplete="name"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-cosmic-purple rounded bg-cosmic-dark text-white placeholder-cosmic-purple focus:outline-none focus:ring-2 focus:ring-primary"
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-cosmic-purple rounded bg-cosmic-dark text-white placeholder-cosmic-purple focus:outline-none focus:ring-2 focus:ring-primary"
          required
          autoComplete="new-password"
        />
        <textarea
          placeholder="Bio (optional)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 border border-cosmic-purple rounded bg-cosmic-dark text-white placeholder-cosmic-purple focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          rows={3}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white p-2 rounded hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Registrando..." : "Register"}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-white">{message}</p>}
    </div>
  );
}

export default ReaderRegistration;
