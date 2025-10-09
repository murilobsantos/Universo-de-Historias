import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useStories from "../hooks/useStories";
import { Comment } from "../types/story";
import { getComments, addComment } from "../services/interactionService";
import StoryCard from "../components/StoryCard";
import ParagraphModal from "../components/ParagraphModal";
import { MessageCircle } from "lucide-react";

function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { stories } = useStories();
  const story = stories.find(s => s.id === Number(id));
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [chapterComments, setChapterComments] = useState<Comment[]>([]);
  const [selectedParagraphIndex, setSelectedParagraphIndex] = useState<number | null>(null);
  const [showParagraphModal, setShowParagraphModal] = useState(false);
  const [modalParagraphIndex, setModalParagraphIndex] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id && story) {
      const saved = localStorage.getItem(`story-${id}-progress`);
      if (saved) {
        const num = parseInt(saved);
        if (!isNaN(num)) {
          // Check if chapter exists in story
          const chapterExists = story.chapters.some(c => c.id === num);
          if (chapterExists) {
            setCurrentChapter(num);
          } else {
            setCurrentChapter(null);
          }
        }
      }
    }
  }, [id, story]);

  useEffect(() => {
    if (currentChapter !== null && id) {
      localStorage.setItem(`story-${id}-progress`, currentChapter.toString());
      // Restore scroll position for this chapter
      const savedScroll = localStorage.getItem(`story-${id}-chapter-${currentChapter}-scroll`);
      if (savedScroll && contentRef.current) {
        contentRef.current.scrollTop = parseInt(savedScroll);
      }
    }
  }, [currentChapter, id]);

  useEffect(() => {
    if (currentChapter !== null && id) {
      const comments = getComments(parseInt(id), currentChapter);
      setChapterComments(comments.map(c => ({ id: c.id, author: c.author, text: c.text, date: c.date })));
    }
  }, [currentChapter, id]);

  const handleScroll = () => {
    if (contentRef.current && currentChapter !== null && id) {
      const scrollTop = contentRef.current.scrollTop;
      localStorage.setItem(`story-${id}-chapter-${currentChapter}-scroll`, scrollTop.toString());
    }
  };

  if (!story) {
    return <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center">História não encontrada</div>;
  }

  // Ensure story has required properties
  if (!story.genres) story.genres = [];
  if (!story.tags) story.tags = [];
  if (!story.chapters) story.chapters = [];

  const handleReadChapter = (chapterId: number) => {
    setCurrentChapter(chapterId);
  };

  const handleBackToChapters = () => {
    setCurrentChapter(null);
  };

  // Get recommended stories (random 3 from same genre)
  const recommendedStories = stories
    .filter(s => s.id !== story.id && s.genres?.some(g => story.genres.includes(g)))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  if (currentChapter !== null) {
    const chapter = story.chapters.find(c => c.id === currentChapter);
    if (!chapter) return <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center">Capítulo não encontrado</div>;

    const currentIndex = story.chapters.findIndex(c => c.id === currentChapter);
    const prevChapter = currentIndex > 0 ? story.chapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < story.chapters.length - 1 ? story.chapters[currentIndex + 1] : null;

    const wordCount = chapter.content.split(/\s+/).length;
    const estimatedTime = Math.ceil(wordCount / 200); // assuming 200 words per minute

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="max-w-4xl mx-auto py-10 px-6">
          <button onClick={handleBackToChapters} className="mb-4 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">&larr; Voltar aos capítulos</button>
          <h1 className="text-2xl font-bold mb-4">{story.title} - {chapter.title}</h1>
          <div className="mb-4 flex items-center gap-4">
            <label className="text-sm">Tamanho da fonte:</label>
            <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">-</button>
            <span className="text-sm">{fontSize}px</span>
            <button onClick={() => setFontSize(Math.min(24, fontSize + 2))} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">+</button>
          </div>
          <div className="mb-4 flex items-center gap-4">
            <label className="text-sm">Espaçamento das linhas:</label>
            <button onClick={() => setLineHeight(Math.max(1.2, lineHeight - 0.1))} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">-</button>
            <span className="text-sm">{lineHeight}</span>
            <button onClick={() => setLineHeight(Math.min(2.0, lineHeight + 0.1))} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">+</button>
          </div>
          <div
            className="max-w-none mb-4"
            style={{ maxHeight: '70vh', overflowY: 'auto' }}
            ref={contentRef}
            onScroll={handleScroll}
          >
            {chapter.content.split('\n\n').filter(p => p.trim()).map((paragraph, index) => (
              <div key={index} className="relative group mb-4">
                <p style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}` }}>{paragraph}</p>
                <button
                  onClick={() => {
                    setModalParagraphIndex(index);
                    setShowParagraphModal(true);
                  }}
                  className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-gray-200 dark:bg-gray-700 rounded"
                >
                  <MessageCircle size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            {wordCount} palavras • Tempo estimado: {estimatedTime} min
          </div>
          <div className="flex justify-between">
            {prevChapter ? (
              <button
                onClick={() => handleReadChapter(prevChapter.id)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                &larr; {prevChapter.title}
              </button>
            ) : <div />}
            {nextChapter ? (
              <button
                onClick={() => handleReadChapter(nextChapter.id)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {nextChapter.title} &rarr;
              </button>
            ) : <div />}
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Comentários</h3>
            {chapterComments.length > 0 ? (
              <div className="space-y-4 mb-6">
                {chapterComments.map((comment) => (
                  <div key={comment.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <strong className="text-gray-900 dark:text-gray-100">{comment.author}</strong>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(comment.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 mb-6">Nenhum comentário ainda. Seja o primeiro!</p>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newCommentAuthor.trim() && newCommentText.trim()) {
                  const addedComment = addComment(parseInt(id!), newCommentAuthor.trim(), newCommentText.trim(), selectedParagraphIndex !== null ? selectedParagraphIndex : undefined, currentChapter!);
                  const newComment: Comment = {
                    id: addedComment.id,
                    author: addedComment.author,
                    text: addedComment.text,
                    date: addedComment.date
                  };
                  setChapterComments(prev => [...prev, newComment]);
                  setNewCommentAuthor("");
                  setNewCommentText("");
                  setSelectedParagraphIndex(null);
                }
              }}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
            >
              <h4 className="font-medium mb-3">
                Adicionar comentário
                {selectedParagraphIndex !== null && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    (Parágrafo {selectedParagraphIndex + 1})
                  </span>
                )}
              </h4>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={newCommentAuthor}
                  onChange={(e) => setNewCommentAuthor(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  placeholder="Seu comentário..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Comentar
              </button>
            </form>
          </div>

          {/* Recommended Stories */}
          {recommendedStories.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Histórias Recomendadas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recommendedStories.map((recStory) => (
                  <StoryCard
                    key={recStory.id}
                    id={recStory.id}
                    title={recStory.title}
                    description={recStory.description}
                    image={recStory.image}
                    onClick={() => navigate(`/story/${recStory.id}`)}
                  />
                ))}
              </div>
            </div>
          )}

          <ParagraphModal
            isOpen={showParagraphModal}
            onClose={() => setShowParagraphModal(false)}
            storyId={parseInt(id!)}
            paragraphIndex={modalParagraphIndex!}
            chapterId={currentChapter!}
            onCommentAdded={() => {
              if (currentChapter !== null && id) {
                const comments = getComments(parseInt(id), currentChapter);
                setChapterComments(comments.map(c => ({ id: c.id, author: c.author, text: c.text, date: c.date })));
              }
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto py-10 px-6">
        <Link to="/" className="inline-block mb-4 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">&larr; Voltar às histórias</Link>
        <img src={story.image} alt={story.title} className="w-full h-64 object-cover rounded-lg mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{story.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{story.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <span><strong>Autor:</strong> {story.author}</span>
          <span><strong>Data:</strong> {new Date(story.date).toLocaleDateString('pt-BR')}</span>
          <span><strong>Capítulos:</strong> {story.chapters.length}</span>
        </div>

        <h2 className="text-xl font-semibold mb-4">Capítulos</h2>
        <div className="space-y-2">
          {story.chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => handleReadChapter(chapter.id)}
              className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium">{chapter.title}</h3>
            </button>
          ))}
        </div>

        {/* Recommended Stories */}
        {recommendedStories.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Histórias Recomendadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedStories.map((recStory) => (
                <Link
                  key={recStory.id}
                  to={`/story/${recStory.id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow p-4"
                >
                  <img src={recStory.image} alt={recStory.title} className="w-full h-32 object-cover rounded mb-3" />
                  <h3 className="font-semibold mb-2">{recStory.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{recStory.description.substring(0, 100)}...</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoryDetail;
