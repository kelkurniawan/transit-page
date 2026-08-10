"use client";

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';

export default function LanguageSwitcher({
  slugMap
}: {
  /**
   * Present only on article pages. Maps each locale to the paired article
   * slug for that locale (or null when no translation exists). When absent,
   * the toggle keeps the current pathname as-is (default behavior for every
   * non-article page).
   */
  slugMap?: Record<string, string | null>;
}) {
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
          onClick={() => {
            if (!slugMap) {
              router.replace(pathname, {locale: lang});
              return;
            }
            const target = slugMap[lang];
            router.replace(target ? `/blog/${target}` : '/blog', {locale: lang});
          }}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
