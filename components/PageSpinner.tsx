import React from 'react';

/** Fallback для React.lazy при загрузке страниц. */
export const PageSpinner: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-ink-muted">
    <div
      className="h-9 w-9 rounded-full border-2 border-brand/30 border-t-brand animate-spin"
      aria-hidden
    />
    <span className="text-sm">Loading…</span>
  </div>
);
