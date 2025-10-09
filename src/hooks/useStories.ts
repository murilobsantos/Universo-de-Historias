import { useEffect, useState } from "react";
import { mockStories } from "../data/stories";
import { Story, Chapter } from "../types/story";
import { getLocalStories, saveStory, updateStory, deleteStory } from "../services/storyService";

export default function useStories() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    // Carrega histórias mockadas
    let allStories = [...mockStories];

    // Carrega histórias locais criadas pelo usuário
    const localStories = getLocalStories();
    allStories = [...localStories, ...allStories]; // Locais primeiro, depois mockadas

    setStories(allStories);

    // Em paralelo, tenta buscar do backend (comentado por enquanto)
    /*
    fetch("http://localhost:4000/fanfics")
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao buscar fanfics");
        return res.json();
      })
      .then((data: Story[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setStories(data);
          localStorage.setItem("stories", JSON.stringify(data));
        }
      })
      .catch((err) => {
        console.warn("⚠️ Erro ao buscar fanfics do backend:", err);
      })
      .finally(() => setLoading(false));
    */
  }, []);

  function addStory(
    title: string,
    description: string,
    image: string,
    author: string,
    chapters: Chapter[],
    genres: string[],
    tags: string[] = []
  ) {
    const newStory: Story = {
      id: Date.now(),
      title,
      description,
      image,
      author,
      date: new Date().toISOString().split("T")[0],
      chapters,
      genres,
      tags,
      ratings: { average: 0, count: 0 },
      comments: [],
      popularity: 0,
    };

    // Salva no storyService (local-stories)
    saveStory(newStory);

    // Atualiza o estado local
    setStories((prev) => [newStory, ...prev]);
  }

  function updateStory(id: number, updatedStory: Partial<Story>) {
    // Atualiza no storyService
    updateStory(id, updatedStory);

    // Atualiza o estado local
    setStories((prev) =>
      prev.map((story) =>
        story.id === id ? { ...story, ...updatedStory } : story
      )
    );
  }

  function deleteStory(id: number) {
    // Remove do storyService
    deleteStory(id);

    // Atualiza o estado local
    setStories((prev) => prev.filter((story) => story.id !== id));
  }

  return { stories, addStory, updateStory, deleteStory };
}
