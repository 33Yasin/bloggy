import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/posts/category/${categoryName}`
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [categoryName]);

  const calculateReadingTime = (text) => {
    const wpm = 200;
    const words = text ? text.trim().split(/\s+/).length : 0;
    const time = Math.ceil(words / wpm);
    return time;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 pt-24 pb-20">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition-colors font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Feed
          </Link>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900">
            {categoryName}
          </h1>
          <p className="text-xl text-slate-500 mt-4">{posts.length} Stories</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col h-full bg-white rounded-xl border border-slate-100 hover:shadow-lg hover:border-indigo-100 transition-all duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-40 overflow-hidden bg-slate-100">
                <Link to={`/post/${post.id}`}>
                  <img
                    src={
                      post.image_url ||
                      "https://images.unsplash.com/photo-1499750310159-52f8f6152133?q=80&w=2070&auto=format&fit=crop"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>

                <Link to={`/post/${post.id}`}>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">
                  {post.content}
                </p>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-white shadow-sm">
                      {post.first_name ? post.first_name[0] : "A"}
                    </div>
                    <span className="text-xs font-medium text-slate-600">
                      {post.first_name} {post.last_name}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {calculateReadingTime(post.content)} min read
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
