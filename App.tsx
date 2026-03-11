import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SystemModules } from './components/SystemModules';
import { ProcessSection } from './components/ProcessSection';
import { TelegramSection } from './components/TelegramSection';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { ContactForm } from './components/ContactForm';
import { Button } from './components/Button';
import { ArrowRight } from 'lucide-react';
import { trackMetrikaGoal } from './services/metrics';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    trackMetrikaGoal('click_form_open');
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-brand selection:text-white">
      <Header onOpenModal={openModal} />
      <main>
        <Hero onOpenModal={openModal} />
        <Features />
        <SystemModules />

        {/* Inline CTA after Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-3xl border border-gray-200 bg-gray-50/70 px-6 md:px-10 py-8 md:py-10 shadow-sm">
              <div className="text-left max-w-xl">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {t('cta.demoTitle')}
                </h3>
                <p className="text-gray-500 text-sm md:text-base">
                  {t('cta.demoSubtitle')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Button 
                  onClick={openModal}
                  className="w-full sm:w-auto"
                  icon={<ArrowRight size={18} />}
                >
                  {t('cta.leaveRequest')}
                </Button>
                <a
                  href="https://demo.taska.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                  onClick={() => trackMetrikaGoal('demo_click')}
                >
                  <Button
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    {t('hero.demo')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <ProcessSection />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-3xl border border-gray-200 bg-gray-50/70 px-6 md:px-10 py-8 md:py-10 shadow-sm">
              <div className="text-left max-w-xl">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {t('cta.automateTitle')}
                </h3>
                <p className="text-gray-500 text-sm md:text-base">
                  {t('cta.automateSubtitle')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Button 
                  onClick={openModal}
                  className="w-full sm:w-auto"
                  icon={<ArrowRight size={18} />}
                >
                  {t('cta.leaveContacts')}
                </Button>
                <a
                  href="https://demo.taska.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                  onClick={() => trackMetrikaGoal('demo_click')}
                >
                  <Button
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    {t('hero.demo')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <TelegramSection onOpenModal={openModal} />
        <ContactForm />
        <FAQ />
        
        {/* Redesigned CTA Section - Now at the bottom */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
             <div className="bg-brand rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
               {/* Decor */}
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[80px] rounded-full pointer-events-none -mr-20 -mt-20"></div>
               <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 blur-[80px] rounded-full pointer-events-none -ml-10 -mb-10"></div>
               <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                 <div className="text-left max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                      {t('cta.finalTitle')} <br/> {t('cta.finalTitle2')}
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
                      icon={<ArrowRight size={20}/>}
                   >
                      {t('cta.discussProject')}
                   </Button>
                   <a
                     href="https://demo.taska.uz"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-full sm:w-auto"
                     onClick={() => trackMetrikaGoal('demo_click')}
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
      <Footer />
      
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default App;