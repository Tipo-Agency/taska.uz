import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Puzzle, Headphones, Code2, Handshake } from 'lucide-react';
import { Button } from '../components/Button';
import { MarketingPageShell } from '../components/MarketingPageShell';
import { useLanguage } from '../contexts/LanguageContext';
import type { AppOutletContext } from '../layouts/AppLayout';

const PartnersPage: React.FC = () => {
  const { t } = useLanguage();
  const { openModal } = useOutletContext<AppOutletContext>();

  const icons = [Handshake, Puzzle, Code2, Headphones];
  const bullets = [t('service.partners.b1'), t('service.partners.b2'), t('service.partners.b3'), t('service.partners.b4')];

  const heroActions = (
    <Button size="md" className="w-full sm:w-auto min-w-[200px]" onClick={openModal} icon={<ArrowRight size={18} />}>
      {t('service.partners.cta')}
    </Button>
  );

  return (
    <MarketingPageShell
      accent="violet"
      kicker={t('service.partners.kicker')}
      title={t('service.partners.title')}
      lead={t('service.partners.lead')}
      heroActions={heroActions}
      onOpenModal={openModal}
      contentMaxWidth="3xl"
    >
      <div className="grid gap-4 md:gap-5">
        {bullets.map((text, i) => {
          const Icon = icons[i] ?? Puzzle;
          return (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-4 rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white to-violet-50/25 px-5 py-5 md:px-6 md:py-5 shadow-sm hover:border-violet-200/70 hover:shadow-lg transition-all duration-300"
            >
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-950 h-fit shrink-0">
                <Icon size={22} />
              </div>
              <p className="text-ink leading-relaxed pt-0.5 text-[15px] md:text-base">{text}</p>
            </motion.div>
          );
        })}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-ink-muted leading-relaxed mt-10 text-[15px] md:text-base"
      >
        {t('service.partners.outro')}
      </motion.p>
    </MarketingPageShell>
  );
};

export default PartnersPage;
