import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { submitLead } from '../services/api';
import { formatUzPhone } from '../services/phone';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await submitLead({
      name,
      contact,
      message,
      source: 'modal_form',
      date: new Date().toLocaleString('ru-RU')
    });

    if (success) {
      setSubmitted(true);
      setName('');
      setContact('');
      setMessage('');
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setSubmitted(false);
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
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-brand mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
                    <p className="text-gray-500 mb-6">Мы свяжемся с вами по указанному номеру в ближайшее время.</p>
                    <Button onClick={resetForm}>Отлично</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Начать проект</h3>
                      <p className="text-sm text-gray-500">Расскажите немного о задаче, и мы предложим решение.</p>
                    </div>

                    <div className="space-y-4">
                      <input 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text" 
                        placeholder="Ваше имя"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-brand/20 focus:border-brand/50 outline-none transition-all"
                      />
                      <input 
                        required
                        value={contact}
                        onChange={(e) => setContact(formatUzPhone(e.target.value))}
                        type="tel" 
                        inputMode="tel"
                        placeholder="+998 90 123 45 67"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-brand/20 focus:border-brand/50 outline-none transition-all"
                      />
                      <textarea 
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Какую задачу нужно решить? (например: автоматизация отдела продаж)"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-brand/20 focus:border-brand/50 outline-none transition-all resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full justify-center" 
                      disabled={isLoading}
                      icon={isLoading ? undefined : <Send size={18} />}
                    >
                      {isLoading ? 'Отправка...' : 'Отправить заявку'}
                    </Button>
                    
                    <p className="text-[10px] text-gray-400 text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
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