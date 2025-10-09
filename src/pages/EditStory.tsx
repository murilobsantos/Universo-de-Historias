import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStories from "../hooks/useStories";
import useAuthors from "../hooks/useAuthors";
import { Chapter } from "../types/story";

const AVAILABLE_GENRES = ["Fantasia", "Aventura", "Ficção Científica", "Suspense", "Mistério", "Romance", "Terror", "Drama"];

function EditStory() {
  const { id } = useParams<{ id: string }>();
  const { stories, updateStory } = useStories();
  const { currentAuthor } = useAuthors();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [content, setContent] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [message, setMessage] = useState("");

  // Load story data
  useEffect(() => {
    if (id) {
      const story = stories.find(s => s.id === parseInt(id));
      if (story) {
        setTitle(story.title);
        setDescription(story.description);
        setImage(story.image);
        setSelectedGenres(story.genres || []);
        setTags(story.tags || []);
        setChapters(story.chapters || []);
      }
    }
  }, [id, stories]);

  const addChapter = () => {
    if (!content.trim()) return;
    const newChapter: Chapter = {
      id: chapters.length + 1,
      title: chapterTitle.trim() || `Capítulo ${chapters.length + 1}`,
      content: content.trim(),
      comments: []
    };
    setChapters(prev => [...prev, newChapter]);
    setContent("");
    setChapterTitle("");
  };

  const removeChapter = (index: number) => {
    setChapters(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags(prev => [...prev, newTag]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAuthor) {
      setMessage("Você deve estar logado para editar uma história.");
      return;
    }
    if (!title || !description || chapters.length === 0) {
      setMessage("Preencha todos os campos obrigatórios.");
      return;
    }

    updateStory(parseInt(id!), {
      title,
      description,
      image: image || "https://via.placeholder.com/400x200?text=Capa",
      chapters,
      genres: selectedGenres,
      tags
    });

    setMessage("História atualizada com sucesso!");
    setTimeout(() => navigate("/authors"), 2000);
  };

  if (!currentAuthor) {
    return <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center">Faça login para editar histórias.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Editar História</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Título *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Descrição *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL da Capa</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Gêneros</label>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_GENRES.map(genre => (
                  <label key={genre} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                      className="mr-2"
                    />
                    {genre}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tags (separados por vírgula)</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Amor, Mistério, Viagem"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <div className="flex flex-wrap mt-2 gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-500 text-white px-3 py-1 rounded-full flex items-center space-x-2"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-white hover:text-gray-300"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Adicionar Novo Capítulo</label>
              <input
                type="text"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                placeholder="Título do capítulo (opcional)"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 mb-2"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                placeholder="Escreva o conteúdo do capítulo aqui..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <button
                type="button"
                onClick={addChapter}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Adicionar Capítulo
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Capítulos ({chapters.length})</h3>
              {chapters.length > 0 ? (
                <ul className="space-y-2">
                  {chapters.map((chapter, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded">
                      <span>{chapter.title}</span>
                      <button
                        type="button"
                        onClick={() => removeChapter(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Nenhum capítulo adicionado ainda.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 font-semibold"
            >
              Atualizar História
            </button>
          </form>
          {/* Preview Section */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-bold mb-4">Preview da História</h2>
            <div className="border border-gray-300 dark:border-gray-600 rounded overflow-hidden">
              <img
                src={image || "https://via.placeholder.com/400x200?text=Capa"}
                alt="Capa da História"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{title || "Título da História"}</h3>
                <p className="mb-2">{description || "Descrição da história aparecerá aqui."}</p>
                <div className="mb-2">
                  <strong>Gêneros:</strong>{" "}
                  {selectedGenres.length > 0 ? selectedGenres.join(", ") : "Nenhum gênero selecionado"}
                </div>
                <div className="mb-2">
                  <strong>Tags:</strong>{" "}
                  {tags.length > 0 ? tags.join(", ") : "Nenhuma tag adicionada"}
                </div>
                <div>
                  <strong>Capítulos:</strong> {chapters.length}
                </div>
              </div>
            </div>
          </div>
        </div>
        {message && <p className="mt-4 text-center text-gray-900 dark:text-gray-100">{message}</p>}
      </div>
    </div>
  );
}

export default EditStory;
