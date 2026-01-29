import React, { useState } from 'react';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Smartphone, Clock, LayoutDashboard } from 'lucide-react';
import { submitLead } from '../services/api';
import { formatUzPhone } from '../services/phone';

export const ContactForm: React.FC = () => {
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
      source: 'footer_form',
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

  return (
    <section id="contact" className="py-24 bg-surface-800 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-brand/5 to-transparent blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Хватит терять лиды <br/><span className="text-brand">на ровном месте.</span></h2>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">
              Мы не продаем "коробки". Мы проектируем цифровой позвоночник вашего бизнеса. 
              Оставьте заявку, и мы покажем, где вы теряете деньги прямо сейчас.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {[
                 { icon: Clock, title: "Запуск за 14 дней", desc: "MVP версия через 2 недели" },
                 { icon: Smartphone, title: "Mobile First", desc: "Удобно с телефона" },
                 { icon: LayoutDashboard, title: "Личный кабинет", desc: "Для вас и сотрудников" },
                 { icon: CheckCircle, title: "Гарантия", desc: "Поддержка 24/7" },
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
                Free Consultation
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
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Заявка принята!</h3>
                <p className="text-gray-500 mb-8">Менеджер Taska свяжется с вами по указанному номеру в ближайшее время.</p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Отправить еще одну
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Обсудить проект</h3>
                  <p className="text-sm text-gray-500">Заполните форму, это займет 30 секунд.</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <input 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-brand/20 focus:border-brand/50 outline-none transition-all focus:bg-white"
                      placeholder="Как вас зовут?"
                    />
                  </div>
                  <div>
                    <input 
                      required
                      value={contact}
                      onChange={(e) => setContact(formatUzPhone(e.target.value))}
                      type="tel" 
                      inputMode="tel"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-brand/20 focus:border-brand/50 outline-none transition-all focus:bg-white"
                      placeholder="+998 90 123 45 67"
                    />
                  </div>
                  <div>
                    <textarea 
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-brand/20 focus:border-brand/50 outline-none transition-all resize-none focus:bg-white"
                      placeholder="Кратко о задаче (например: нужна CRM для салона красоты)"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full text-lg h-14" 
                  disabled={isLoading}
                  icon={isLoading ? undefined : <Send size={20} />}
                >
                  {isLoading ? 'Отправляем...' : 'Получить разбор'}
                </Button>
                
                <p className="text-[10px] text-gray-400 text-center">
                  Ваши данные в безопасности. Мы не передаем их третьим лицам.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};