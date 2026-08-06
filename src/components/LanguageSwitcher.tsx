"use client";

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="lang-toggle">
      {(['id', 'en'] as const).map((lang) => (
        <button
          key={lang}
          className={locale === lang ? 'active' : undefined}
          aria-current={locale === lang ? 'true' : undefined}
          aria-label={lang === 'id' ? 'Bahasa Indonesia' : 'English'}
          onClick={() => router.replace(pathname, {locale: lang})}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
