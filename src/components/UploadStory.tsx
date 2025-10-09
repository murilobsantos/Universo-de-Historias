import React, { useState } from "react";
import useStories from "../hooks/useStories";
import useAuthors from "../hooks/useAuthors";
import { Chapter } from "../types/story";

function UploadStory() {
  const { addStory } = useStories();
  const { currentAuthor } = useAuthors();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [genres, setGenres] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateDescription = async () => {
    if (!title) return;
    setLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: `Write a short description for a story titled "${title}".` }],
          max_tokens: 100,
        }),
      });
      const data = await response.json();
      setDescription(data.choices[0].message.content.trim());
    } catch (error) {
      setMessage("Error generating description.");
    }
    setLoading(false);
  };

  const addChapter = async () => {
    if (!title || !description) return;
    setLoading(true);
    try {
      // Generate title
      const titleResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: `Suggest a title for chapter ${chapters.length + 1} of the story "${title}" with description "${description}".` }],
          max_tokens: 20,
        }),
      });
      const titleData = await titleResponse.json();
      const chapterTitle = titleData.choices[0].message.content.trim();

      // Generate content
      const contentResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: `Write a chapter for the story "${title}" with description "${description}". Chapter title: "${chapterTitle}". Make it engaging, at least 160 words.` }],
          max_tokens: 1500,
        }),
      });
      const contentData = await contentResponse.json();
      const chapterContent = contentData.choices[0].message.content.trim();

      const newChapter: Chapter = {
        id: chapters.length + 1,
        title: chapterTitle,
        content: chapterContent,
        comments: [],
      };
      setChapters(prev => [...prev, newChapter]);
    } catch (error) {
      setMessage("Error generating chapter.");
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAuthor) {
      setMessage("You must be logged in to upload a story.");
      return;
    }
    const genresArray = genres.split(',').map(g => g.trim()).filter(g => g);
    addStory(title, description, image, currentAuthor.name, chapters, genresArray);
    setMessage("Story uploaded successfully!");
    setTitle("");
    setDescription("");
    setImage("");
    setChapters([]);
    setGenres("");
  };

  if (!currentAuthor) {
    return <p className="text-center text-gray-900 dark:text-gray-100">Please login to upload stories.</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Upload New Story</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
        <div className="flex space-x-2">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows={4}
            required
          />
          <button type="button" onClick={generateDescription} disabled={loading} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Gerar Descrição
          </button>
        </div>
        <input
          type="url"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
        <div>
          <button type="button" onClick={addChapter} disabled={loading} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Adicionar Capítulo com IA
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Capítulos: {chapters.length}</p>
        </div>
        <input
          type="text"
          placeholder="Genres (comma separated)"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
        <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700">
          Upload Story
        </button>
      </form>
      {message && <p className="mt-4 text-center text-gray-900 dark:text-gray-100">{message}</p>}
      {loading && <p className="mt-4 text-center text-gray-900 dark:text-gray-100">Gerando...</p>}
    </div>
  );
}

export default UploadStory;
