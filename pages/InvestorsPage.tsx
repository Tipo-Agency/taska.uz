import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  Building2,
  CheckCircle2,
  Globe2,
  Layers3,
  LineChart,
  Rocket,
  Shield,
  Target,
  Users,
} from 'lucide-react';
import { Button } from '../components/Button';
import { MarketingPageShell } from '../components/MarketingPageShell';
import { useLanguage } from '../contexts/LanguageContext';
import type { AppOutletContext } from '../layouts/AppLayout';

const InvestorsPage: React.FC = () => {
  const { t } = useLanguage();
  const { openModal } = useOutletContext<AppOutletContext>();

  const thesis = [
    { icon: Layers3, title: t('service.investors.th1Title'), body: t('service.investors.th1Body') },
    { icon: Shield, title: t('service.investors.th2Title'), body: t('service.investors.th2Body') },
    { icon: Building2, title: t('service.investors.th3Title'), body: t('service.investors.th3Body') },
  ];

  const whyNow = [
    { icon: Globe2, text: t('service.investors.wn1') },
    { icon: Target, text: t('service.investors.wn2') },
    { icon: LineChart, text: t('service.investors.wn3') },
  ];

  const model = [
    { icon: BadgeDollarSign, title: t('service.investors.bm1Title'), body: t('service.investors.bm1Body') },
    { icon: BarChart3, title: t('service.investors.bm2Title'), body: t('service.investors.bm2Body') },
    { icon: Rocket, title: t('service.investors.bm3Title'), body: t('service.investors.bm3Body') },
  ];

  const moat = [
    t('service.investors.mo1'),
    t('service.investors.mo2'),
    t('service.investors.mo3'),
    t('service.investors.mo4'),
  ];

  const roadmap = [
    { title: t('service.investors.rd1Title'), body: t('service.investors.rd1Body') },
    { title: t('service.investors.rd2Title'), body: t('service.investors.rd2Body') },
    { title: t('service.investors.rd3Title'), body: t('service.investors.rd3Body') },
  ];

  const ask = [
    { icon: Users, title: t('service.investors.ask1Title'), body: t('service.investors.ask1Body') },
    { icon: Rocket, title: t('service.investors.ask2Title'), body: t('service.investors.ask2Body') },
    { icon: Shield, title: t('service.investors.ask3Title'), body: t('service.investors.ask3Body') },
  ];

  const heroActions = (
    <Button size="md" className="w-full sm:w-auto min-w-[200px]" onClick={openModal} icon={<ArrowRight size={18} />}>
      {t('service.investors.cta')}
    </Button>
  );

  return (
    <MarketingPageShell
      accent="cyan"
      kicker={t('service.investors.kicker')}
      title={t('service.investors.title')}
      lead={t('service.investors.lead')}
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
          <h2 className="text-lg md:text-xl font-bold text-ink mb-2">{t('service.investors.thesisTitle')}</h2>
          <p className="text-ink-muted leading-relaxed text-[15px] md:text-base mb-5">{t('service.investors.thesisLead')}</p>
          <div className="grid gap-3.5">
            {thesis.map(({ icon: Icon, title, body }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-cyan-50/25 px-5 py-4"
              >
                <div className="space-y-3">
                  <div className="rounded-xl bg-cyan-100 p-2.5 text-cyan-950 h-fit w-fit">
                    <Icon size={20} />
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
          <h2 className="text-lg md:text-xl font-bold text-ink mb-2">{t('service.investors.whyNowTitle')}</h2>
          <p className="text-ink-muted leading-relaxed text-[15px] md:text-base mb-5">{t('service.investors.whyNowLead')}</p>
          <div className="grid gap-3">
            {whyNow.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-2.5 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-4">
                <Icon size={18} className="text-cyan-900 mt-0.5 shrink-0" />
                <p className="text-ink-muted leading-relaxed text-[15px] md:text-base">{text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/80 bg-white px-6 py-6 md:px-8 md:py-7 shadow-sm"
        >
          <h2 className="text-lg md:text-xl font-bold text-ink mb-2">{t('service.investors.metricsTitle')}</h2>
          <p className="text-ink-muted leading-relaxed text-[15px] md:text-base">{t('service.investors.metricsBody')}</p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/80 bg-white px-6 py-6 md:px-8 md:py-7 shadow-sm"
        >
          <h2 className="text-lg md:text-xl font-bold text-ink mb-2">{t('service.investors.modelTitle')}</h2>
          <p className="text-ink-muted leading-relaxed text-[15px] md:text-base mb-5">{t('service.investors.modelLead')}</p>
          <div className="grid gap-3.5 md:grid-cols-3">
            {model.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-cyan-50/25 px-5 py-4">
                <div className="space-y-3">
                  <div className="rounded-xl bg-cyan-100 p-2.5 text-cyan-950 h-fit w-fit">
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
          <h2 className="text-lg md:text-xl font-bold text-ink mb-4">{t('service.investors.moatTitle')}</h2>
          <ul className="grid gap-3 text-ink-muted text-[15px] md:text-base leading-relaxed">
            {moat.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-cyan-900 mt-0.5 shrink-0" />
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
          <h2 className="text-lg md:text-xl font-bold text-ink mb-4">{t('service.investors.roadmapTitle')}</h2>
          <div className="grid gap-3.5">
            {roadmap.map(({ title, body }) => (
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
          className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white to-cyan-50/25 px-6 py-6 md:px-8 md:py-7 shadow-sm"
        >
          <h2 className="text-lg md:text-xl font-bold text-ink mb-2">{t('service.investors.askTitle')}</h2>
          <p className="text-ink-muted leading-relaxed text-[15px] md:text-base mb-5">{t('service.investors.askLead')}</p>
          <div className="grid gap-3.5 md:grid-cols-3">
            {ask.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-2xl border border-slate-200/80 bg-white/90 px-5 py-4">
                <div className="space-y-3">
                  <div className="rounded-xl bg-cyan-100 p-2.5 text-cyan-950 h-fit w-fit">
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
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-ink-muted leading-relaxed mt-10 text-[15px] md:text-base"
      >
        {t('service.investors.outro')}
      </motion.p>
    </MarketingPageShell>
  );
};

export default InvestorsPage;
