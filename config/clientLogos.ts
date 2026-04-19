import logo22412 from '../logo/22412.svg';
import logo3132 from '../logo/3132.svg';
import logoBirusa from '../logo/birusa-0e4494.svg';
import logoChiranaAsia from '../logo/chirana-asia.png';
import logoHaier from '../logo/Haier_logo.svg';
import logoSemurg from '../logo/semurg.svg';
import logoUniquePrint from '../logo/uniqueprint.svg';

export type ClientLogoItem = {
  src: string;
  href: string;
  altKey:
    | 'home.clients.logoAlt1'
    | 'home.clients.logoAlt2'
    | 'home.clients.logoAlt3'
    | 'home.clients.logoAlt4'
    | 'home.clients.logoAlt5'
    | 'home.clients.logoAlt6'
    | 'home.clients.logoAlt7';
  className?: string;
  wrapperClass?: string;
  /** Fill logo shape with solid color (SVG is light on transparent). */
  colorMask?: string;
};

export const CLIENT_LOGO_ITEMS: ClientLogoItem[] = [
  {
    src: logoSemurg,
    href: 'https://www.semurginsurance.uz/ru',
    altKey: 'home.clients.logoAlt1',
    className: 'h-9 md:h-11 w-auto max-w-[140px] object-contain',
  },
  {
    src: logoHaier,
    href: 'https://haier.uz/',
    altKey: 'home.clients.logoAlt2',
    className: 'h-8 md:h-10 w-auto max-w-[120px] object-contain',
  },
  {
    src: logoBirusa,
    href: 'https://biryusa.ru/',
    altKey: 'home.clients.logoAlt3',
    className: 'h-7 md:h-9 w-auto max-w-[140px] object-contain',
  },
  {
    src: logo22412,
    href: 'https://fcriverclub.ru/',
    altKey: 'home.clients.logoAlt4',
    className: 'h-8 md:h-10 w-auto max-w-[100px] object-contain opacity-90',
  },
  {
    src: logo3132,
    href: 'https://tipa.uz/ru',
    altKey: 'home.clients.logoAlt5',
    className: 'h-8 md:h-10 w-auto max-w-[100px] object-contain opacity-90',
  },
  {
    src: logoChiranaAsia,
    href: 'https://www.chirana-asia.uz/',
    altKey: 'home.clients.logoAlt6',
    className: 'h-10 md:h-12 w-auto max-w-[120px] object-contain',
  },
  {
    src: logoUniquePrint,
    href: 'https://uniqueprint.uz/',
    altKey: 'home.clients.logoAlt7',
    className: 'h-7 md:h-9 w-auto max-w-[160px] object-contain',
  },
];
