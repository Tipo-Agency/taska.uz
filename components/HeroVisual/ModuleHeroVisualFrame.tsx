import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { heroVisualEntrance } from '../../constants/motion';

export type ModuleHeroVisualFrameProps = {
  /** Сегмент URL в строке `demo.taska.uz/…`. */
  urlSegment: string;
  /** Классы градиента логотипа в сайдбере: `from-… to-…`. */
  logoGradientClass: string;
  sidebarActiveIndex: number;
  navIcons: readonly LucideIcon[];
  sidebarActiveLabel: string;
  /** Высота области под контент (по умолчанию как у tasks/funnel). */
  minHeightClass?: string;
  children: React.ReactNode;
};

const DEFAULT_MIN_HEIGHT = 'min-h-[280px] sm:min-h-[320px] md:min-h-[380px]';

/**
 * Общая оболочка hero-мокапа: перспектива, рамка окна, «traffic lights», адресная строка, сайдбар Taska.
 */
export const ModuleHeroVisualFrame: React.FC<ModuleHeroVisualFrameProps> = ({
  urlSegment,
  logoGradientClass,
  sidebarActiveIndex,
  navIcons,
  sidebarActiveLabel,
  minHeightClass = DEFAULT_MIN_HEIGHT,
  children,
}) => {
  return (
    <motion.div
      initial={heroVisualEntrance.initial}
      animate={heroVisualEntrance.animate}
      transition={heroVisualEntrance.transition}
      className="mt-12 md:mt-16 w-full max-w-5xl mx-auto perspective-1000"
      style={{ perspective: '1200px' }}
    >
      <div className="rounded-2xl md:rounded-[1.35rem] border border-slate-200/90 bg-white shadow-[0_32px_80px_-28px_rgba(15,23,42,0.28)] overflow-hidden ring-1 ring-slate-900/[0.04]">
        <div className="h-10 md:h-11 border-b border-slate-200/80 flex items-center px-3 md:px-4 gap-2 bg-slate-50/95 justify-between">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="hidden sm:flex h-7 flex-1 max-w-[min(52%,280px)] mx-2 bg-white border border-slate-200/90 rounded-lg items-center justify-center text-[10px] text-slate-500 font-mono truncate px-2">
            demo.taska.uz/{urlSegment}
          </div>
          <div className="w-7 h-7 rounded-full bg-slate-200/80 shrink-0" />
        </div>

        <div className={`flex ${minHeightClass}`}>
          <aside className="hidden md:flex w-48 flex-col border-r border-slate-200/80 bg-slate-50/50 py-3 px-2 gap-0.5 shrink-0">
            <div className="flex items-center gap-2 px-2 mb-3">
              <div
                className={`w-8 h-8 rounded-xl bg-gradient-to-br ${logoGradientClass} flex items-center justify-center text-white text-xs font-bold shadow-sm`}
              >
                T
              </div>
              <span className="font-bold text-slate-800 text-sm truncate">Taska</span>
            </div>
            {navIcons.map((Icon, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs ${
                  i === sidebarActiveIndex
                    ? 'bg-white shadow-sm text-slate-900 border border-slate-200/80'
                    : 'text-slate-400'
                }`}
              >
                <Icon size={15} className="shrink-0 opacity-80" />
                {i === sidebarActiveIndex ? (
                  <span className="truncate font-medium">{sidebarActiveLabel}</span>
                ) : (
                  <span className="truncate opacity-60">· · ·</span>
                )}
              </div>
            ))}
          </aside>

          {children}
        </div>
      </div>
    </motion.div>
  );
};
