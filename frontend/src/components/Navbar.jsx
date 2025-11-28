import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();

  const MyPostsIcon = (
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            B
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Bloggy
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <SignedIn>
            <Link to="/create">
              <button className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-full px-4 font-medium shadow-md shadow-indigo-200 flex items-center gap-2">
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
                  <path d="M12 5v14M5 12h14" />
                </svg>
                New Post
              </button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-slate-100",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Posts"
                  labelIcon={MyPostsIcon}
                  onClick={() => navigate("/my-posts")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn btn-ghost btn-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                Log in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn btn-sm bg-slate-900 text-white hover:bg-slate-800 border-none rounded-full px-6 font-medium shadow-lg shadow-slate-200">
                Sign up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
