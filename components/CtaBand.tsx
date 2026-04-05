import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from './Button';
import { trackMetrikaGoal } from '../services/metrics';
import { useLanguage } from '../contexts/LanguageContext';

type CtaBandProps = {
  title: string;
  subtitle: string;
  primaryLabel: string;
  onPrimary: () => void;
  demoHref?: string;
};

export const CtaBand: React.FC<CtaBandProps> = ({
  title,
  subtitle,
  primaryLabel,
  onPrimary,
  demoHref = 'https://demo.taska.uz',
}) => {
  const { t } = useLanguage();
  return (
    <div className="rounded-[1.75rem] border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/80 to-white px-6 md:px-10 py-8 md:py-10 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/[0.03]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left max-w-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-ink mb-2 tracking-tight">{title}</h3>
          <p className="text-ink-muted text-sm md:text-base leading-relaxed">{subtitle}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <Button onClick={onPrimary} className="w-full sm:w-auto" icon={<ArrowRight size={18} />}>
            {primaryLabel}
          </Button>
          <a
            href={demoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
            onClick={() => trackMetrikaGoal('demo_click')}
          >
            <Button variant="secondary" className="w-full sm:w-auto gap-2" icon={<ExternalLink size={18} />}>
              {t('hero.demo')}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
