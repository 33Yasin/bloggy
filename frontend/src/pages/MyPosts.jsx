import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const MyPosts = () => {
  const { user, isLoaded } = useUser();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserPosts();
    }
  }, [isLoaded, user]);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/user/${user.id}`
      );
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setDeletingId(postId);
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clerk_user_id: user.id }),
        }
      );

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== postId));
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center pt-20">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  const categories = ["All", ...new Set(posts.map((post) => post.category))];
  const filteredPosts =
    activeTab === "All"
      ? posts
      : posts.filter((post) => post.category === activeTab);

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Posts</h1>
            <p className="text-slate-500 mt-1">
              Manage your blog posts, edit or delete them.
            </p>
          </div>
          <Link to="/create" className="btn btn-primary rounded-full px-6">
            Create New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No posts yet
            </h3>
            <p className="text-slate-500 mb-6">
              You haven't created any blog posts yet.
            </p>
            <Link to="/create" className="btn btn-primary rounded-full">
              Write your first post
            </Link>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div
              role="tablist"
              className="tabs tabs-boxed bg-slate-100 p-1 mb-8 w-fit rounded-full"
            >
              {categories.map((category) => (
                <a
                  key={category}
                  role="tab"
                  className={`tab rounded-full transition-all duration-300 ${
                    activeTab === category
                      ? "bg-white text-indigo-600 shadow-sm font-medium"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                  onClick={() => setActiveTab(category)}
                >
                  {category}
                </a>
              ))}
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="card bg-white border border-slate-200 hover:shadow-xl transition-all duration-300 group"
                >
                  <figure className="relative h-48 overflow-hidden">
                    {post.image_url ? (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="3"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link
                        to={`/edit-post/${post.id}`}
                        className="btn btn-sm btn-circle btn-ghost bg-white/90 hover:bg-white text-indigo-600 shadow-sm"
                        title="Edit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="btn btn-sm btn-circle btn-ghost bg-white/90 hover:bg-red-50 text-red-500 hover:text-red-600 shadow-sm"
                        title="Delete"
                        disabled={deletingId === post.id}
                      >
                        {deletingId === post.id ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </figure>
                  <div className="card-body p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge badge-sm badge-outline text-slate-500">
                        {post.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <Link to={`/post/${post.id}`}>
                      <h2 className="card-title text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-slate-500 text-sm line-clamp-2 mt-1">
                      {post.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
