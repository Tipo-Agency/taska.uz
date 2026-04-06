import React, { useState } from 'react';
import { X, Send, CheckCircle, Phone, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { submitLead } from '../services/api';
import { formatUzPhoneLocal, toFullUzPhone } from '../services/phone';
import { useLanguage } from '../contexts/LanguageContext';
import { SITE_CONTACT } from '../config/siteContact';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [outcome, setOutcome] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const fullPhone = toFullUzPhone(contact);
    const ok = await submitLead({
      name,
      contact: fullPhone,
      message: '',
      source: 'modal_form',
    });
    if (ok) {
      setOutcome('success');
      setSubmitted(true);
      setName('');
      setContact('');
    } else {
      setOutcome('error');
      setSubmitted(true);
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setSubmitted(false);
    setOutcome(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-[70] pointer-events-none p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-10">
                    {outcome === 'success' ? (
                      <>
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-brand mb-4">
                          <CheckCircle size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('modal.successTitle')}</h3>
                        <p className="text-gray-500 mb-6">{t('modal.successText')}</p>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-4 border border-red-200/80">
                          <XCircle size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('contact.errorTitle')}</h3>
                        <p className="text-gray-500 mb-6 text-sm leading-relaxed max-w-sm">{t('contact.errorText')}</p>
                      </>
                    )}
                    <Button onClick={resetForm}>{t('modal.ok')}</Button>
                  </div>
                ) : (
                  <form data-testid="contact-modal-form" onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('modal.startProject')}</h3>
                      <p className="text-sm text-gray-500 mb-4">{t('modal.hint')}</p>
                    </div>

                    <input 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text" 
                      placeholder={t('modal.namePlaceholder')}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-brand/20 focus:border-brand/50 outline-none transition-all"
                    />
                    <div className="flex rounded-xl border border-gray-200 overflow-hidden bg-gray-50 focus-within:ring-2 focus-within:ring-brand/20 focus-within:border-brand/50 focus-within:bg-white">
                      <span className="flex items-center px-4 bg-gray-100 text-gray-600 border-r border-gray-200 text-sm font-medium">+998</span>
                      <input 
                        required
                        value={contact}
                        onChange={(e) => setContact(formatUzPhoneLocal(e.target.value))}
                        type="tel" 
                        inputMode="numeric"
                        maxLength={12}
                        placeholder="90 123 45 67"
                        className="flex-1 bg-transparent px-4 py-3 text-gray-900 placeholder-gray-400 outline-none min-w-0"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full justify-center" 
                      disabled={isLoading}
                      icon={isLoading ? undefined : <Send size={18} />}
                    >
                      {isLoading ? t('modal.sending') : t('modal.submit')}
                    </Button>

                    <div className="flex gap-2">
                      <a href={SITE_CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 hover:border-brand/50 hover:bg-brand/5 transition-colors text-gray-700 font-medium text-sm">
                        <Send size={16} className="text-brand" />
                        {t('contact.writeTg')}
                      </a>
                      <a href={`tel:${SITE_CONTACT.phoneE164.replace(/\s/g, '')}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 hover:border-brand/50 hover:bg-brand/5 transition-colors text-gray-700 font-medium text-sm">
                        <Phone size={16} className="text-brand" />
                        {t('contact.call')}
                      </a>
                    </div>
                    
                    <p className="text-[10px] text-gray-400 text-center">
                      {t('modal.privacy')}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};