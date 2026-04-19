import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

type BoundaryProps = { children: ReactNode };

type BoundaryState = { hasError: boolean };

class ErrorBoundaryInner extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorBoundaryFallback />;
    }
    return this.props.children;
  }
}

function ErrorBoundaryFallback(): ReactNode {
  const { t } = useLanguage();
  return (
    <main className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-16 bg-canvas text-ink">
      <div className="max-w-md text-center rounded-2xl border border-slate-200/90 bg-white p-8 shadow-soft-lg">
        <h1 className="text-xl font-bold text-ink mb-3">{t('errorBoundary.title')}</h1>
        <p className="text-ink-muted text-sm leading-relaxed mb-6">{t('errorBoundary.body')}</p>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand-dark transition-colors"
          onClick={() => window.location.reload()}
        >
          {t('errorBoundary.refresh')}
        </button>
      </div>
    </main>
  );
}

/** Оборачивает дерево внутри `LanguageProvider`, чтобы fallback мог использовать `t()`. */
export function AppErrorBoundary({ children }: BoundaryProps): ReactNode {
  return <ErrorBoundaryInner>{children}</ErrorBoundaryInner>;
}
