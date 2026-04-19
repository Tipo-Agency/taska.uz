import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../Button';
import { ContactForm } from '../ContactForm';
import { FAQ } from '../FAQ';
import { TelegramSection } from '../TelegramSection';
import { trackDemoClick } from '../../services/analytics';
import { useLanguage } from '../../contexts/LanguageContext';

type ModuleLandingFooterStackProps = {
  onOpenModal: () => void;
  /** Обертка секции с полосой «демо + заявка» (у части страниц без `border-t`). */
  demoCtaSectionClassName?: string;
};

/**
 * Общий хвост страниц модулей: CTA «демо», Telegram, форма, FAQ, финальный зелёный блок.
 */
export const ModuleLandingFooterStack: React.FC<ModuleLandingFooterStackProps> = ({
  onOpenModal,
  demoCtaSectionClassName = 'py-16 bg-white border-t border-slate-200/60',
}) => {
  const { t } = useLanguage();

  return (
    <>
      <section className={demoCtaSectionClassName}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-3xl border border-gray-200 bg-gray-50/70 px-6 md:px-10 py-8 md:py-10 shadow-sm max-w-5xl mx-auto">
            <div className="text-left max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t('cta.demoTitle')}</h3>
              <p className="text-gray-500 text-sm md:text-base">{t('cta.demoSubtitle')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button onClick={onOpenModal} className="w-full sm:w-auto" icon={<ArrowRight size={18} />}>
                {t('cta.leaveRequest')}
              </Button>
              <a
                href="https://demo.taska.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
                onClick={() => trackDemoClick()}
              >
                <Button variant="secondary" className="w-full sm:w-auto">
                  {t('hero.demo')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <TelegramSection onOpenModal={onOpenModal} />
      <ContactForm />
      <FAQ />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-brand rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl max-w-6xl mx-auto">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[80px] rounded-full pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 blur-[80px] rounded-full pointer-events-none -ml-10 -mb-10" />
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-left max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {t('cta.finalTitle')} <br /> {t('cta.finalTitle2')}
                </h2>
                <p className="text-white/80 text-lg md:text-xl font-medium">{t('cta.finalSubtitle')}</p>
              </div>
              <div className="shrink-0 flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={onOpenModal}
                  size="md"
                  className="bg-white !text-brand hover:bg-gray-100 border-none shadow-xl w-full sm:w-auto"
                  icon={<ArrowRight size={20} />}
                >
                  {t('cta.discussProject')}
                </Button>
                <a
                  href="https://demo.taska.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                  onClick={() => trackDemoClick()}
                >
                  <Button variant="outline" className="w-full sm:w-auto border-white/40 bg-transparent text-white hover:bg-white/10">
                    {t('hero.demo')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
