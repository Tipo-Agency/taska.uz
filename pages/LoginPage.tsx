import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useNoIndexMeta } from '../hooks/useNoIndexMeta';
import { ExternalLink, ShieldCheck, Sparkles, LayoutDashboard } from 'lucide-react';
import { Button } from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { paths } from '../routes/paths';
import { trackDemoClick } from '../services/analytics';
import type { AppOutletContext } from '../layouts/AppLayout';

const LoginPage: React.FC = () => {
  useNoIndexMeta();
  const { t } = useLanguage();
  const { openModal } = useOutletContext<AppOutletContext>();

  const bullets = [
    { icon: LayoutDashboard, text: t('login.bullet1') },
    { icon: Sparkles, text: t('login.bullet2') },
    { icon: ShieldCheck, text: t('login.bullet3') },
  ];

  return (
    <main className="pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <p className="text-sm font-semibold text-brand uppercase tracking-wide mb-3">
          {t('login.kicker')}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {t('login.title')}
        </h1>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          {t('login.lead')}
        </p>

        <div className="grid gap-4 mb-12">
          {bullets.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex gap-4 items-start rounded-2xl border border-gray-100 bg-gray-50/80 px-5 py-4"
            >
              <div className="mt-0.5 rounded-xl bg-brand/10 p-2 text-brand">
                <Icon size={20} />
              </div>
              <p className="text-gray-700 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://demo.taska.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex sm:flex-initial"
            onClick={() => trackDemoClick()}
          >
            <Button className="w-full sm:w-auto gap-2" icon={<ExternalLink size={18} />}>
              {t('login.openDemo')}
            </Button>
          </a>
          <Button variant="secondary" className="w-full sm:w-auto" onClick={openModal}>
            {t('login.ctaDiscuss')}
          </Button>
        </div>

        <p className="mt-10 text-sm text-gray-500">
          <Link to={paths.home} className="text-brand font-medium hover:underline">
            {t('modulePage.back')}
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
