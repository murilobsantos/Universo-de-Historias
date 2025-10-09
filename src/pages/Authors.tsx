import React from "react";
import AuthorRegistration from "../components/AuthorRegistration";
import AuthorLogin from "../components/AuthorLogin";
import UploadStory from "../components/UploadStory";
import useAuthors from "../hooks/useAuthors";
import useStories from "../hooks/useStories";
import StoryCard from "../components/StoryCard";
import { Link, useNavigate } from "react-router-dom";

function Authors() {
  const { authors, currentAuthor, logout } = useAuthors();
  const { stories, deleteStory } = useStories();
  const navigate = useNavigate();

  const authorStories = stories.filter(story => story.author === currentAuthor?.name);

  return (
    <main className="flex flex-col items-center justify-center py-10 px-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Authors Section</h2>
      {currentAuthor ? (
        <div className="w-full max-w-4xl space-y-6">
          <p className="text-center">Welcome, {currentAuthor.name}!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <UploadStory />
              <div className="mt-4">
                <Link
                  to="/nova"
                  className="block w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-center"
                >
                  Criar Nova História
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suas Histórias</h3>
              {authorStories.length > 0 ? (
                <div className="space-y-4">
                  {authorStories.map(story => (
                    <div key={story.id} className="relative group">
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
                            if (window.confirm(`Tem certeza que deseja excluir a história "${story.title}"? Esta ação não pode ser desfeita.`)) {
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
                <p className="text-gray-600 dark:text-gray-300">Você ainda não publicou nenhuma história.</p>
              )}
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md space-y-6">
          <AuthorLogin />
          <AuthorRegistration />
        </div>
      )}

      {/* Meet the Authors Section */}
      <section className="mt-12 w-full max-w-4xl">
        <h3 className="text-xl font-semibold mb-6 text-center">Conheça os Autores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <a
              key={author.id}
              onClick={(e) => {
                e.preventDefault();
                // Navigate to author profile page
                window.history.pushState(null, "", `/authors/${author.id}`);
                window.dispatchEvent(new PopStateEvent("popstate"));
              }}
              href={`/authors/${author.id}`}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl text-white">
                {author.name.charAt(0)}
              </div>
              <h4 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">{author.name}</h4>
              <p className="text-gray-600 dark:text-gray-300">{author.bio}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Authors;
