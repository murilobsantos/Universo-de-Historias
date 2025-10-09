import React, { useState, useEffect } from 'react';
import { X, Heart, MessageCircle, Share2, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Story } from '../types/story';
import { 
  isStoryLiked, 
  toggleLike, 
  getLikeCount,
  addComment,
  getComments,
  shareStory
} from '../services/interactionService';
import { mockAuthors } from '../data/authors';

interface ModalProps {
  story: Story | null;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ story, isOpen, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [localComments, setLocalComments] = useState<any[]>([]);
  const [showShareMessage, setShowShareMessage] = useState(false);

  useEffect(() => {
    if (story) {
      setIsLiked(isStoryLiked(story.id));
      setLikeCount(story.popularity + getLikeCount(story.id));
      setLocalComments(getComments(story.id));
    }
  }, [story]);

  if (!isOpen || !story) return null;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = addComment(story.id, 'Leitor Anônimo', newComment);
      setLocalComments([...localComments, comment]);
      setNewComment('');
      setNewRating(5);
    }
  };

  const handleLikeToggle = () => {
    const newLikedState = toggleLike(story.id);
    setIsLiked(newLikedState);
    setLikeCount(story.popularity + getLikeCount(story.id));
  };

  const handleShare = async () => {
    const success = await shareStory(story.id, story.title);
    if (success) {
      setShowShareMessage(true);
      setTimeout(() => setShowShareMessage(false), 3000);
    }
  };

  // Find author info
  const author = mockAuthors.find(a => a.name === story.author);
  const authorId = author?.id || 1;

  // Combine original comments with local comments
  const allComments = [...story.comments, ...localComments];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{story.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <X size={24} />
            </button>
          </div>
          <img src={story.image} alt={story.title} className="w-full h-48 object-cover rounded-lg mb-4" />
          <p className="text-gray-700 dark:text-gray-300 mb-4">{story.description}</p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-4">
            <Link
              to={`/story/${story.id}`}
              onClick={onClose}
              className="flex-1 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-center font-semibold"
            >
              Ler História Completa
            </Link>
            <button
              onClick={handleLikeToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition-colors ${
                isLiked
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
              {likeCount}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <Share2 size={18} />
              Compartilhar
            </button>
          </div>

          {/* Share success message */}
          {showShareMessage && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
              Link copiado para a área de transferência!
            </div>
          )}

          {/* Author Info */}
          <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                {story.author.charAt(0)}
              </div>
              <div className="flex-1">
                <Link 
                  to={`/autor/${authorId}`}
                  onClick={onClose}
                  className="font-semibold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {story.author}
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {story.chapters.length} capítulos • {new Date(story.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div><strong>Gêneros:</strong> {story.genres.join(', ')}</div>
            <div><strong>Tags:</strong> {story.tags.join(', ')}</div>
            <div><strong>Avaliação:</strong> ⭐ {story.ratings.average} ({story.ratings.count})</div>
            <div><strong>Comentários:</strong> {allComments.length}</div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <MessageCircle size={20} />
              Comentários ({allComments.length})
            </h3>
            {allComments.length > 0 ? (
              <ul className="space-y-3 max-h-60 overflow-y-auto">
                {allComments.map((comment, index) => (
                  <li key={comment.id || index} className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {comment.author.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-gray-100">{comment.author}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{comment.text}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(comment.date).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">Seja o primeiro a comentar!</p>
            )}
          </div>
          {/* Add comment and rating */}
          <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Adicionar Avaliação e Comentário</h3>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-100">Avaliação (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-100">Comentário</label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escreva seu comentário..."
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
