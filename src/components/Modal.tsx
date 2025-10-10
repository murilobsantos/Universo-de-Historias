import React from "react";
import { motion } from "framer-motion";
import { Story } from "../types/story";

interface ModalProps {
  story: Story | null;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ story, isOpen, onClose }) => {
  if (!isOpen || !story) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
    exit: { scale: 0.9, opacity: 0 }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="bg-cosmic-dark rounded-lg max-w-3xl w-full p-4 sm:p-6 relative mx-4"
        variants={contentVariants}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <motion.button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white text-xl sm:text-2xl font-bold hover:text-gray-300 transition-colors"
          onClick={onClose}
          aria-label="Close modal"
          whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          &times;
        </motion.button>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">{story.title}</h2>
        <p className="mb-4 text-sm sm:text-base">{story.description}</p>
        <img src={story.image} alt={story.title} className="w-full rounded mb-4 h-48 sm:h-64 object-cover" loading="lazy" />
        <p className="text-xs sm:text-sm text-textSecondary">Autor: {story.author}</p>
        <p className="text-xs sm:text-sm text-textSecondary">Publicado em: {story.date}</p>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
