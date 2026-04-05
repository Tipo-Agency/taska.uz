import React from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle2, MoreVertical, Paperclip, Mic, Zap } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '../contexts/LanguageContext';

interface TelegramSectionProps {
  onOpenModal: () => void;
}

export const TelegramSection: React.FC<TelegramSectionProps> = ({ onOpenModal }) => {
  const { t } = useLanguage();
  const benefits = [
    { title: t('telegram.benefit1'), desc: t('telegram.benefit1Desc'), icon: Bell },
    { title: t('telegram.benefit2'), desc: t('telegram.benefit2Desc'), icon: Zap },
    { title: t('telegram.benefit3'), desc: t('telegram.benefit3Desc'), icon: CheckCircle2 },
  ];

  return (
    <section id="integration" className="py-24 md:py-28 relative overflow-hidden bg-canvas bg-mesh-canvas border-t border-slate-200/60">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.18] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,640px)] h-[min(90vw,640px)] bg-brand/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-14 lg:gap-16">
        <div className="flex-1 w-full max-w-[340px] lg:max-w-sm mx-auto lg:mx-0 shrink-0">
          <motion.div
            initial={{ y: 36, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-brand/25 to-transparent blur-2xl rounded-[3rem] scale-95" />
            <div className="bg-[#1C1C1E] rounded-[3rem] p-3 border-[8px] border-[#2C2C2E] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.45)] relative z-10 ring-1 ring-white/5">
              <div className="bg-[#0f0f0f] h-[min(72vh,620px)] rounded-[2.5rem] overflow-hidden flex flex-col relative border border-white/5">
                <div className="h-7 w-full flex justify-between px-6 items-center pt-2">
                  <span className="text-[10px] text-white font-medium">9:41</span>
                  <div className="flex gap-1.5">
                    <div className="w-4 h-2.5 bg-white rounded-[2px]" />
                  </div>
                </div>

                <div className="bg-[#1C1C1E]/80 backdrop-blur-md p-4 pb-3 flex items-center justify-between border-b border-white/5 z-20 sticky top-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand to-brand-light flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand/25">
                      T
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm leading-tight">Taska.uz Bot</h3>
                      <p className="text-brand-light text-xs">bot</p>
                    </div>
                  </div>
                  <MoreVertical className="text-gray-400" size={20} />
                </div>

                <div className="flex-1 p-4 space-y-6 overflow-hidden relative">
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />

                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-2 relative z-10"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand flex-shrink-0 flex items-center justify-center text-xs font-bold mt-auto mb-1 text-white">
                      T
                    </div>
                    <div className="bg-[#2C2C2E] p-3 rounded-2xl rounded-bl-sm max-w-[85%] text-sm text-gray-200 shadow-md border border-white/5">
                      <p>{t('telegram.goodMorning')}</p>
                      <ul className="mt-2 space-y-1 text-gray-400 text-xs">
                        <li>• {t('telegram.summary1')}</li>
                        <li>• {t('telegram.summary2')}</li>
                        <li>• {t('telegram.summary3')}</li>
                      </ul>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45 }}
                    className="bg-[#2C2C2E] p-4 rounded-2xl max-w-[92%] mx-auto relative z-10 border border-brand/25 shadow-lg shadow-brand/10"
                  >
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-emerald-400 font-bold text-xs uppercase tracking-wide">{t('telegram.newLead')}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500 shrink-0">{t('telegram.client')}</span>
                        <span className="text-white font-medium text-right">Stroy Invest LLC</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500 shrink-0">{t('telegram.budget')}</span>
                        <span className="text-white font-medium text-right">15 000 000 UZS</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500 shrink-0">{t('telegram.phone')}</span>
                        <span className="text-sky-400">+998 88 800 05 49</span>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        className="bg-brand hover:bg-brand-light text-white py-2 rounded-xl text-xs font-semibold transition-colors"
                      >
                        {t('telegram.accept')}
                      </button>
                      <button type="button" className="bg-[#3A3A3C] text-white py-2 rounded-xl text-xs font-semibold">
                        {t('telegram.toCrm')}
                      </button>
                    </div>
                  </motion.div>
                </div>

                <div className="bg-[#1C1C1E] p-3 pt-2 pb-6">
                  <div className="bg-[#2C2C2E] h-10 rounded-full px-2 flex items-center gap-2 border border-white/5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400">
                      <Paperclip size={20} />
                    </div>
                    <div className="flex-1 text-gray-500 text-sm">{t('telegram.placeholder')}</div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400">
                      <Mic size={20} />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white rounded-full opacity-20" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 w-full max-w-xl lg:max-w-none">
          <div className="rounded-[1.75rem] border border-slate-200/90 bg-white/90 backdrop-blur-sm p-8 md:p-10 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.14)]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand mb-4">{t('telegram.sectionKicker')}</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-[1.08] mb-5 text-ink tracking-tight">
              {t('telegram.title1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-dark">{t('telegram.title2')}</span>
            </h2>
            <p className="text-ink-muted text-base md:text-lg leading-relaxed mb-8">{t('telegram.subtitle')}</p>

            <div className="grid sm:grid-cols-1 gap-3 mb-10">
              {benefits.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * idx }}
                  className="flex gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 px-4 py-3.5 hover:border-brand/25 hover:bg-white transition-colors"
                >
                  <div className="mt-0.5 w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand shrink-0">
                    <item.icon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-ink font-bold text-sm md:text-base">{item.title}</h4>
                    <p className="text-ink-muted text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button size="md" onClick={onOpenModal} className="w-full sm:w-auto">
              {t('telegram.cta')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
