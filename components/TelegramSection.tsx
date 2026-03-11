import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MoreVertical, Paperclip, Mic } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '../contexts/LanguageContext';

interface TelegramSectionProps {
  onOpenModal: () => void;
}

export const TelegramSection: React.FC<TelegramSectionProps> = ({ onOpenModal }) => {
  const { t } = useLanguage();
  return (
    <section id="integration" className="py-32 bg-white overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-brand/5 blur-[120px] -translate-y-1/2 rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-20 relative z-10">
        
        {/* Phone Mockup - Left Side on Desktop */}
        <div className="flex-1 w-full max-w-sm mx-auto md:mx-0">
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
             {/* Glow behind phone */}
            <div className="absolute inset-0 bg-brand/20 blur-3xl rounded-full transform scale-90"></div>

            <div className="bg-[#1C1C1E] rounded-[3rem] p-3 border-[8px] border-[#2C2C2E] shadow-2xl relative z-10">
              {/* Phone Internal */}
              <div className="bg-[#0f0f0f] h-[650px] rounded-[2.5rem] overflow-hidden flex flex-col relative border border-white/5">
                
                {/* Status Bar */}
                <div className="h-7 w-full flex justify-between px-6 items-center pt-2">
                    <span className="text-[10px] text-white font-medium">9:41</span>
                    <div className="flex gap-1.5">
                        <div className="w-4 h-2.5 bg-white rounded-[2px]"></div>
                    </div>
                </div>

                {/* TG Header */}
                <div className="bg-[#1C1C1E]/80 backdrop-blur-md p-4 pb-3 flex items-center justify-between border-b border-white/5 z-20 sticky top-0">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand to-brand-light flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand/20">
                        T
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm leading-tight">Taska.uz Bot</h3>
                        <p className="text-brand-light text-xs">bot</p>
                      </div>
                   </div>
                   <MoreVertical className="text-gray-400" size={20} />
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-4 space-y-6 overflow-hidden relative">
                  {/* Pattern */}
                  <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                  {/* Messages */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-2"
                  >
                     <div className="w-8 h-8 rounded-full bg-brand flex-shrink-0 flex items-center justify-center text-xs font-bold mt-auto mb-1 text-white">T</div>
                     <div className="bg-[#2C2C2E] p-3 rounded-2xl rounded-bl-sm max-w-[85%] text-sm text-gray-200 shadow-md">
                        <p>{t('telegram.goodMorning')}</p>
                        <ul className="mt-2 space-y-1 text-gray-400 text-xs">
                            <li>• {t('telegram.summary1')}</li>
                            <li>• {t('telegram.summary2')}</li>
                            <li>• {t('telegram.summary3')}</li>
                        </ul>
                     </div>
                  </motion.div>

                  <motion.div 
                     initial={{ opacity: 0, scale: 0.9, y: 10 }}
                     whileInView={{ opacity: 1, scale: 1, y: 0 }}
                     transition={{ delay: 0.8 }}
                     className="bg-[#2C2C2E] p-4 rounded-2xl max-w-[90%] mx-auto relative z-10 border border-brand/20 shadow-lg shadow-brand/5"
                  >
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-green-500 font-bold text-xs uppercase tracking-wide">{t('telegram.newLead')}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">{t('telegram.client')}</span>
                            <span className="text-white font-medium">Stroy Invest LLC</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">{t('telegram.budget')}</span>
                            <span className="text-white font-medium">15 000 000 UZS</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">{t('telegram.phone')}</span>
                            <span className="text-blue-400">+998 88 800 05 49</span>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                       <button type="button" className="bg-brand hover:bg-brand-light text-white py-2 rounded-lg text-xs font-medium transition-colors">{t('telegram.accept')}</button>
                       <button type="button" className="bg-[#3A3A3C] text-white py-2 rounded-lg text-xs font-medium">{t('telegram.toCrm')}</button>
                    </div>
                  </motion.div>

                </div>

                {/* Input Area */}
                <div className="bg-[#1C1C1E] p-3 pt-2 pb-6">
                   <div className="bg-[#2C2C2E] h-10 rounded-full px-2 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                         <Paperclip size={20} />
                      </div>
                      <div className="flex-1 text-gray-500 text-sm">{t('telegram.placeholder')}</div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400">
                         <Mic size={20} />
                      </div>
                   </div>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white rounded-full opacity-20"></div>

              </div>
            </div>
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
            {t('telegram.title1')} <br/>
            <span className="text-brand">{t('telegram.title2')}</span>
          </h2>
          
          <p className="text-gray-500 text-lg leading-relaxed mb-8">
            {t('telegram.subtitle')}
          </p>
          
          <div className="space-y-6 mb-10">
            {[
              { title: t('telegram.benefit1'), desc: t('telegram.benefit1Desc') },
              { title: t('telegram.benefit2'), desc: t('telegram.benefit2Desc') },
              { title: t('telegram.benefit3'), desc: t('telegram.benefit3Desc') },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="mt-1 w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center text-brand shrink-0">
                  <CheckCircle2 size={14} strokeWidth={3} />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold">{item.title}</h4>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Button size="md" onClick={onOpenModal}>
            {t('telegram.cta')}
          </Button>
        </div>

      </div>
    </section>
  );
};