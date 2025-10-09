import React, { useState } from "react";
import AuthorLogin from "../components/AuthorLogin";
import AuthorRegistration from "../components/AuthorRegistration";
import ReaderLogin from "../components/ReaderLogin";
import ReaderRegistration from "../components/ReaderRegistration";
import useAuthors from "../hooks/useAuthors";
import useStories from "../hooks/useStories";
import StoryCard from "../components/StoryCard";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'author' | 'reader'>('author');
  const { currentAuthor, logout } = useAuthors();
  const { stories, deleteStory } = useStories();
  const navigate = useNavigate();

  const authorStories = stories.filter(story => story.author === currentAuthor?.name);

  const toggleView = () => {
    setIsLogin(!isLogin);
  };

  if (currentAuthor) {
    // Author Dashboard
    return (
      <div className="min-h-screen bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white p-4">
        <div className="max-w-4xl mx-auto py-10">
          <h2 className="text-2xl font-semibold mb-6">Author Dashboard</h2>
          <p className="text-center mb-6">Welcome, {currentAuthor.name}!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Link
                to="/nova"
                className="block w-full bg-gradient-to-r from-primary to-secondary text-white p-3 rounded hover:brightness-110 transition text-center font-semibold"
              >
                Create New Story
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Your Stories</h3>
              {authorStories.length > 0 ? (
                <div className="space-y-4">
                  {authorStories.map(story => (
                    <div key={story.id} className="relative group bg-cosmic-dark/50 p-4 rounded-lg">
                      <StoryCard
                        id={story.id}
                        title={story.title}
                        description={story.description}
                        image={story.image}
                        onClick={() => {}}
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                        <button
                          onClick={() => {
                            navigate(`/editar/${story.id}`);
                          }}
                          className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${story.title}"? This action cannot be undone.`)) {
                              deleteStory(story.id);
                            }
                          }}
                          className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-cosmic-purple">You haven't published any stories yet.</p>
              )}
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark flex flex-col items-center justify-center text-white p-4">
      <div className="bg-cosmic-dark/70 backdrop-blur-xs rounded-lg p-8 max-w-md w-full shadow-lg">
        {/* User Type Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setUserType('author')}
            className={`px-4 py-2 rounded-t-lg font-semibold transition ${
              userType === 'author' ? "bg-gradient-to-r from-primary to-secondary text-white" : "text-cosmic-purple"
            }`}
          >
            Author
          </button>
          <button
            onClick={() => setUserType('reader')}
            className={`px-4 py-2 rounded-t-lg font-semibold transition ${
              userType === 'reader' ? "bg-gradient-to-r from-primary to-secondary text-white" : "text-cosmic-purple"
            }`}
          >
            Reader
          </button>
        </div>

        {/* Login/Register Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-t-lg font-semibold transition ${
              isLogin ? "bg-gradient-to-r from-primary to-secondary text-white" : "text-cosmic-purple"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-t-lg font-semibold transition ${
              !isLogin ? "bg-gradient-to-r from-primary to-secondary text-white" : "text-cosmic-purple"
            }`}
          >
            Register
          </button>
        </div>

        {/* Forms */}
        {userType === 'author' ? (
          isLogin ? <AuthorLogin /> : <AuthorRegistration />
        ) : (
          isLogin ? <ReaderLogin /> : <ReaderRegistration />
        )}

        <div className="mt-4 text-center text-cosmic-purple">
          <button onClick={toggleView} className="underline hover:text-white transition">
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
