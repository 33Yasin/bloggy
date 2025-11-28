import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("Post not found");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clerk_user_id: user.id }),
      });

      if (response.ok) {
        navigate("/");
      } else {
        const data = await response.json();
        alert(`Failed to delete post: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post");
    } finally {
      setIsDeleting(false);
    }
  };

  const calculateReadingTime = (text) => {
    const wpm = 200;
    const words = text ? text.trim().split(/\s+/).length : 0;
    const time = Math.ceil(words / wpm);
    return time;
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-12 w-3/4"></div>
            <div className="flex gap-4 items-center">
              <div className="skeleton w-12 h-12 rounded-full"></div>
              <div className="flex flex-col gap-2">
                <div className="skeleton h-4 w-32"></div>
                <div className="skeleton h-3 w-24"></div>
              </div>
            </div>
            <div className="skeleton h-96 w-full rounded-3xl mt-6"></div>
            <div className="skeleton h-4 w-full mt-4"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">Post not found</h2>
          <p className="text-slate-600">
            The post you are looking for doesn't exist or has been removed.
          </p>
          <Link to="/" className="btn btn-primary rounded-full px-8">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 pt-24 pb-20 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Breadcrumbs */}
        <div className="text-sm breadcrumbs mb-8 text-slate-500">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={`/category/${post.category}`}>{post.category}</Link>
            </li>
            <li className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">
              {post.title}
            </li>
          </ul>
        </div>

        <article>
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium mb-6">
              <span className="badge badge-primary badge-outline">
                {post.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">
                {new Date(post.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">
                {calculateReadingTime(post.content)} min read
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between border-y border-slate-200 py-6">
              <div className="flex items-center gap-4">
                <div className="avatar placeholder">
                  <div className="bg-primary text-neutral-content rounded-full w-12 flex items-center justify-center">
                    <span className="text-xl">
                      {post.first_name ? post.first_name[0] : "A"}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-slate-900">
                    {post.first_name} {post.last_name}
                  </div>
                  <div className="text-sm text-slate-500">Author</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="btn btn-ghost btn-circle tooltip"
                  data-tip="Copy URL"
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
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </button>

                {user && user.id === post.author_clerk_id && (
                  <>
                    <div className="divider divider-horizontal mx-0"></div>
                    <Link
                      to={`/edit-post/${post.id}`}
                      className="btn btn-ghost btn-sm rounded-full"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="btn btn-error btn-outline btn-sm rounded-full"
                    >
                      {isDeleting ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </header>

          {post.image_url && (
            <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}

          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary-focus">
            <p className="whitespace-pre-wrap leading-relaxed text-lg break-words">
              {post.content}
            </p>
          </div>

          {/* Footer / Share Section */}
          <div className="mt-16 pt-8 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h3 className="font-bold text-xl">Enjoyed this post?</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleShare}
                  className="btn btn-outline rounded-full gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                  Copy URL
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-end toast-bottom z-50">
          <div className="alert alert-success text-white shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Link copied to clipboard.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
