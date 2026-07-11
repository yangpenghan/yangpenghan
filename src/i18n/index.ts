import { ui, defaultLocale, languages, type Locale, type UIKey } from './ui';

export type { Locale, UIKey };
export { defaultLocale, languages };

/** Infer the current locale from a URL's pathname. */
export function getLocaleFromUrl(url: URL): Locale {
  const base = import.meta.env.BASE_URL; // '/yangpenghan/'
  const pathWithoutBase = url.pathname.replace(base, '');
  const [first] = pathWithoutBase.split('/');
  if (first === 'en') return 'en';
  return defaultLocale; // 'zh'
}

/** Return a translation function `t(key)` bound to the given locale. */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key] ?? key;
  };
}
