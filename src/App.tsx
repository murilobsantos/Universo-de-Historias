import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Welcome from './pages/Welcome';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Category from './pages/Category';
import StoryDetail from './pages/StoryDetail';
import ChapterReader from './pages/ChapterReader';
import NewStory from './pages/NewStory';
import EditStory from './pages/EditStory';
import Login from './pages/Login';
import Reader from './pages/Reader';
import AuthorProfile from './pages/AuthorProfile';
import ReaderProfile from './pages/ReaderProfile';
import SearchResults from './pages/SearchResults';
import Favorites from './pages/Favorites';
import Header from './components/Header';

function App() {
  const location = useLocation();
  console.log("App component rendering");
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="min-h-screen"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/welcome" />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/story/:id" element={<StoryDetail />} />
            <Route path="/story/:id/chapter/:chapterId" element={<ChapterReader />} />
            <Route path="/reader/:id" element={<Reader />} />
            <Route path="/login" element={<Login />} />
            <Route path="/nova" element={<NewStory />} />
            <Route path="/editar/:id" element={<EditStory />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile/author/:id" element={<AuthorProfile key={location.pathname} />} />
            <Route path="/profile/reader/:id" element={<ReaderProfile />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </>
  );
}

export default App;
