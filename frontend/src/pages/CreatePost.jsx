import React, { useState, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Technology"); // Default category
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const categoriesList = [
    "Technology",
    "Programming",
    "Software Development",
    "Artificial Intelligence",
    "Data Science",
    "Cybersecurity",
    "Web Development",
    "Mobile Development",
    "DevOps & Cloud",
    "Gaming",
    "Gadgets & Reviews",
    "Business",
    "Entrepreneurship",
    "Marketing",
    "Finance",
    "Productivity",
    "Lifestyle",
    "Health & Wellness",
    "Fitness",
    "Food & Recipes",
    "Travel",
    "Photography",
    "Fashion",
    "Art & Design",
    "Education",
    "Self-Improvement",
    "Science",
    "Environment",
    "Sports",
    "News & Current Events",
    "Personal Stories",
    "Parenting",
    "Entertainment",
    "Movies & TV",
    "Music",
    "Books & Literature",
  ];

  const getCategoryColor = (category) => {
    const colors = [
      "bg-red-100 text-red-800",
      "bg-orange-100 text-orange-800",
      "bg-amber-100 text-amber-800",
      "bg-yellow-100 text-yellow-800",
      "bg-lime-100 text-lime-800",
      "bg-green-100 text-green-800",
      "bg-emerald-100 text-emerald-800",
      "bg-teal-100 text-teal-800",
      "bg-cyan-100 text-cyan-800",
      "bg-sky-100 text-sky-800",
      "bg-blue-100 text-blue-800",
      "bg-indigo-100 text-indigo-800",
      "bg-violet-100 text-violet-800",
      "bg-purple-100 text-purple-800",
      "bg-fuchsia-100 text-fuchsia-800",
      "bg-pink-100 text-pink-800",
      "bg-rose-100 text-rose-800",
    ];

    let hash = 0;
    for (let i = 0; i < category.length; i++) {
      hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>You must be signed in to view this page.</div>;
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePublish = async () => {
    if (!title || !content) {
      alert("Please fill in the title and content.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          category,
          image_url:
            imageUrl ||
            "https://images.unsplash.com/photo-1499750310159-5b9887039e5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Default image if none provided
          clerk_user_id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          first_name: user.firstName,
          last_name: user.lastName,
        }),
      });

      if (response.ok) {
        navigate("/");
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Create a New Story
        </h1>

        <div className="space-y-6">
          {/* Title Input */}
          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl font-bold text-slate-900 placeholder:text-slate-300 border-none focus:ring-0 focus:outline-none bg-transparent"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  document.getElementById("category_modal").showModal()
                }
                className={`btn border-none hover:opacity-80 capitalize text-lg h-auto py-3 px-6 rounded-xl ${getCategoryColor(
                  category
                )}`}
              >
                {category}
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
                  className="ml-2 opacity-70"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>

            <dialog id="category_modal" className="modal">
              <div className="modal-box max-w-4xl bg-white">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-slate-500">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-2xl mb-6 text-slate-900">
                  Select a Category
                </h3>
                <div className="flex flex-wrap gap-3">
                  {categoriesList.map((cat) => (
                    <div
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        document.getElementById("category_modal").close();
                      }}
                      className={`badge badge-lg p-4 cursor-pointer hover:scale-105 transition-transform border-none ${
                        category === cat
                          ? "ring-2 ring-offset-2 ring-indigo-500"
                          : ""
                      } ${getCategoryColor(cat)}`}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>

          {/* Image Upload */}
          <div
            className="w-full h-64 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors cursor-pointer relative overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />

            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="loading loading-spinner loading-lg text-indigo-600"></div>
                <span className="font-medium text-indigo-600">
                  Uploading...
                </span>
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <span className="font-medium">Add a cover image</span>
              </div>
            )}
          </div>

          {/* Content Textarea */}
          <div>
            <textarea
              placeholder="Tell your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[50vh] text-lg text-slate-700 placeholder:text-slate-400 border-none focus:ring-0 focus:outline-none resize-none bg-transparent leading-relaxed"
            ></textarea>
          </div>
        </div>

        {/* Action Bar */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 py-4 px-6">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <button className="btn btn-ghost text-slate-500 hover:text-slate-900">
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              disabled={isSubmitting || isUploading}
              className="btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 border-none disabled:opacity-50"
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
