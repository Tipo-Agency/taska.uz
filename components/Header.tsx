import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  onOpenModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('header.nav.modules'), href: '#features' },
    { name: t('header.nav.processes'), href: '#processes' },
    { name: t('header.nav.telegram'), href: '#integration' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Close mobile menu first
    setIsMobileMenuOpen(false);

    // Handle scroll to top
    if (href === '#' || href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Handle scroll to section with safety check
    try {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.log('Navigation fallback');
    }
  };

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <header 
          role="banner"
          className={`pointer-events-auto transition-all duration-300 rounded-full border ${
            isScrolled 
              ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border-gray-100 py-3 px-6 w-full max-w-4xl' 
              : 'bg-transparent border-transparent py-4 px-4 w-full max-w-6xl'
          }`}
        >
          <div className="flex items-center justify-between">
            <a 
              href="#" 
              aria-label={t('header.home')}
              className="flex items-center gap-2 group" 
              onClick={(e) => scrollToSection(e, '#')}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 591 556" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M258.496 1.89275C253.854 4.06275 103.741 154.079 100.093 160.195C96.715 165.856 95.877 169.796 97.064 174.425C97.975 177.979 106.015 186.331 162.085 241.98C225.192 304.612 226.066 305.533 226.031 309.389C225.988 314.136 231.165 308.765 97.522 442.736C45.807 494.576 2.708 538.444 1.746 540.22C0.784002 541.996 -0.00199619 544.356 3.80837e-06 545.464C0.00500381 548.148 3.393 553.587 5.893 554.925C7.303 555.679 56.106 555.921 170.197 555.739C327.472 555.488 332.62 555.421 336.496 553.574C341.547 551.167 477.482 415.888 482.698 408.078C490.728 396.052 493.164 379.215 488.88 365.335C484.82 352.18 481.146 347.921 426.02 292.48C397.583 263.88 373.769 239.451 373.101 238.192C372.432 236.934 372.13 235.132 372.43 234.188C372.73 233.244 422.029 183.436 481.985 123.504C581.696 23.8328 590.996 14.2607 590.996 11.3057C590.996 6.83375 589.33 3.60775 586.006 1.64475C583.407 0.109749 570.673 -0.0182526 422.842 0.00174745C268.346 0.0227474 262.35 0.0917463 258.496 1.89275ZM375.393 155.23C343.99 186.718 317.329 213.778 316.146 215.365C313.408 219.039 313.202 227.274 315.753 231.085C316.711 232.518 347.631 264.132 384.463 301.339C421.295 338.547 451.992 369.999 452.678 371.234C457.278 379.517 449.506 392.537 441.172 390.508C439.437 390.086 421.612 373.081 390.496 342.165C341.937 293.918 300.527 253.019 247.246 200.684C225.076 178.908 217.996 171.374 217.996 169.561C217.996 167.743 226.085 159.206 251.746 133.94C270.309 115.664 286.846 100.113 288.496 99.3838C290.892 98.3248 305.684 98.0498 361.993 98.0188L432.489 97.9798L375.393 155.23ZM271.596 349.878C273.741 351.472 289.833 367.162 307.356 384.744C332.67 410.143 339.091 417.106 338.607 418.63C338.272 419.685 329.785 428.702 319.747 438.668C305.01 453.298 300.726 456.997 297.496 457.878C292.284 459.299 158.28 459.419 154.561 458.005C153.15 457.468 151.996 456.248 151.996 455.292C151.996 453.589 253.71 352.192 258.885 348.737C262.754 346.153 267.11 346.545 271.596 349.878Z" fill="#2C7E20"/>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Taska<span className="text-brand">.uz</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Desktop navigation">
              <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1 pr-2 mr-4 border border-gray-200">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white rounded-full transition-all cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2 mr-4">
                <button
                  type="button"
                  onClick={() => setLang('ru')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${lang === 'ru' ? 'bg-brand text-white' : 'text-gray-500 hover:bg-gray-200'}`}
                  aria-label="Русский"
                >
                  RU
                </button>
                <button
                  type="button"
                  onClick={() => setLang('uz')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${lang === 'uz' ? 'bg-brand text-white' : 'text-gray-500 hover:bg-gray-200'}`}
                  aria-label="O‘zbekcha"
                >
                  UZ
                </button>
              </div>
              <Button variant="primary" size="sm" onClick={onOpenModal}>
                {t('header.cta')}
              </Button>
            </nav>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden text-gray-800 p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? t('header.menu.close') : t('header.menu.open')}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-2xl font-bold text-gray-800 hover:text-brand"
                  onClick={(e) => scrollToSection(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-2 my-2">
                <button type="button" onClick={() => setLang('ru')} className={`flex-1 py-2 rounded-lg text-sm font-medium ${lang === 'ru' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600'}`}>RU</button>
                <button type="button" onClick={() => setLang('uz')} className={`flex-1 py-2 rounded-lg text-sm font-medium ${lang === 'uz' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600'}`}>UZ</button>
              </div>
              <div className="h-px bg-gray-200 w-full my-2"></div>
              <Button variant="primary" className="w-full text-lg py-4" onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenModal();
              }}>
                {t('header.startProject')}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};