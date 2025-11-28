import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyPosts";
import CategoryPage from "./pages/CategoryPage";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";
import Navbar from "./components/Navbar";
import AuthSync from "./components/AuthSync";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AuthSync />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
