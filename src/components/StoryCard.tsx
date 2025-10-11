import React from 'react';
import { motion } from 'framer-motion';

interface StoryCardProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ title, description, image, onClick }) => {
  return (
    <motion.div
      className="bg-white/10 rounded-lg shadow-lg cursor-pointer overflow-hidden group"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)" }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
        loading="lazy"
        whileHover={{ scale: 1.1, rotate: 2 }}
        transition={{ duration: 0.3 }}
      />
      <div className="p-4">
        <motion.h3 
          className="text-xl font-semibold mb-2"
          whileHover={{ color: "#3b82f6" }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-textSecondary text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default StoryCard;
