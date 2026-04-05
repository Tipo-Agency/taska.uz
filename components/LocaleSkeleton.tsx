import React from 'react';

/** Каркас страницы при подгрузке словаря (без полноэкранного спиннера). */
export const LocaleSkeleton: React.FC = () => (
  <div className="min-h-screen bg-canvas flex flex-col">
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className="pointer-events-auto w-full max-w-6xl rounded-full border py-3 px-4 md:px-6 bg-white/90 backdrop-blur-2xl border-slate-200/65 shadow-soft animate-pulse"
        aria-hidden
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-200/90" />
            <div className="h-6 w-28 rounded-lg bg-slate-200/80" />
          </div>
          <div className="hidden lg:flex flex-1 justify-center gap-2">
            <div className="h-9 w-24 rounded-full bg-slate-200/70" />
            <div className="h-9 w-24 rounded-full bg-slate-200/70" />
            <div className="h-9 w-24 rounded-full bg-slate-200/70" />
          </div>
          <div className="flex gap-2">
            <div className="h-9 w-16 rounded-full bg-slate-200/80" />
            <div className="h-9 w-36 rounded-xl bg-slate-200/80" />
          </div>
        </div>
      </div>
    </header>
    <main className="flex-1 pt-36 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-4">
        <div className="h-4 w-32 mx-auto rounded bg-slate-200/70 animate-pulse" />
        <div className="h-12 w-full max-w-xl mx-auto rounded-lg bg-slate-200/60 animate-pulse" />
        <div className="h-24 w-full rounded-2xl bg-slate-200/50 animate-pulse" />
      </div>
    </main>
  </div>
);
