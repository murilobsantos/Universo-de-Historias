import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import StoryCard from "../components/StoryCard";
import Modal from "../components/Modal";
import useStories from "../hooks/useStories";
import useAuthors from "../hooks/useAuthors";
import { useDarkMode } from "../contexts/DarkModeContext";
import { Story } from "../types/story";

function Welcome() {
  console.log("Welcome component rendering");
  const { stories } = useStories();
  const { currentAuthor } = useAuthors();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Removed redirect for logged-in users to allow access to welcome page

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredStories = useMemo(() => {
    if (!stories) return [];
    return [...stories]
      .sort((a, b) => (b.ratings?.average ?? 0) - (a.ratings?.average ?? 0))
      .slice(0, 6);
  }, [stories]);

  const handleCardClick = (story: Story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  return (
    <main className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white' : 'bg-backgroundLight text-black'}`}>
      {/* Hero Section */}
      <section className={`relative min-h-screen flex items-center justify-center px-4 pt-24 ${isDarkMode ? 'text-white' : 'text-black'}`}>
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating particles effect - simplified */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-cyanSoft rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-magentaSoft rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-electricBlue rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-60 right-10 w-1 h-1 bg-accent rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="text-center z-10 max-w-4xl">
          <div className="mb-8 animate-fade-up">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 mx-auto mb-6 text-accent">
              <circle cx="32" cy="32" r="8" />
              <circle cx="16" cy="16" r="4" />
              <circle cx="48" cy="16" r="4" />
              <circle cx="16" cy="48" r="4" />
              <circle cx="48" cy="48" r="4" />
              <line x1="32" y1="8" x2="32" y2="16" />
              <line x1="32" y1="48" x2="32" y2="56" />
              <line x1="8" y1="32" x2="16" y2="32" />
              <line x1="48" y1="32" x2="56" y2="32" />
            </svg>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-up" style={{animationDelay: '0.2s'}}>
            UNIVERSO DE HISTÓRIAS
          </h1>

          <p className="text-xl md:text-2xl text-textSecondary mb-8 animate-fade-up" style={{animationDelay: '0.4s'}}>
            Descubra mundos incríveis através de histórias criadas por autores talentosos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{animationDelay: '0.6s'}}>
            <Link
              to="/home"
              className="bg-gradient-to-r from-electricBlue to-cyanSoft text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-electricBlue/50 transition-all duration-300 transform hover:scale-105"
            >
              🪐 Explorar Histórias
            </Link>
            <Link
              to="/nova"
              className="bg-gradient-to-r from-secondary to-accent text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-secondary/50 transition-all duration-300 transform hover:scale-105"
            >
              🚀 Portal do Autor
            </Link>
          </div>

          <p className="text-textSecondary mt-8 animate-fade-up" style={{animationDelay: '0.8s'}}>
            +{stories?.length || 0} histórias publicadas • +120 autores ativos
          </p>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Apoie o Universo de Histórias</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-up">
              <div className="text-6xl mb-4">👑</div>
              <h3 className="text-2xl font-semibold mb-4">Seja um Fundador</h3>
              <p className="text-textSecondary">Junte-se aos primeiros apoiadores e ganhe benefícios exclusivos como badges especiais e acesso antecipado.</p>
              <a href="/founders" className="inline-block mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300">
                Ver Fundadores
              </a>
            </div>

            <div className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-up" style={{animationDelay: '0.2s'}}>
              <div className="text-6xl mb-4">💝</div>
              <h3 className="text-2xl font-semibold mb-4">Doação Pontual</h3>
              <p className="text-textSecondary">Faça uma contribuição única através do nosso apoia.se e ajude a manter a plataforma funcionando.</p>
              <a href="https://apoia.se/universodehistorias" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300">
                Apoiar no apoia.se
              </a>
            </div>

            <div className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-up" style={{animationDelay: '0.4s'}}>
              <div className="text-6xl mb-4">📘</div>
              <h3 className="text-2xl font-semibold mb-4">Biblioteca Crescente</h3>
              <p className="text-textSecondary">Cada contribuição nos ajuda a expandir nossa coleção de histórias e melhorar a experiência para todos.</p>
              <a href="/support" className="inline-block mt-4 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300">
                Saiba Mais
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Por que escolher nossa plataforma</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-up">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-semibold mb-4">Biblioteca Diversa</h3>
              <p className="text-textSecondary">Milhares de histórias em diversos gêneros, de ficção científica a romance, esperando para serem descobertas.</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-up" style={{animationDelay: '0.2s'}}>
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-semibold mb-4">Comunidade Ativa</h3>
              <p className="text-textSecondary">Conecte-se com autores talentosos e leitores apaixonados por histórias em nossa comunidade vibrante.</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-up" style={{animationDelay: '0.4s'}}>
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-2xl font-semibold mb-4">Experiência Imersiva</h3>
              <p className="text-textSecondary">Interface intuitiva e responsiva que torna a leitura uma experiência cósmica e envolvente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Histórias em Destaque</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredStories.map((story, index) => (
              <div key={story.id} className="animate-fade-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="hover:scale-105 transition-transform duration-300">
                  <StoryCard
                    title={story.title}
                    description={story.description}
                    image={story.image}
                    onClick={() => handleCardClick(story)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/home"
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
            >
              Ver Todas as Histórias
            </Link>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40"
        >
          🔝
        </button>
      )}



      <Modal
        story={selectedStory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}

export default Welcome;
