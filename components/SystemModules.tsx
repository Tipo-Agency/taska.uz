import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckSquare,
  Kanban,
  Workflow,
  Users,
  BarChart3,
  Banknote,
  BriefcaseBusiness,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const moduleIds = ['tasks', 'funnel', 'clients', 'finance', 'processes', 'analytics', 'team'] as const;
const moduleIcons = {
  tasks: CheckSquare,
  funnel: Kanban,
  clients: Users,
  finance: Banknote,
  processes: Workflow,
  analytics: BarChart3,
  team: BriefcaseBusiness,
};
const moduleColors: Record<string, string> = {
  tasks: 'text-emerald-600 bg-emerald-50',
  funnel: 'text-blue-600 bg-blue-50',
  clients: 'text-purple-600 bg-purple-50',
  finance: 'text-amber-600 bg-amber-50',
  processes: 'text-indigo-600 bg-indigo-50',
  analytics: 'text-sky-600 bg-sky-50',
  team: 'text-rose-600 bg-rose-50',
};

export const SystemModules: React.FC = () => {
  const { t } = useLanguage();
  const modules = moduleIds.map((id) => ({
    id,
    icon: moduleIcons[id],
    label: t(`modules.${id}.label`),
    color: moduleColors[id],
    title: t(`modules.${id}.title`),
    description: t(`modules.${id}.desc`),
    bullets: [t(`modules.${id}.b1`), t(`modules.${id}.b2`), t(`modules.${id}.b3`), t(`modules.${id}.b4`)],
  }));

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('modules.heading')} <span className="text-brand">Taska</span>
          </h2>
          <p className="text-gray-500 text-lg">
            {t('modules.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {modules.map((module, index) => (
            <motion.article
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`inline-flex items-center justify-center rounded-2xl px-3 py-2 text-xs font-semibold ${module.color}`}>
                  <module.icon size={18} className="mr-1.5" />
                  <span>{module.label}</span>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {module.title}
              </h3>
              <p className="text-gray-500 mb-4">{module.description}</p>

              <ul className="space-y-2 text-sm text-gray-600">
                {module.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 max-w-3xl border border-dashed border-brand/30 rounded-3xl px-6 md:px-10 py-8 bg-brand/3">
          <div className="text-sm font-semibold uppercase tracking-wide text-brand mb-2">
            {t('modules.custom.heading')}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {t('modules.custom.title')}
          </h3>
          <p className="text-gray-500 text-base">
            {t('modules.custom.desc')}
          </p>
        </div>
      </div>
    </section>
  );
};

