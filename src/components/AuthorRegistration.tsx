import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthors from "../hooks/useAuthors";

function AuthorRegistration() {
  const { createAuthor } = useAuthors();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAuthor(name, bio, avatarUrl);
    setMessage("Registration successful!");
    setName("");
    setBio("");
    setAvatarUrl("");
    navigate("/home");
  };

  return (
    <div className="bg-cosmic-dark/70 backdrop-blur-xs p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-white">Register as Author</h3>
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
          type="url"
          placeholder="Avatar URL (optional)"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="w-full p-2 border border-cosmic-purple rounded bg-cosmic-dark text-white placeholder-cosmic-purple focus:outline-none focus:ring-2 focus:ring-primary"
          autoComplete="url"
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
          className="w-full bg-gradient-to-r from-primary to-secondary text-white p-2 rounded hover:brightness-110 transition"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-center text-white">{message}</p>}
    </div>
  );
}

export default AuthorRegistration;
