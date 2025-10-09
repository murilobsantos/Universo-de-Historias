import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import StoryDetail from './pages/StoryDetail';
import NewStory from './pages/NewStory';
import EditStory from './pages/EditStory';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Reader from './pages/Reader';
import AuthorProfile from './pages/AuthorProfile';
import ReaderProfile from './pages/ReaderProfile';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white">
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/story/:id" element={<StoryDetail />} />
          <Route path="/reader/:id" element={<Reader />} />
          <Route path="/login" element={<Login />} />
          <Route path="/nova" element={<NewStory />} />
          <Route path="/editar/:id" element={<EditStory />} />
          <Route path="/profile/author/:id" element={<AuthorProfile />} />
          <Route path="/profile/reader/:id" element={<ReaderProfile />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
