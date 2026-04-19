import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { CLIENT_LOGO_ITEMS } from '../config/clientLogos';

export const ClientLogos: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-canvas border-y border-slate-200/70" aria-label={t('home.clients.screenReader')}>
      <div className="container mx-auto px-4">
        <div
          className="overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] [scrollbar-color:rgb(148_163_184/0.9)_transparent]"
        >
          <div className="mx-auto flex w-max max-w-none flex-nowrap items-center justify-center gap-x-8 px-1 py-2 md:gap-x-11">
          {CLIENT_LOGO_ITEMS.map((item, i) => {
            const label = t(item.altKey);
            const inner = item.colorMask ? (
              <span
                className={`inline-block ${item.className ?? ''} max-w-[128px]`}
                style={{
                  backgroundColor: item.colorMask,
                  WebkitMaskImage: `url(${item.src})`,
                  maskImage: `url(${item.src})`,
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  minHeight: '1.75rem',
                }}
                role="img"
                aria-label={label}
              />
            ) : (
              <img
                src={item.src}
                alt={label}
                className={item.className}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={i === 0 ? 'high' : 'auto'}
              />
            );

            return (
              <motion.a
                key={item.altKey}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className={`group flex shrink-0 items-center justify-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 ${item.wrapperClass ?? ''}`}
              >
                <span className="inline-flex items-center justify-center transition-transform duration-200 ease-out will-change-transform group-hover:scale-110 origin-center">
                  {inner}
                </span>
              </motion.a>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};
