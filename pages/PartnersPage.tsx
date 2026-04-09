import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeDollarSign,
  BookOpen,
  CheckCircle2,
  Code2,
  Handshake,
  Headphones,
  Puzzle,
  Rocket,
  Shield,
  Users,
  Workflow,
} from 'lucide-react';
import { Button } from '../components/Button';
import { MarketingPageShell } from '../components/MarketingPageShell';
import { useLanguage } from '../contexts/LanguageContext';
import type { AppOutletContext } from '../layouts/AppLayout';

const PartnersPage: React.FC = () => {
  const { t } = useLanguage();
  const { openModal } = useOutletContext<AppOutletContext>();

  const who = [
    { icon: Users, title: t('service.partners.w1Title'), body: t('service.partners.w1Body') },
    { icon: Workflow, title: t('service.partners.w2Title'), body: t('service.partners.w2Body') },
    { icon: Shield, title: t('service.partners.w3Title'), body: t('service.partners.w3Body') },
  ];

  const whatYouGet = [
    { icon: Puzzle, title: t('service.partners.g1Title'), body: t('service.partners.g1Body') },
    { icon: Code2, title: t('service.partners.g2Title'), body: t('service.partners.g2Body') },
    { icon: Headphones, title: t('service.partners.g3Title'), body: t('service.partners.g3Body') },
    { icon: BookOpen, title: t('service.partners.g4Title'), body: t('service.partners.g4Body') },
  ];

  const models = [
    { icon: BadgeDollarSign, title: t('service.partners.pm1Title'), body: t('service.partners.pm1Body') },
    { icon: Handshake, title: t('service.partners.pm2Title'), body: t('service.partners.pm2Body') },
    { icon: Rocket, title: t('service.partners.pm3Title'), body: t('service.partners.pm3Body') },
  ];

  const onboarding = [
    { title: t('service.partners.on1Title'), body: t('service.partners.on1Body') },
    { title: t('service.partners.on2Title'), body: t('service.partners.on2Body') },
    { title: t('service.partners.on3Title'), body: t('service.partners.on3Body') },
  ];

  const requirements = [
    t('service.partners.r1'),
    t('service.partners.r2'),
    t('service.partners.r3'),
    t('service.partners.r4'),
  ];

  const faq = [
    { q: t('service.partners.f1Q'), a: t('service.partners.f1A') },
    { q: t('service.partners.f2Q'), a: t('service.partners.f2A') },
    { q: t('service.partners.f3Q'), a: t('service.partners.f3A') },
    { q: t('service.partners.f4Q'), a: t('service.partners.f4A') },
  ];

  const heroActions = (
    <Button size="md" className="w-full sm:w-auto min-w-[200px]" onClick={openModal} icon={<ArrowRight size={18} />}>
      {t('service.partners.cta')}
    </Button>
  );

  return (
    <MarketingPageShell
      accent="violet"
      kicker={t('service.partners.kicker')}
      title={t('service.partners.title')}
      lead={t('service.partners.lead')}
      heroActions={heroActions}
      onOpenModal={openModal}
      contentMaxWidth="3xl"
    >
      <div className="space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/80 bg-white px-6 py-6 md:px-8 md:py-7 shadow-sm"
        >
          <h2 className="text-lg md:text-xl font-bold text-ink mb-2">{t('service.partners.whoTitle')}</h2>
          <p className="text-ink-muted leading-relaxed text-[15px] md:text-base mb-5">{t('service.partners.whoLead')}</p>
          <div className="grid gap-3.5 md:grid-cols-3">
            {who.map(({ icon: Icon, title, body }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-violet-50/25 px-5 py-4"
              >
                <div className="space-y-3">
                  <div className="rounded-xl bg-violet-100 p-2.5 text-violet-950 h-fit w-fit">
                    <Icon size={18} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm md:text-base font-semibold text-ink mb-1">{title}</h3>
                    <p className="text-ink-muted text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/80 bg-white px-6 py-6 md:px-8 md:py-7 shadow-sm"
        >
          <h2 className="text-lg md:text-xl font-bold text-ink mb-2">{t('service.partners.getTitle')}</h2>
          <p className="text-ink-muted leading-relaxed text-[15px] md:text-base mb-5">{t('service.partners.getLead')}</p>
          <div className="grid gap-3.5 md:grid-cols-2">
            {whatYouGet.map(({ icon: Icon, title, body }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-violet-50/25 px-5 py-4"
              >
                <div className="space-y-3">
                  <div className="rounded-xl bg-violet-100 p-2.5 text-violet-950 h-fit w-fit">
                    <Icon size={18} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm md:text-base font-semibold text-ink mb-1">{title}</h3>
                    <p className="text-ink-muted text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/80 bg-white px-6 py-6 md:px-8 md:py-7 shadow-sm"
        >
          <h2 className="text-lg md:text-xl font-bold text-ink mb-2">{t('service.partners.modelsTitle')}</h2>
          <p className="text-ink-muted leading-relaxed text-[15px] md:text-base mb-5">{t('service.partners.modelsLead')}</p>
          <div className="grid gap-3.5 md:grid-cols-3">
            {models.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-violet-50/25 px-5 py-4">
                <div className="space-y-3">
                  <div className="rounded-xl bg-violet-100 p-2.5 text-violet-950 h-fit w-fit">
                    <Icon size={18} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm md:text-base font-semibold text-ink mb-1">{title}</h3>
                    <p className="text-ink-muted text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/80 bg-white px-6 py-6 md:px-8 md:py-7 shadow-sm"
        >
          <h2 className="text-lg md:text-xl font-bold text-ink mb-4">{t('service.partners.onTitle')}</h2>
          <div className="grid gap-3.5">
            {onboarding.map(({ title, body }) => (
              <article key={title} className="rounded-2xl border border-slate-200/80 bg-white/90 px-5 py-4">
                <h3 className="text-sm md:text-base font-semibold text-ink mb-1">{title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/80 bg-white px-6 py-6 md:px-8 md:py-7 shadow-sm"
        >
          <h2 className="text-lg md:text-xl font-bold text-ink mb-4">{t('service.partners.reqTitle')}</h2>
          <ul className="grid gap-3 text-ink-muted text-[15px] md:text-base leading-relaxed">
            {requirements.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-violet-900 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/80 bg-white px-6 py-6 md:px-8 md:py-7 shadow-sm"
        >
          <h2 className="text-lg md:text-xl font-bold text-ink mb-4">{t('service.partners.faqTitle')}</h2>
          <div className="grid gap-3.5">
            {faq.map(({ q, a }) => (
              <article key={q} className="rounded-2xl border border-slate-200/80 bg-white/90 px-5 py-4">
                <h3 className="text-sm md:text-base font-semibold text-ink mb-1">{q}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{a}</p>
              </article>
            ))}
          </div>
        </motion.section>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-ink-muted leading-relaxed mt-10 text-[15px] md:text-base"
      >
        {t('service.partners.outro')}
      </motion.p>
    </MarketingPageShell>
  );
};

export default PartnersPage;
