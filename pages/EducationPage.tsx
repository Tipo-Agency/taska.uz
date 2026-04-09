import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Factory,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  ListTodo,
  Package,
  Users,
  Users2,
  Wallet,
  Workflow,
} from 'lucide-react';
import { Button } from '../components/Button';
import { MarketingPageShell } from '../components/MarketingPageShell';
import { useLanguage } from '../contexts/LanguageContext';
import type { AppOutletContext } from '../layouts/AppLayout';

const EducationPage: React.FC = () => {
  const { t } = useLanguage();
  const { openModal } = useOutletContext<AppOutletContext>();

  const programItems = [
    { icon: GraduationCap, text: t('service.education.p1') },
    { icon: Users, text: t('service.education.p2') },
    { icon: BookOpen, text: t('service.education.p3') },
    { icon: CheckCircle2, text: t('service.education.p4') },
  ];

  const moduleCards = [
    { icon: LayoutDashboard, title: t('service.education.m1Title'), body: t('service.education.m1Body') },
    { icon: CalendarDays, title: t('service.education.m2Title'), body: t('service.education.m2Body') },
    { icon: FolderKanban, title: t('service.education.m3Title'), body: t('service.education.m3Body') },
    { icon: ListTodo, title: t('service.education.m4Title'), body: t('service.education.m4Body') },
    { icon: Wallet, title: t('service.education.m5Title'), body: t('service.education.m5Body') },
    { icon: Workflow, title: t('service.education.m6Title'), body: t('service.education.m6Body') },
    { icon: Factory, title: t('service.education.m7Title'), body: t('service.education.m7Body') },
    { icon: Package, title: t('service.education.m8Title'), body: t('service.education.m8Body') },
    { icon: Users2, title: t('service.education.m9Title'), body: t('service.education.m9Body') },
  ];

  const outcomes = [
    t('service.education.o1'),
    t('service.education.o2'),
    t('service.education.o3'),
    t('service.education.o4'),
  ];

  const heroActions = (
    <Button size="md" className="w-full sm:w-auto min-w-[200px]" onClick={openModal} icon={<ArrowRight size={18} />}>
      {t('service.education.cta')}
    </Button>
  );

  return (
    <MarketingPageShell
      accent="indigo"
      kicker={t('service.education.kicker')}
      title={t('service.education.title')}
      lead={t('service.education.lead')}
      heroActions={heroActions}
      onOpenModal={openModal}
      contentMaxWidth="3xl"
    >
      <div className="space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white to-indigo-50/20 px-5 py-6 md:px-7 md:py-7 shadow-sm"
        >
          <h2 className="text-lg md:text-xl font-bold text-ink mb-4">{t('service.education.programTitle')}</h2>
          <div className="grid gap-3.5">
            {programItems.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-4"
              >
                <div className="rounded-xl bg-indigo-100 p-2.5 text-indigo-900 h-fit shrink-0">
                  <Icon size={20} />
                </div>
                <p className="text-ink leading-relaxed text-[15px] md:text-base">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/80 bg-white px-5 py-6 md:px-7 md:py-7 shadow-sm"
        >
          <h2 className="text-lg md:text-xl font-bold text-ink mb-2">{t('service.education.modulesTitle')}</h2>
          <p className="text-ink-muted text-[15px] md:text-base leading-relaxed mb-5">{t('service.education.modulesLead')}</p>
          <div className="grid gap-3.5 md:grid-cols-2">
            {moduleCards.map(({ icon: Icon, title, body }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/40 px-4 py-4"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-indigo-100 p-2.5 text-indigo-900 h-fit shrink-0">
                    <Icon size={19} />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-ink mb-1">{title}</h3>
                    <p className="text-ink-muted text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/80 bg-white px-5 py-6 md:px-7 md:py-7 shadow-sm"
        >
          <h2 className="text-lg md:text-xl font-bold text-ink mb-4">{t('service.education.resultsTitle')}</h2>
          <ul className="grid gap-3 text-ink-muted text-[15px] md:text-base leading-relaxed">
            {outcomes.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-indigo-700 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-ink-muted leading-relaxed mt-10 text-[15px] md:text-base"
      >
        {t('service.education.outro')}
      </motion.p>
    </MarketingPageShell>
  );
};

export default EducationPage;
