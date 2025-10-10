import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import storyService from "../services/storyService";
import useAuthors from "../hooks/useAuthors";
import { Story, Chapter } from "../types/story";

function UploadStory() {
  const { currentAuthor } = useAuthors();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [coverUrl, setCoverUrl] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: 1, title: "", content: "" },
  ]);
  const [message, setMessage] = useState("");

  const handleAddChapter = () => {
    const newId = Math.max(...chapters.map(c => c.id), 0) + 1;
    setChapters([...chapters, { id: newId, title: "", content: "" }]);
  };

  const handleChapterChange = (index: number, field: "title" | "content", value: string) => {
    const newChapters = [...chapters];
    newChapters[index] = { ...newChapters[index], [field]: value };
    setChapters(newChapters);
  };

  const removeChapter = (index: number) => {
    setChapters(chapters.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAuthor) {
      setMessage("Você deve estar logado para criar uma história.");
      return;
    }
    if (!title.trim() || !description.trim() || chapters.length === 0 || !chapters.every(c => c.content.trim())) {
      setMessage("Preencha todos os campos obrigatórios, incluindo conteúdo de todos os capítulos.");
      return;
    }
    const validChapters = chapters.filter(c => c.content.trim());
    const newStory: Story = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      image: coverUrl.trim() || "https://via.placeholder.com/400x200?text=Capa",
      author: currentAuthor.name,
      date: new Date().toISOString(),
      chapters: validChapters,
      genres,
      tags,
      ratings: { average: 0, count: 0 },
      comments: [],
      popularity: 0,
    };
    storyService.saveStory(newStory);
    setMessage("História criada com sucesso!");
    setTitle("");
    setDescription("");
    setGenres([]);
    setTags([]);
    setCoverUrl("");
    setChapters([{ id: 1, title: "", content: "" }]);
    setTimeout(() => navigate(`/story/${newStory.id}`), 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Nova História</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-semibold">Título</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-900 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Descrição</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-900 text-white"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Gêneros (separados por vírgula)</label>
          <input
            type="text"
            value={genres.join(", ")}
            onChange={e => setGenres(e.target.value.split(",").map(s => s.trim()))}
            className="w-full p-2 rounded bg-gray-900 text-white"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Tags (separados por vírgula)</label>
          <input
            type="text"
            value={tags.join(", ")}
            onChange={e => setTags(e.target.value.split(",").map(s => s.trim()))}
            className="w-full p-2 rounded bg-gray-900 text-white"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">URL da Capa</label>
          <input
            type="text"
            value={coverUrl}
            onChange={e => setCoverUrl(e.target.value)}
            className="w-full p-2 rounded bg-gray-900 text-white"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Capítulos</h2>
          {chapters.map((chapter, index) => (
            <div key={chapter.id} className="mb-4 border p-4 rounded bg-gray-800">
              <input
                type="text"
                placeholder="Título do capítulo"
                value={chapter.title}
                onChange={e => handleChapterChange(index, "title", e.target.value)}
                className="w-full p-2 rounded mb-2 bg-gray-900 text-white"
              />
              <textarea
                placeholder="Conteúdo do capítulo"
                value={chapter.content}
                onChange={e => handleChapterChange(index, "content", e.target.value)}
                className="w-full p-2 rounded bg-gray-900 text-white"
                rows={6}
                required
              />
              {chapters.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeChapter(index)}
                  className="mt-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white"
                >
                  Remover Capítulo
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddChapter}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
          >
            Adicionar Capítulo
          </button>
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 rounded hover:bg-green-700 font-semibold"
        >
          Salvar História
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </div>
  );
}

export default UploadStory;
