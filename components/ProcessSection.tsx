import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GitMerge, Mail, UserPlus, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ProcessSection: React.FC = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const items = [
    { title: t('process.noCode'), desc: t('process.noCodeDesc') },
    { title: t('process.autoActions'), desc: t('process.autoActionsDesc') },
    { title: t('process.bottlenecks'), desc: t('process.bottlenecksDesc') },
  ];

  const fadeIn = reduceMotion
    ? { initial: false }
    : {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-40px' },
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      };

  const cardEnter = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-20px' },
          transition: { duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section id="processes" className="py-24 bg-surface-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-1/2 w-full">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                {t('process.title1')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{t('process.title2')}</span>
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">{t('process.subtitle')}</p>

              <div className="space-y-6">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                      <Settings size={20} />
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-bold text-lg">{item.title}</h4>
                      <p className="text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 w-full max-w-lg lg:max-w-none mx-auto lg:mx-0">
            <motion.div
              {...(reduceMotion
                ? { initial: false }
                : {
                    initial: { opacity: 0, y: 12 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: '-40px' },
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  })}
              className="relative bg-white rounded-3xl border border-gray-200 shadow-2xl px-4 pt-20 pb-8 sm:px-6 sm:pb-10 bg-grid-pattern"
            >
              <div className="absolute top-4 left-4 right-4 min-h-11 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center px-3 py-2 gap-2 sm:gap-4 overflow-hidden">
                <div className="flex gap-1 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                </div>
                <div className="h-6 w-px bg-gray-200 shrink-0" />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs font-medium text-gray-500">
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <UserPlus size={14} /> {t('process.action')}
                  </span>
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <GitMerge size={14} /> {t('process.condition')}
                  </span>
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <Mail size={14} /> {t('process.send')}
                  </span>
                </div>
              </div>

              {/* Вертикальная схема + две ветки — без absolute в px (адаптив) */}
              <div className="flex flex-col items-center w-full max-w-sm sm:max-w-md mx-auto">
                <motion.div
                  {...cardEnter(0)}
                  className="w-full max-w-[12.5rem] sm:max-w-[13rem] rounded-2xl border border-gray-100 bg-white p-3 sm:p-4 shadow-lg flex items-center gap-2 sm:gap-3"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                    <UserPlus size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wide">{t('process.trigger')}</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-800 leading-snug">{t('process.newLead')}</div>
                  </div>
                </motion.div>

                <div className="w-0.5 h-5 sm:h-6 bg-slate-200 shrink-0" aria-hidden />

                <motion.div
                  {...cardEnter(0.06)}
                  className="w-full max-w-[14rem] sm:max-w-[15rem] rounded-2xl border border-yellow-200 bg-white p-3 sm:p-4 shadow-lg flex items-center gap-2 sm:gap-3"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                    <GitMerge size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wide">{t('process.check')}</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-800 leading-snug break-words">{t('process.budgetCheck')}</div>
                  </div>
                </motion.div>

                <div className="w-full flex justify-center gap-2 sm:gap-8 mt-3 sm:mt-4 items-stretch">
                  <div className="flex flex-col items-center gap-1 flex-1 min-w-0 max-w-[46%] sm:max-w-[9.5rem]">
                    <span className="text-[10px] sm:text-xs font-bold text-green-600 bg-white px-2 py-0.5 rounded border border-gray-100 shadow-sm">
                      {t('process.yes')}
                    </span>
                    <div className="w-0.5 h-4 sm:h-5 bg-slate-200 shrink-0" aria-hidden />
                    <motion.div
                      {...cardEnter(0.12)}
                      className="w-full rounded-2xl border border-gray-100 bg-white p-2.5 sm:p-3 shadow-lg flex items-start gap-2"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                        <UserPlus size={14} className="sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0 text-left">
                        <div className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase">{t('process.task')}</div>
                        <div className="text-[11px] sm:text-xs font-bold text-gray-800 leading-snug">{t('process.assignVip')}</div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex flex-col items-center gap-1 flex-1 min-w-0 max-w-[46%] sm:max-w-[9.5rem]">
                    <span className="text-[10px] sm:text-xs font-bold text-red-500 bg-white px-2 py-0.5 rounded border border-gray-100 shadow-sm">
                      {t('process.no')}
                    </span>
                    <div className="w-0.5 h-4 sm:h-5 bg-slate-200 shrink-0" aria-hidden />
                    <motion.div
                      {...cardEnter(0.14)}
                      className="w-full rounded-2xl border border-gray-100 bg-white p-2.5 sm:p-3 shadow-lg flex items-start gap-2"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <Mail size={14} className="sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0 text-left">
                        <div className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase">Email</div>
                        <div className="text-[11px] sm:text-xs font-bold text-gray-800 leading-snug">{t('process.autoPresentation')}</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
