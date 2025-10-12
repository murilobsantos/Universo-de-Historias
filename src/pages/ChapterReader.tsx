import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStories from "../hooks/useStories";
import { useDarkMode } from "../contexts/DarkModeContext";
import { Story, Chapter } from "../types/story";
import interactionService from "../services/interactionService";

function ChapterReader() {
  const { id, chapterId } = useParams<{ id: string; chapterId: string }>();
  const navigate = useNavigate();
  const { stories } = useStories();
  const { isDarkMode } = useDarkMode();
  const [story, setStory] = useState<Story | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [newComment, setNewComment] = useState("");
  const [activeParagraph, setActiveParagraph] = useState<number | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [chapterComment, setChapterComment] = useState("");
  const [chapterRating, setChapterRating] = useState(0);
  const [visibleParagraphComments, setVisibleParagraphComments] = useState<Set<number>>(new Set());
  const [showChapterComments, setShowChapterComments] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(-1);

  useEffect(() => {
    if (!id || !chapterId) return;
    const storyId = Number(id);
    const chapId = Number(chapterId);
    const foundStory = stories.find(s => s.id === storyId) || null;
    setStory(foundStory);
    if (foundStory) {
      const foundChapter = foundStory.chapters.find(c => c.id === chapId) || null;
      setChapter(foundChapter);
      // Find current chapter index
      const chapterIndex = foundStory.chapters.findIndex(c => c.id === chapId);
      setCurrentChapterIndex(chapterIndex);
      // Save last read chapter
      localStorage.setItem(`last-read-chapter-${storyId}`, chapId.toString());
      // Mark chapter as read
      localStorage.setItem(`chapter-read-${storyId}-${chapId}`, 'true');
      // Load comments for this story
      const loadedComments = interactionService.getComments(storyId);
      setComments(loadedComments);
    }
  }, [id, chapterId, stories]);

  const handleAddComment = () => {
    if (!story || !chapter || activeParagraph === null || newComment.trim() === "") return;
    const storyIdNum = story.id;
    const paragraphIndex = activeParagraph;
    interactionService.addComment(storyIdNum, "User", newComment, paragraphIndex);
    setNewComment("");
    // Reload comments
    const loadedComments = interactionService.getComments(storyIdNum);
    setComments(loadedComments);
  };

  const toggleParagraphComments = (index: number) => {
    const newVisible = new Set(visibleParagraphComments);
    if (newVisible.has(index)) {
      newVisible.delete(index);
      if (activeParagraph === index) setActiveParagraph(null);
    } else {
      newVisible.add(index);
      setActiveParagraph(index);
    }
    setVisibleParagraphComments(newVisible);
  };

  if (!story || !chapter) {
    return <div className="p-8 max-w-4xl mx-auto">Capítulo não encontrado.</div>;
  }

  const paragraphs = chapter.content.split('\n').filter(p => p.trim());

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white' : 'bg-backgroundLight text-black'} p-4 md:p-8`}>
      <button
        onClick={() => navigate(`/story/${story.id}`)}
        className="mb-4 px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition-colors"
      >
        ← Voltar à História
      </button>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{story.title}</h1>
        <h2 className="text-2xl font-semibold mb-6 text-purple-300">{chapter.title}</h2>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mb-6 p-4 bg-gray-800 rounded-lg">
          <button
            onClick={() => {
              if (currentChapterIndex > 0) {
                const prevChapter = story.chapters[currentChapterIndex - 1];
                navigate(`/story/${story.id}/chapter/${prevChapter.id}`);
              }
            }}
            disabled={currentChapterIndex <= 0}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              currentChapterIndex <= 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            ← Capítulo Anterior
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-400">
              Capítulo {currentChapterIndex + 1} de {story.chapters.length}
            </span>
          </div>

          <button
            onClick={() => {
              if (currentChapterIndex < story.chapters.length - 1) {
                const nextChapter = story.chapters[currentChapterIndex + 1];
                navigate(`/story/${story.id}/chapter/${nextChapter.id}`);
              }
            }}
            disabled={currentChapterIndex >= story.chapters.length - 1}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              currentChapterIndex >= story.chapters.length - 1
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Próximo Capítulo →
          </button>
        </div>

        <div>
          {paragraphs.map((paragraph, index) => (
            <div key={index} className="group mb-4 relative">
              <p className="text-gray-300 leading-relaxed">{paragraph}</p>
              {/* Display existing comments for this paragraph */}
              {visibleParagraphComments.has(index) && (
                <div className="ml-4 mb-4">
                  {comments
                    .filter(c => c.paragraphIndex === index)
                    .map((comment, cIndex) => (
                      <div key={cIndex} className="bg-gray-800 p-3 rounded mb-2">
                        <p className="text-sm">{comment.text}</p>
                        <span className="text-xs text-gray-500">Por {comment.author} em {comment.date}</span>
                      </div>
                    ))}
                </div>
              )}
              {activeParagraph === index && (
                <div className="mt-4 p-3 bg-gray-900 rounded">
                  <textarea
                    className="w-full p-2 rounded bg-gray-950 text-white mb-2 resize-none"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Adicionar comentário ao parágrafo"
                    rows={3}
                  />
                  <button
                    className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                    onClick={handleAddComment}
                  >
                    Comentar
                  </button>
                </div>
              )}
              <button
                onClick={() => toggleParagraphComments(index)}
                className="absolute top-2 right-2 text-xs bg-gray-600 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {visibleParagraphComments.has(index) ? "Ocultar" : "Comentários"}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowChapterComments(!showChapterComments)}
          className="mt-8 px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition-colors"
        >
          {showChapterComments ? "Ocultar Comentários do Capítulo" : "Mostrar Comentários do Capítulo"}
        </button>

        {/* Chapter Comments */}
        {showChapterComments && (
          <div className="mt-8 p-6 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Comentários do Capítulo</h3>
          {/* Display chapter comments */}
          <div className="mb-6">
            {comments.filter(c => c.paragraphIndex === -1).map((comment, cIndex) => (
              <div key={cIndex} className="bg-gray-900 p-3 rounded mb-2">
                <p className="text-sm">{comment.text}</p>
                <div className="flex text-yellow-400 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < (comment.rating || 0) ? '⭐' : '☆'}</span>
                  ))}
                </div>
                <span className="text-xs text-gray-500">Por {comment.author} em {comment.date}</span>
              </div>
            ))}
          </div>
          {/* Add comment form */}
          <div className="mb-4">
            <label className="block text-sm mb-2">Avaliação:</label>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setChapterRating(i + 1)}
                  className={`text-2xl ${i < chapterRating ? 'text-yellow-400' : 'text-gray-400'}`}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>
          <textarea
            className="w-full p-2 rounded bg-gray-950 text-white mb-2 resize-none"
            value={chapterComment}
            onChange={e => setChapterComment(e.target.value)}
            placeholder="Adicionar comentário ao capítulo"
            rows={4}
          />
          <button
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            onClick={() => {
              if (!story || chapterComment.trim() === "") return;
              interactionService.addComment(story.id, "User", chapterComment, -1, chapterRating);
              setChapterComment("");
              setChapterRating(0);
              // Reload
              const loadedComments = interactionService.getComments(story.id);
              setComments(loadedComments);
            }}
          >
            Comentar
          </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChapterReader;
