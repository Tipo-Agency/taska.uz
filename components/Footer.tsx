import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Send, Facebook } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MODULE_IDS, SOLUTION_SLUGS } from '../config/siteNavigation';
import { paths } from '../routes/paths';
import { SITE_CONTACT } from '../config/siteContact';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="relative bg-canvas border-t border-slate-200/70 pt-16 pb-10 text-ink overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/50 to-transparent" aria-hidden />
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to={paths.home} className="flex items-center gap-2 mb-4 group" aria-label={t('header.home')}>
              <div className="w-8 h-8 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 591 556" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M258.496 1.89275C253.854 4.06275 103.741 154.079 100.093 160.195C96.715 165.856 95.877 169.796 97.064 174.425C97.975 177.979 106.015 186.331 162.085 241.98C225.192 304.612 226.066 305.533 226.031 309.389C225.988 314.136 231.165 308.765 97.522 442.736C45.807 494.576 2.708 538.444 1.746 540.22C0.784002 541.996 -0.00199619 544.356 3.80837e-06 545.464C0.00500381 548.148 3.393 553.587 5.893 554.925C7.303 555.679 56.106 555.921 170.197 555.739C327.472 555.488 332.62 555.421 336.496 553.574C341.547 551.167 477.482 415.888 482.698 408.078C490.728 396.052 493.164 379.215 488.88 365.335C484.82 352.18 481.146 347.921 426.02 292.48C397.583 263.88 373.769 239.451 373.101 238.192C372.432 236.934 372.13 235.132 372.43 234.188C372.73 233.244 422.029 183.436 481.985 123.504C581.696 23.8328 590.996 14.2607 590.996 11.3057C590.996 6.83375 589.33 3.60775 586.006 1.64475C583.407 0.109749 570.673 -0.0182526 422.842 0.00174745C268.346 0.0227474 262.35 0.0917463 258.496 1.89275ZM375.393 155.23C343.99 186.718 317.329 213.778 316.146 215.365C313.408 219.039 313.202 227.274 315.753 231.085C316.711 232.518 347.631 264.132 384.463 301.339C421.295 338.547 451.992 369.999 452.678 371.234C457.278 379.517 449.506 392.537 441.172 390.508C439.437 390.086 421.612 373.081 390.496 342.165C341.937 293.918 300.527 253.019 247.246 200.684C225.076 178.908 217.996 171.374 217.996 169.561C217.996 167.743 226.085 159.206 251.746 133.94C270.309 115.664 286.846 100.113 288.496 99.3838C290.892 98.3248 305.684 98.0498 361.993 98.0188L432.489 97.9798L375.393 155.23ZM271.596 349.878C273.741 351.472 289.833 367.162 307.356 384.744C332.67 410.143 339.091 417.106 338.607 418.63C338.272 419.685 329.785 428.702 319.747 438.668C305.01 453.298 300.726 456.997 297.496 457.878C292.284 459.299 158.28 459.419 154.561 458.005C153.15 457.468 151.996 456.248 151.996 455.292C151.996 453.589 253.71 352.192 258.885 348.737C262.754 346.153 267.11 346.545 271.596 349.878Z"
                    fill="#2C7E20"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-ink group-hover:text-brand transition-colors duration-200">
                Taska<span className="text-brand">.uz</span>
              </span>
            </Link>
            <p className="text-ink-muted text-sm leading-relaxed mb-6 max-w-xs">{t('footer.tagline')}</p>
            <div className="flex gap-4">
              <a
                href={SITE_CONTACT.telegramUrl}
                aria-label="Telegram"
                className="w-10 h-10 rounded-full bg-canvas-elevated border border-slate-200/90 flex items-center justify-center text-ink-muted hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 shadow-soft"
              >
                <Send size={18} />
              </a>
              <a
                href="https://www.instagram.com/taska.uz/"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-canvas-elevated border border-slate-200/90 flex items-center justify-center text-ink-muted hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 shadow-soft"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com/taska.uz"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-canvas-elevated border border-slate-200/90 flex items-center justify-center text-ink-muted hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 shadow-soft"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-ink font-semibold mb-5 tracking-tight">{t('footer.solutions')}</h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              {SOLUTION_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link to={paths.solution(slug)} className="hover:text-brand transition-colors duration-200">
                    {t(`solutions.${slug}.menu`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-ink font-semibold mb-5 tracking-tight">{t('footer.modules')}</h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              {MODULE_IDS.map((id) => (
                <li key={id}>
                  <Link to={paths.module(id)} className="hover:text-brand transition-colors duration-200">
                    {t(`modules.${id}.label`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-ink font-semibold mb-5 tracking-tight">{t('footer.company')}</h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li>
                <Link to={paths.work} className="hover:text-brand transition-colors duration-200">
                  {t('nav.work')}
                </Link>
              </li>
              <li>
                <Link to={paths.cases} className="hover:text-brand transition-colors duration-200">
                  {t('nav.cases')}
                </Link>
              </li>
              <li>
                <Link to={paths.news} className="hover:text-brand transition-colors duration-200">
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link to={paths.education} className="hover:text-brand transition-colors duration-200">
                  {t('footer.education')}
                </Link>
              </li>
              <li>
                <Link to={paths.investors} className="hover:text-brand transition-colors duration-200">
                  {t('footer.investors')}
                </Link>
              </li>
              <li>
                <Link to={paths.partners} className="hover:text-brand transition-colors duration-200">
                  {t('footer.partners')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-ink font-semibold mb-5 tracking-tight">{t('footer.contacts')}</h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li>Tashkent, Uzbekistan</li>
              <li>
                <a href={`tel:${SITE_CONTACT.phoneE164.replace(/\s/g, '')}`} className="hover:text-brand transition-colors duration-200 font-medium text-ink">
                  {SITE_CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_CONTACT.email}`} className="hover:text-brand transition-colors duration-200">
                  {SITE_CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200/70 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ink-muted/80 text-xs">
            © {new Date().getFullYear()} Taska.uz. {t('footer.copyright')}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-ink-muted/80">
            <Link to={paths.privacy} className="hover:text-ink transition-colors duration-200">
              {t('footer.privacy')}
            </Link>
            <Link to={paths.terms} className="hover:text-ink transition-colors duration-200">
              {t('footer.terms')}
            </Link>
            <Link to={paths.cookies} className="hover:text-ink transition-colors duration-200">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
