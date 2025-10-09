import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStories from "../hooks/useStories";
import { ChevronLeft, ChevronRight, Settings, X } from "lucide-react";

function Reader() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { stories } = useStories();
  const story = stories.find(s => s.id === Number(id));
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [showSettings, setShowSettings] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id && story) {
      const saved = localStorage.getItem(`reader-${id}-chapter`);
      if (saved) {
        const num = parseInt(saved);
        if (!isNaN(num) && story.chapters.some(c => c.id === num)) {
          setCurrentChapter(num);
        } else {
          setCurrentChapter(story.chapters[0]?.id || null);
        }
      } else {
        setCurrentChapter(story.chapters[0]?.id || null);
      }
    }
  }, [id, story]);

  useEffect(() => {
    if (currentChapter !== null && id) {
      localStorage.setItem(`reader-${id}-chapter`, currentChapter.toString());
    }
  }, [currentChapter, id]);

  const handlePrevChapter = () => {
    if (currentChapter === null) return;
    const currentIndex = story?.chapters.findIndex(c => c.id === currentChapter) ?? -1;
    if (currentIndex > 0) {
      setCurrentChapter(story!.chapters[currentIndex - 1].id);
    }
  };

  const handleNextChapter = () => {
    if (currentChapter === null) return;
    const currentIndex = story?.chapters.findIndex(c => c.id === currentChapter) ?? -1;
    if (currentIndex >= 0 && currentIndex < (story!.chapters.length - 1)) {
      setCurrentChapter(story!.chapters[currentIndex + 1].id);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevChapter();
    if (e.key === "ArrowRight") handleNextChapter();
    if (e.key === "Escape") navigate("/home");
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentChapter, story]);

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🌌</div>
          <h2 className="text-2xl font-bold mb-2">História não encontrada</h2>
          <button
            onClick={() => navigate("/home")}
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:brightness-110 transition"
          >
            Voltar à Biblioteca
          </button>
        </div>
      </div>
    );
  }

  if (!story.chapters || story.chapters.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Nenhum capítulo disponível</h2>
          <button
            onClick={() => navigate("/home")}
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:brightness-110 transition"
          >
            Voltar à Biblioteca
          </button>
        </div>
      </div>
    );
  }

  const chapter = story.chapters.find(c => c.id === currentChapter);
  if (!chapter) return null;

  const currentIndex = story.chapters.findIndex(c => c.id === currentChapter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white relative overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-6 bg-cosmic-dark/50 backdrop-blur-xs">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center space-x-2 text-soft hover:text-white transition"
        >
          <X size={24} />
          <span>Sair</span>
        </button>
        <h1 className="text-xl font-exo-2 font-bold text-center flex-1">{story.title}</h1>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-soft hover:text-white transition"
        >
          <Settings size={24} />
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="relative z-10 bg-cosmic-dark/90 backdrop-blur-xs p-6 mx-6 rounded-lg border border-cosmic-purple">
          <h3 className="text-lg font-semibold mb-4">Configurações de Leitura</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Tamanho da Fonte: {fontSize}px</label>
              <input
                type="range"
                min="12"
                max="32"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Espaçamento: {lineHeight}</label>
              <input
                type="range"
                min="1.2"
                max="2.0"
                step="0.1"
                value={lineHeight}
                onChange={(e) => setLineHeight(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Chapter Navigation */}
      <div className="relative z-10 flex justify-between items-center px-6 py-4">
        <button
          onClick={handlePrevChapter}
          disabled={currentIndex <= 0}
          className="flex items-center space-x-2 bg-cosmic-dark/50 backdrop-blur-xs px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cosmic-purple/30 transition"
        >
          <ChevronLeft size={20} />
          <span>Anterior</span>
        </button>
        <div className="text-center">
          <h2 className="text-lg font-semibold">{chapter.title}</h2>
          <p className="text-sm text-textSecondary">Capítulo {currentIndex + 1} de {story.chapters.length}</p>
        </div>
        <button
          onClick={handleNextChapter}
          disabled={currentIndex >= story.chapters.length - 1}
          className="flex items-center space-x-2 bg-cosmic-dark/50 backdrop-blur-xs px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cosmic-purple/30 transition"
        >
          <span>Próximo</span>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12">
        <div
          ref={contentRef}
          className="bg-cosmic-dark/30 backdrop-blur-xs p-8 rounded-lg border border-cosmic-purple/30 leading-relaxed"
          style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}` }}
        >
          {chapter.content.split('\n\n').filter(p => p.trim()).map((paragraph, index) => (
            <p key={index} className="mb-6 text-justify">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-cosmic-dark/50">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / story.chapters.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default Reader;
