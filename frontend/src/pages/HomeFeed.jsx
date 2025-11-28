import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const HomeFeed = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const calculateReadingTime = (text) => {
    const wpm = 200;
    const words = text ? text.trim().split(/\s+/).length : 0;
    const time = Math.ceil(words / wpm);
    return time;
  };

  // Group posts by category
  const groupedPosts = posts.reduce((acc, post) => {
    const category = post.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(post);
    return acc;
  }, {});

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
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Welcome back,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient-x">
              {user?.firstName}
            </span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light">
            Explore the latest perspectives organized by topic.
          </p>
        </div>

        {/* Categories Loop */}
        {Object.keys(groupedPosts).length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl">
            <p className="text-slate-400 text-lg mb-6">
              No posts yet. Be the first to write one!
            </p>
            <Link to="/create" className="btn btn-primary rounded-full px-8">
              Create Post
            </Link>
          </div>
        ) : (
          Object.entries(groupedPosts).map(([category, categoryPosts]) => {
            const displayedPosts = categoryPosts.slice(0, 4);
            const showArrow = categoryPosts.length > 4;

            return (
              <section key={category} className="mb-20 last:mb-0">
                <div className="flex items-end justify-between mb-8 border-b border-slate-100 pb-4">
                  <div className="flex items-end gap-4">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {category}
                    </h2>
                    <span className="text-slate-400 font-medium pb-1 text-sm">
                      {categoryPosts.length} Stories
                    </span>
                  </div>

                  {showArrow && (
                    <Link
                      to={`/category/${category}`}
                      className="group flex items-center gap-1 text-indigo-600 text-sm font-bold hover:bg-indigo-50 px-3 py-1.5 rounded-full transition-all"
                    >
                      View All
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  )}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {displayedPosts.map((post) => (
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
                            {category}
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
              </section>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HomeFeed;
