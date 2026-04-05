import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const DROPDOWN_TOP_GAP_CLASS = 'pt-5';

/** Было 28rem — увеличено в 1.8 раза */
const PANEL_WIDTH_CLASS = 'w-[min(100vw-2rem,50.4rem)]';

const tileCardClass =
  'group relative flex gap-3 rounded-2xl border border-slate-200/90 bg-slate-50 px-3.5 py-2.5 transition-all duration-200 hover:border-emerald-200 hover:bg-white hover:shadow-md hover:shadow-emerald-900/[0.06]';

type HeaderNavDropdownTileProps = {
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBoxClassName: string;
  onNavigate: () => void;
};

/** Единая плитка: иконка + заголовок + подпись (сетка в родителе). */
export const HeaderNavDropdownTile: React.FC<HeaderNavDropdownTileProps> = ({
  to,
  title,
  description,
  icon,
  iconBoxClassName,
  onNavigate,
}) => (
  <Link to={to} className={tileCardClass} onClick={onNavigate}>
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBoxClassName}`}
      aria-hidden
    >
      {icon}
    </span>
    <span className="min-w-0 flex-1 pt-0.5 relative pl-2">
      <span
        className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-brand opacity-0 group-hover:opacity-100 transition-opacity"
        aria-hidden
      />
      <span className="block text-sm font-semibold text-ink leading-snug group-hover:text-brand transition-colors">
        {title}
      </span>
      <span className="block text-xs text-ink-muted mt-1 line-clamp-2 leading-relaxed">{description}</span>
    </span>
  </Link>
);

type HeaderNavDropdownProps = {
  open: boolean;
  /** Стабильный key для exit-анимации AnimatePresence */
  instanceKey: string;
  kicker: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  bodyClassName: string;
  bodyMaxHeightClass?: string;
};

/**
 * Выпадашка навигации: всегда по центру триггера (под стрелкой), непрозрачная панель.
 */
export const HeaderNavDropdown: React.FC<HeaderNavDropdownProps> = ({
  open,
  instanceKey,
  kicker,
  title,
  description,
  icon,
  children,
  footer,
  bodyClassName,
  bodyMaxHeightClass = 'max-h-[min(72vh,28rem)]',
}) => {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key={instanceKey}
          className={`absolute top-full ${DROPDOWN_TOP_GAP_CLASS} z-[60] ${PANEL_WIDTH_CLASS}`}
          style={{ left: '50%' }}
          initial={{ opacity: 0, y: 8, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 8, x: '-50%' }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="rounded-3xl border border-emerald-200/80 bg-white shadow-[0_24px_60px_-12px_rgba(15,80,40,0.16)] overflow-hidden ring-1 ring-emerald-900/[0.06]">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-emerald-100 bg-emerald-50">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-md shadow-brand/20">
                {icon}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-900/75 leading-tight">{kicker}</p>
                <p className="text-[15px] font-semibold text-ink leading-snug mt-0.5">{title}</p>
                {description ? (
                  <p className="text-xs text-ink-muted leading-relaxed mt-1 line-clamp-2">{description}</p>
                ) : null}
              </div>
            </div>

            <div className={`${bodyClassName} ${bodyMaxHeightClass} overflow-y-auto overflow-x-hidden`}>{children}</div>

            {footer ? <div className="border-t border-emerald-100 bg-slate-50">{footer}</div> : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
