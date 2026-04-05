import React, { useState } from 'react';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Smartphone, Clock, LayoutDashboard, Phone, AlertTriangle, XCircle } from 'lucide-react';
import { submitLead } from '../services/api';
import { formatUzPhoneLocal, toFullUzPhone } from '../services/phone';
import { useLanguage } from '../contexts/LanguageContext';
import { SITE_CONTACT } from '../config/siteContact';

export const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  /** full — в CRM; telegram_only — только TG (прокси /api/deals не сработал) */
  const [outcome, setOutcome] = useState<'full' | 'telegram_only' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const fullPhone = toFullUzPhone(contact);
    const result = await submitLead({
      name,
      contact: fullPhone,
      message: '',
      source: 'footer_form',
      date: new Date().toLocaleString('ru-RU'),
    });
    if (result.crmOk) {
      setOutcome('full');
      setSubmitted(true);
      setName('');
      setContact('');
    } else if (result.telegramOk) {
      setOutcome('telegram_only');
      setSubmitted(true);
      setName('');
      setContact('');
    } else {
      setOutcome('error');
      setSubmitted(true);
    }
    setIsLoading(false);
  };

  const benefits = [
    { icon: Clock, title: t('contact.launch'), desc: t('contact.launchDesc') },
    { icon: Smartphone, title: t('contact.mobileFirst'), desc: t('contact.mobileFirstDesc') },
    { icon: LayoutDashboard, title: t('contact.personalCabinet'), desc: t('contact.personalCabinetDesc') },
    { icon: CheckCircle, title: t('contact.guarantee'), desc: t('contact.guaranteeDesc') },
  ];

  return (
    <section id="contact" className="py-24 md:py-28 relative overflow-hidden bg-canvas bg-mesh-canvas border-t border-slate-200/60">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.14] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[min(100%,560px)] h-[560px] bg-gradient-to-bl from-brand/[0.12] via-emerald-500/[0.06] to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-sky-500/[0.08] blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl md:text-5xl font-bold mb-5 text-ink tracking-tight leading-[1.1]"
            >
              {t('contact.heading')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-emerald-600 to-brand-dark">{t('contact.heading2')}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-ink-muted text-base md:text-lg mb-10 leading-relaxed max-w-xl"
            >
              {t('contact.subtitle')}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="group rounded-[1.25rem] border border-slate-200/90 bg-white/90 backdrop-blur-sm p-5 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.14)] hover:border-brand/25 hover:shadow-[0_22px_50px_-24px_rgba(22,101,52,0.12)] transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand/12 to-emerald-600/10 border border-brand/15 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <item.icon className="text-brand" size={22} strokeWidth={2} />
                  </div>
                  <h4 className="font-bold text-ink text-base mb-1">{item.title}</h4>
                  <p className="text-sm text-ink-muted leading-snug">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative rounded-[1.5rem] border border-slate-200/90 bg-white/95 backdrop-blur-md p-6 md:p-8 lg:p-10 shadow-[0_32px_80px_-32px_rgba(15,23,42,0.22)] ring-1 ring-slate-900/[0.04]"
          >
            <div className="absolute top-5 right-5 md:top-6 md:right-6 pointer-events-none">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-brand to-emerald-700 text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider shadow-lg shadow-brand/20">
                {t('contact.freeConsult')}
              </span>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-[380px] flex flex-col items-center justify-center text-center pt-8"
              >
                {outcome === 'full' ? (
                  <>
                    <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center text-brand mb-6 border border-brand/20 shadow-inner">
                      <CheckCircle size={40} strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-bold text-ink mb-2">{t('contact.successTitle')}</h3>
                    <p className="text-ink-muted mb-8 max-w-sm">{t('contact.successText')}</p>
                  </>
                ) : outcome === 'telegram_only' ? (
                  <>
                    <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-700 mb-6 border border-amber-200/80 shadow-inner">
                      <AlertTriangle size={40} strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-bold text-ink mb-2">{t('contact.warnCrmTitle')}</h3>
                    <p className="text-ink-muted mb-8 max-w-sm text-[15px] leading-relaxed">{t('contact.warnCrmText')}</p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6 border border-red-200/80 shadow-inner">
                      <XCircle size={40} strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-bold text-ink mb-2">{t('contact.errorTitle')}</h3>
                    <p className="text-ink-muted mb-8 max-w-sm text-[15px] leading-relaxed">{t('contact.errorText')}</p>
                  </>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setOutcome(null);
                  }}
                >
                  {t('contact.sendAnother')}
                </Button>
              </motion.div>
            ) : (
              <form data-testid="contact-inline-form" onSubmit={handleSubmit} className="space-y-5 pt-2">
                <div>
                  <h3 className="text-2xl font-bold text-ink mb-2">{t('contact.discussProject')}</h3>
                  <p className="text-sm text-ink-muted">{t('contact.formHint')}</p>
                </div>

                <div>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="w-full bg-slate-50/90 border border-slate-200/90 rounded-xl px-5 py-4 text-ink placeholder:text-slate-400 focus:ring-2 focus:ring-brand/25 focus:border-brand/40 outline-none transition-all focus:bg-white"
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>
                <div className="flex rounded-xl border border-slate-200/90 overflow-hidden bg-slate-50/90 focus-within:ring-2 focus-within:ring-brand/25 focus-within:border-brand/40 focus-within:bg-white transition-all">
                  <span className="flex items-center px-4 bg-slate-100/90 text-slate-600 border-r border-slate-200/90 text-base font-semibold tabular-nums">+998</span>
                  <input
                    required
                    value={contact}
                    onChange={(e) => setContact(formatUzPhoneLocal(e.target.value))}
                    type="tel"
                    inputMode="numeric"
                    maxLength={12}
                    className="flex-1 bg-transparent px-5 py-4 text-ink placeholder:text-slate-400 outline-none min-w-0"
                    placeholder="90 123 45 67"
                  />
                </div>

                <Button type="submit" className="w-full text-lg h-14 shadow-lg shadow-brand/15" disabled={isLoading} icon={isLoading ? undefined : <Send size={20} />}>
                  {isLoading ? t('contact.sending') : t('contact.submit')}
                </Button>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={SITE_CONTACT.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border border-slate-200/90 bg-white hover:border-brand/35 hover:bg-brand/[0.04] transition-colors text-ink font-semibold text-sm"
                  >
                    <Send size={18} className="text-brand" />
                    {t('contact.writeTg')}
                  </a>
                  <a
                    href={`tel:${SITE_CONTACT.phoneE164.replace(/\s/g, '')}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border border-slate-200/90 bg-white hover:border-brand/35 hover:bg-brand/[0.04] transition-colors text-ink font-semibold text-sm"
                  >
                    <Phone size={18} className="text-brand" />
                    {t('contact.call')}
                  </a>
                </div>

                <p className="text-[11px] text-slate-500 text-center leading-relaxed">{t('contact.privacy')}</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
