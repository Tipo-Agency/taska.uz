import React, { useState } from 'react';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Smartphone, Clock, LayoutDashboard, Phone } from 'lucide-react';
import { submitLead } from '../services/api';
import { formatUzPhoneLocal, toFullUzPhone } from '../services/phone';
import { useLanguage } from '../contexts/LanguageContext';

const TG_URL = 'https://t.me/asdonskikh';
const PHONE = '+998888000549';

export const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const fullPhone = toFullUzPhone(contact);
    const success = await submitLead({
      name,
      contact: fullPhone,
      message: '',
      source: 'footer_form',
      date: new Date().toLocaleString('ru-RU')
    });
    if (success) {
      setSubmitted(true);
      setName('');
      setContact('');
    }
    setIsLoading(false);
  };

  return (
    <section id="contact" className="py-24 bg-surface-800 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-brand/5 to-transparent blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{t('contact.heading')} <br/><span className="text-brand">{t('contact.heading2')}</span></h2>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">
              {t('contact.subtitle')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {[
                 { icon: Clock, title: t('contact.launch'), desc: t('contact.launchDesc') },
                 { icon: Smartphone, title: t('contact.mobileFirst'), desc: t('contact.mobileFirstDesc') },
                 { icon: LayoutDashboard, title: t('contact.personalCabinet'), desc: t('contact.personalCabinetDesc') },
                 { icon: CheckCircle, title: t('contact.guarantee'), desc: t('contact.guaranteeDesc') },
               ].map((item, i) => (
                 <div key={i} className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-brand/30 hover:shadow-lg transition-all">
                    <item.icon className="text-brand mb-3" size={24} />
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl relative bg-white shadow-xl border border-gray-100">
            <div className="absolute -top-4 -right-4 bg-brand text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-bounce shadow-lg shadow-brand/30">
                {t('contact.freeConsult')}
            </div>

            <div className="flex gap-3 mb-6">
              <a href={TG_URL} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 hover:border-brand/50 hover:bg-brand/5 transition-colors text-gray-700 font-medium text-sm">
                <Send size={18} className="text-brand" />
                {t('contact.writeTg')}
              </a>
              <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 hover:border-brand/50 hover:bg-brand/5 transition-colors text-gray-700 font-medium text-sm">
                <Phone size={18} className="text-brand" />
                {t('contact.call')}
              </a>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-[400px] flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-brand mb-6 border border-brand/20">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('contact.successTitle')}</h3>
                <p className="text-gray-500 mb-8">{t('contact.successText')}</p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  {t('contact.sendAnother')}
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('contact.discussProject')}</h3>
                  <p className="text-sm text-gray-500">{t('contact.formHint')}</p>
                </div>
                
                <div>
                  <input 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-brand/20 focus:border-brand/50 outline-none transition-all focus:bg-white"
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>
                <div className="flex rounded-xl border border-gray-200 overflow-hidden bg-gray-50 focus-within:ring-2 focus-within:ring-brand/20 focus-within:border-brand/50 focus-within:bg-white">
                  <span className="flex items-center px-4 bg-gray-100 text-gray-600 border-r border-gray-200 text-base font-medium">+998</span>
                  <input 
                    required
                    value={contact}
                    onChange={(e) => setContact(formatUzPhoneLocal(e.target.value))}
                    type="tel" 
                    inputMode="numeric"
                    maxLength={12}
                    className="flex-1 bg-transparent px-5 py-4 text-gray-900 placeholder-gray-400 outline-none min-w-0"
                    placeholder="90 123 45 67"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full text-lg h-14" 
                  disabled={isLoading}
                  icon={isLoading ? undefined : <Send size={20} />}
                >
                  {isLoading ? t('contact.sending') : t('contact.submit')}
                </Button>
                
                <p className="text-[10px] text-gray-400 text-center">
                  {t('contact.privacy')}
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};