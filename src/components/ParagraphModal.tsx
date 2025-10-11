import React, { useState } from 'react';
import { X } from 'lucide-react';
import interactionService from '../services/interactionService';

interface ParagraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  storyId: number;
  paragraphIndex: number;
  onCommentAdded?: () => void;
}

const ParagraphModal: React.FC<ParagraphModalProps> = ({
  isOpen,
  onClose,
  storyId,
  paragraphIndex,
  onCommentAdded
}) => {
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  if (!isOpen) return null;

  const comments = interactionService.getParagraphComments(storyId, paragraphIndex);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentAuthor.trim() && newCommentText.trim()) {
      interactionService.addComment(storyId, newCommentAuthor.trim(), newCommentText.trim(), paragraphIndex);
      setNewCommentAuthor('');
      setNewCommentText('');
      if (onCommentAdded) {
        onCommentAdded();
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Comentários do Parágrafo {paragraphIndex + 1}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={`${comment.storyId}-${comment.paragraphIndex}-${index}`} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <strong className="text-gray-900 dark:text-gray-100">{comment.author}</strong>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(comment.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                Nenhum comentário ainda. Seja o primeiro!
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Adicionar comentário</h4>
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
      </div>
    </div>
  );
};

export default ParagraphModal;
