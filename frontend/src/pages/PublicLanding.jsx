import React from "react";
import { SignUpButton, SignInButton } from "@clerk/clerk-react";

const PublicLanding = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center relative overflow-hidden">
        <div className="container mx-auto px-6 py-24 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Text */}
            <div className="space-y-8 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-600">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                New: Analytics Dashboard
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                Publish your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  passion.
                </span>
              </h1>

              <p className="text-xl text-slate-500 max-w-lg leading-relaxed">
                The minimal publishing platform for writers who value clarity.
                Focus on your words, we handle the rest.
              </p>

              <div className="flex items-center gap-4">
                <SignUpButton mode="modal">
                  <button className="btn btn-neutral btn-lg rounded-full px-8 shadow-xl hover:shadow-2xl transition-all">
                    Start Writing
                  </button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <button className="btn btn-ghost btn-lg rounded-full px-8 hover:bg-slate-50 hover:text-neutral">
                    Sign In
                  </button>
                </SignInButton>
              </div>

              <div className="flex items-center gap-4 pt-4 text-sm text-slate-400">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white"></div>
                </div>
                <p>Join 10,000+ writers</p>
              </div>
            </div>

            {/* Right Column: Colorful Mockup */}
            <div className="relative z-10 perspective-1000">
              <div className="mockup-browser border border-slate-200 bg-white shadow-2xl transform rotate-y-[-12deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 ease-out">
                <div className="mockup-browser-toolbar">
                  <div className="input border border-slate-200 bg-slate-50 text-slate-400">
                    https://bloggy.app/dashboard
                  </div>
                </div>
                <div className="bg-slate-50 p-6 h-[500px] overflow-hidden relative">
                  {/* Fake Dashboard UI */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="card bg-indigo-500 text-white shadow-lg p-4 rounded-2xl">
                      <div className="text-sm opacity-80 mb-1">Total Views</div>
                      <div className="text-3xl font-bold">124.5K</div>
                      <div className="mt-2 text-xs bg-white/20 inline-block px-2 py-1 rounded">
                        +12% this week
                      </div>
                    </div>
                    <div className="card bg-violet-500 text-white shadow-lg p-4 rounded-2xl">
                      <div className="text-sm opacity-80 mb-1">Subscribers</div>
                      <div className="text-3xl font-bold">8,902</div>
                      <div className="mt-2 text-xs bg-white/20 inline-block px-2 py-1 rounded">
                        +54 today
                      </div>
                    </div>
                  </div>

                  <div className="card bg-white shadow-sm border border-slate-100 p-4 rounded-2xl mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-slate-700">
                        Recent Activity
                      </h3>
                      <button className="btn btn-xs btn-circle btn-ghost">
                        •••
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                          ❤️
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            New like on "Design Systems"
                          </div>
                          <div className="text-xs text-slate-400">
                            2 mins ago
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                          💬
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            Comment from Sarah
                          </div>
                          <div className="text-xs text-slate-400">
                            15 mins ago
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="card bg-orange-400 text-white p-4 rounded-2xl aspect-square flex flex-col justify-between">
                      <div className="text-2xl">🔥</div>
                      <div className="font-bold text-sm">Trending</div>
                    </div>
                    <div className="card bg-sky-400 text-white p-4 rounded-2xl aspect-square flex flex-col justify-between">
                      <div className="text-2xl">📝</div>
                      <div className="font-bold text-sm">Drafts</div>
                    </div>
                    <div className="card bg-rose-400 text-white p-4 rounded-2xl aspect-square flex flex-col justify-between">
                      <div className="text-2xl">⚙️</div>
                      <div className="font-bold text-sm">Settings</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements behind mockup */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Minimal */}
      <section className="py-24 px-6 border-t border-slate-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Distraction-free</h3>
              <p className="text-slate-500 leading-relaxed">
                A writing experience designed to help you focus. No clutter,
                just you and your words.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-violet-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 5.472m0 0a9.09 9.09 0 00-3.279 3.298m.098-4.67c.353-3.636 3.4-6.446 6.998-6.446 3.598 0 6.645 2.81 6.998 6.446"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Global Reach</h3>
              <p className="text-slate-500 leading-relaxed">
                Connect with readers from around the world. Build your audience
                organically.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-pink-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Lightning Fast</h3>
              <p className="text-slate-500 leading-relaxed">
                Optimized for speed and performance. Your stories load
                instantly, everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-12 px-6 border-t border-slate-100">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white text-sm">
              B
            </div>
            Bloggy
          </div>
          <div className="text-sm text-slate-500">
            © 2025 Bloggy Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-slate-400 hover:text-slate-900 transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-slate-900 transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-slate-900 transition-colors"
            >
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLanding;
