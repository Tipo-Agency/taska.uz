import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckSquare, 
  Users, 
  FileText, 
  DollarSign, 
  Briefcase, 
  BarChart3,
  Bot
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Features: React.FC = () => {
  const { t } = useLanguage();
  const modules = [
    {
      title: t('features.taskManager'),
      desc: t('features.taskManagerDesc'),
      icon: CheckSquare,
      size: "large",
      bg: "bg-gradient-to-br from-white to-gray-50",
      accent: "text-blue-600 bg-blue-50"
    },
    {
      title: t('features.finance'),
      desc: t('features.financeDesc'),
      icon: DollarSign,
      size: "small",
      bg: "bg-white",
      accent: "text-green-600 bg-green-50"
    },
    {
      title: t('features.crmBase'),
      desc: t('features.crmBaseDesc'),
      icon: Users,
      size: "small",
      bg: "bg-white",
      accent: "text-purple-600 bg-purple-50"
    },
    {
      title: t('features.telegramBot'),
      desc: t('features.telegramBotDesc'),
      icon: Bot,
      size: "tall",
      bg: "bg-gradient-to-b from-brand/5 to-white border-brand/20",
      accent: "text-brand bg-brand/10"
    },
    {
      title: t('features.documents'),
      desc: t('features.documentsDesc'),
      icon: FileText,
      size: "small",
      bg: "bg-white",
      accent: "text-yellow-600 bg-yellow-50"
    },
    {
      title: t('features.hrKpi'),
      desc: t('features.hrKpiDesc'),
      icon: Briefcase,
      size: "small",
      bg: "bg-white",
      accent: "text-pink-600 bg-pink-50"
    },
    {
      title: t('features.ceoDashboard'),
      desc: t('features.ceoDashboardDesc'),
      icon: BarChart3,
      size: "wide",
      bg: "bg-white",
      accent: "text-orange-600 bg-orange-50"
    },
  ];

  return (
    <section id="features" className="py-24 bg-surface-800 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">
              {t('features.heading1')} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-dark">{t('features.heading2')}</span>
            </h2>
            <p className="text-gray-500 text-lg">
              {t('features.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4 md:h-[600px]">
          {modules.map((item, idx) => {
            let colClass = "md:col-span-1";
            let rowClass = "md:row-span-1";
            
            if (item.size === 'large') colClass = "md:col-span-2";
            if (item.size === 'wide') colClass = "md:col-span-3";
            if (item.size === 'tall') {
               colClass = "md:col-span-1";
               rowClass = "md:row-span-2";
            }

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`
                  group relative overflow-hidden rounded-3xl p-6 md:p-8 
                  border border-gray-200 hover:border-brand/30 hover:shadow-xl transition-all duration-300
                  ${colClass} ${rowClass} ${item.bg}
                `}
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl ${item.accent} group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon size={24} />
                    </div>
                    {item.size === 'tall' && (
                      <div className="px-2 py-1 rounded bg-brand text-white text-xs font-bold">{t('features.top')}</div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed group-hover:text-gray-600 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Decorative Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-brand/5 blur-[50px] group-hover:bg-brand/10 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};