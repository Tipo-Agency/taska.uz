import React, { useEffect } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ClientLogos } from '../components/ClientLogos';
import { Features } from '../components/Features';
import { SystemModules } from '../components/SystemModules';
import { ProcessSection } from '../components/ProcessSection';
import { TelegramSection } from '../components/TelegramSection';
import { HomeCasesTeaser } from '../components/HomeCasesTeaser';
import { HomeNewsTeaser } from '../components/HomeNewsTeaser';
import { FAQ } from '../components/FAQ';
import { ContactForm } from '../components/ContactForm';
import { Button } from '../components/Button';
import { CtaBand } from '../components/CtaBand';
import { ArrowRight } from 'lucide-react';
import { trackDemoClick } from '../services/analytics';
import { useLanguage } from '../contexts/LanguageContext';
import type { AppOutletContext } from '../layouts/AppLayout';

const HomePage: React.FC = () => {
  const { openModal } = useOutletContext<AppOutletContext>();
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;
    const tmr = window.setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    return () => window.clearTimeout(tmr);
  }, [location.pathname, location.hash]);

  return (
    <main>
      <Hero onOpenModal={openModal} />
      <ClientLogos />
      <Features />
      <SystemModules />

      <section className="py-16 bg-canvas border-t border-slate-200/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <CtaBand
            title={t('cta.demoTitle')}
            subtitle={t('cta.demoSubtitle')}
            primaryLabel={t('cta.leaveRequest')}
            onPrimary={openModal}
          />
        </div>
      </section>

      <ProcessSection />

      <section className="py-16 bg-canvas border-t border-slate-200/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <CtaBand
            title={t('cta.automateTitle')}
            subtitle={t('cta.automateSubtitle')}
            primaryLabel={t('cta.leaveContacts')}
            onPrimary={openModal}
          />
        </div>
      </section>

      <TelegramSection onOpenModal={openModal} />
      <HomeCasesTeaser />
      <HomeNewsTeaser />
      <ContactForm />
      <FAQ />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-brand rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[80px] rounded-full pointer-events-none -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 blur-[80px] rounded-full pointer-events-none -ml-10 -mb-10"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-left max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {t('cta.finalTitle')} <br /> {t('cta.finalTitle2')}
                </h2>
                <p className="text-white/80 text-lg md:text-xl font-medium mb-0">
                  {t('cta.finalSubtitle')}
                </p>
              </div>
              <div className="shrink-0 flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={openModal}
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
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-white/40 bg-transparent text-white hover:bg-white/10"
                  >
                    {t('hero.demo')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
