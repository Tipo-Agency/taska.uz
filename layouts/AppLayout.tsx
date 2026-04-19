import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { ScrollToTop } from '../components/ScrollToTop';
import { SeoHead } from '../components/SeoHead';
import { trackFormOpen } from '../services/analytics';

export type AppOutletContext = {
  openModal: () => void;
};

export const AppLayout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    trackFormOpen();
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const outletContext: AppOutletContext = { openModal };

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans antialiased selection:bg-brand/90 selection:text-white">
      <SeoHead />
      <ScrollToTop />
      <Header onOpenModal={openModal} />
      <Outlet context={outletContext} />
      <Footer />
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
