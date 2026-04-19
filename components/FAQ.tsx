import React, { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  contentId: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick, contentId }) => {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        type="button"
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-brand' : 'text-gray-900 group-hover:text-brand-dark'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 ml-4 p-1 rounded-full ${isOpen ? 'bg-brand/10 text-brand' : 'text-gray-400'}`}
          aria-hidden
        >
          <ChevronDown size={20} aria-hidden />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-500 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();
  const idPrefix = useId();
  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle size={14} aria-hidden />
            <span>{t('faq.badge')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-gray-500 text-lg">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              contentId={`${idPrefix}-faq-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};