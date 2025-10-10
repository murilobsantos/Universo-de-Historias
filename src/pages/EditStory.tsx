import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import storyService from "../services/storyService";
import { Story, Chapter } from "../types/story";

const AVAILABLE_GENRES = ["Fantasia", "Aventura", "Ficção Científica", "Suspense", "Mistério", "Romance", "Terror", "Drama"];

function EditStory() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newChapterContent, setNewChapterContent] = useState("");

  useEffect(() => {
    if (!id) return;
    const storyId = Number(id);
    const stories = storyService.getLocalStories();
    const foundStory = stories.find(s => s.id === storyId) || null;
    setStory(foundStory);
  }, [id]);

  const handleChange = (field: keyof Story, value: any) => {
    if (!story) return;
    setStory({ ...story, [field]: value });
  };

  const handleGenreChange = (genre: string) => {
    if (!story) return;
    const genres = story.genres || [];
    const newGenres = genres.includes(genre)
      ? genres.filter(g => g !== genre)
      : [...genres, genre];
    setStory({ ...story, genres: newGenres });
  };

  const handleTagChange = (tags: string[]) => {
    if (!story) return;
    setStory({ ...story, tags });
  };

  const addChapter = () => {
    if (!story || !newChapterContent.trim()) return;
    const newChapter: Chapter = {
      id: (story.chapters?.length || 0) + 1,
      title: newChapterTitle.trim() || `Capítulo ${(story.chapters?.length || 0) + 1}`,
      content: newChapterContent.trim()
    };
    const updatedChapters = [...(story.chapters || []), newChapter];
    setStory({ ...story, chapters: updatedChapters });
    setNewChapterTitle("");
    setNewChapterContent("");
  };

  const updateChapter = (index: number, field: keyof Chapter, value: any) => {
    if (!story || !story.chapters) return;
    const updatedChapters = [...story.chapters];
    updatedChapters[index] = { ...updatedChapters[index], [field]: value };
    setStory({ ...story, chapters: updatedChapters });
  };

  const removeChapter = (index: number) => {
    if (!story || !story.chapters) return;
    const updatedChapters = story.chapters.filter((_, i) => i !== index);
    setStory({ ...story, chapters: updatedChapters });
  };

  const handleSave = () => {
    if (!story) return;
    storyService.updateStory(story.id, story);
    navigate(`/story/${story.id}`);
  };

  const handleDelete = () => {
    if (!story) return;
    if (window.confirm("Tem certeza que deseja excluir esta história?")) {
      storyService.deleteStory(story.id);
      navigate("/");
    }
  };

  if (!story) {
    return <div className="p-8 max-w-4xl mx-auto">História não encontrada.</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Editar História</h1>
      <div className="space-y-6">
        <div>
          <label className="block mb-1 font-semibold">Título</label>
          <input
            type="text"
            value={story.title}
            onChange={e => handleChange("title", e.target.value)}
            className="w-full p-2 rounded bg-gray-900 text-white"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Descrição</label>
          <textarea
            value={story.description}
            onChange={e => handleChange("description", e.target.value)}
            className="w-full p-2 rounded bg-gray-900 text-white"
            rows={4}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">URL da Capa</label>
          <input
            type="text"
            value={story.image || ""}
            onChange={e => handleChange("image", e.target.value)}
            className="w-full p-2 rounded bg-gray-900 text-white"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Gêneros</label>
          <div className="grid grid-cols-2 gap-2">
            {AVAILABLE_GENRES.map(genre => (
              <label key={genre} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(story.genres || []).includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                  className="mr-2"
                />
                {genre}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Tags (separados por vírgula)</label>
          <input
            type="text"
            value={(story.tags || []).join(", ")}
            onChange={e => handleTagChange(e.target.value.split(",").map(s => s.trim()))}
            className="w-full p-2 rounded bg-gray-900 text-white"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Capítulos</h2>
          {(story.chapters || []).map((chapter, index) => (
            <div key={index} className="mb-4 border p-4 rounded bg-gray-800">
              <input
                type="text"
                placeholder="Título do capítulo"
                value={chapter.title}
                onChange={e => updateChapter(index, "title", e.target.value)}
                className="w-full p-2 rounded mb-2 bg-gray-900 text-white"
              />
              <textarea
                placeholder="Conteúdo do capítulo"
                value={chapter.content}
                onChange={e => updateChapter(index, "content", e.target.value)}
                className="w-full p-2 rounded bg-gray-900 text-white"
                rows={6}
              />
              <button
                type="button"
                onClick={() => removeChapter(index)}
                className="mt-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                Remover Capítulo
              </button>
            </div>
          ))}
          <div className="mb-4 border p-4 rounded bg-gray-800">
            <h3 className="text-lg font-semibold mb-2">Adicionar Novo Capítulo</h3>
            <input
              type="text"
              placeholder="Título do capítulo"
              value={newChapterTitle}
              onChange={e => setNewChapterTitle(e.target.value)}
              className="w-full p-2 rounded mb-2 bg-gray-900 text-white"
            />
            <textarea
              placeholder="Conteúdo do capítulo"
              value={newChapterContent}
              onChange={e => setNewChapterContent(e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white"
              rows={6}
            />
            <button
              type="button"
              onClick={addChapter}
              className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Adicionar Capítulo
            </button>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-green-600 rounded hover:bg-green-700 font-semibold"
          >
            Salvar Alterações
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-red-600 rounded hover:bg-red-700 font-semibold"
          >
            Excluir História
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditStory;
