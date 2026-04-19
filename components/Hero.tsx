import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../constants/motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from './Button';
import { HomeHeroTabsVisual } from './HomeHeroTabsVisual';
import { trackDemoClick } from '../services/analytics';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onOpenModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 md:pb-24 overflow-hidden bg-canvas bg-mesh-canvas">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.35] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 -left-24 w-[420px] h-[420px] bg-emerald-400/14 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 -right-24 w-[520px] h-[520px] bg-brand/10 blur-[110px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center mb-6 md:mb-10">
          <motion.p {...fadeUp(12)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand mb-4">
            {t('home.hero.kicker')}
          </motion.p>
          <motion.h1 {...fadeUp(16)} transition={{ delay: 0.05 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.1] tracking-tight mb-4 md:mb-5">
            {t('hero.title1')} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-dark">{t('hero.title2')}</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.12 }}
            className="h-1.5 w-20 md:w-28 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 mb-5 md:mb-6 mx-auto"
            aria-hidden="true"
          />
          <motion.p {...fadeUp(14)} transition={{ delay: 0.1 }} className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl mx-auto mb-6 md:mb-8">
            {t('hero.subtitle')}
          </motion.p>
          <motion.div {...fadeUp(12)} transition={{ delay: 0.15 }} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="md" className="w-full sm:w-auto min-w-[160px]" icon={<ArrowRight size={18} />} onClick={onOpenModal}>
              {t('hero.orderSystem')}
            </Button>
            <a
              href="https://demo.taska.uz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              onClick={() => trackDemoClick()}
            >
              <Button variant="secondary" size="md" className="w-full sm:w-auto min-w-[160px] gap-2" icon={<ExternalLink size={18} />}>
                {t('hero.demo')}
              </Button>
            </a>
          </motion.div>
        </div>

        <HomeHeroTabsVisual />
      </div>
    </section>
  );
};
