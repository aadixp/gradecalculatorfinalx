import { ui, defaultLang, languages, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const segments = url.pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] as Lang;
  if (firstSegment && firstSegment in languages) {
    return firstSegment;
  }
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    const langDict = ui[lang] as Record<string, string> | undefined;
    if (langDict && key in langDict) {
      return langDict[key];
    }
    return ui[defaultLang][key] || (key as string);
  };
}

export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, targetLang: Lang = lang): string {
    // Strip any existing language prefix from path
    const segments = path.split('/').filter(Boolean);
    if (segments[0] && segments[0] in languages) {
      segments.shift();
    }
    const cleanPath = segments.length ? `/${segments.join('/')}/` : '';

    // If this is a dedicated subpage (e.g. /about/, /indian-cgpa-calculator/),
    // it only exists at the English route, so return it directly.
    if (cleanPath && cleanPath !== '/') {
      return cleanPath;
    }

    if (targetLang === defaultLang) {
      return '/';
    }
    return `/${targetLang}/`;
  };
}

export function getAlternateUrls(path: string, baseUrl = 'https://gradecalculatorfinalx.com') {
  // Strip any existing language prefix
  const segments = path.split('/').filter(Boolean);
  if (segments[0] && segments[0] in languages) {
    segments.shift();
  }
  const cleanPath = segments.length ? `/${segments.join('/')}/` : '';

  const alternates: { hreflang: string; href: string }[] = [];

  // If this is a dedicated subpage, only the canonical English version exists
  if (cleanPath && cleanPath !== '/') {
    alternates.push({
      hreflang: 'en',
      href: `${baseUrl}${cleanPath}`,
    });
    alternates.push({
      hreflang: 'x-default',
      href: `${baseUrl}${cleanPath}`,
    });
    return alternates;
  }

  // Root homepage alternates across all supported languages
  alternates.push({
    hreflang: 'en',
    href: `${baseUrl}/`,
  });

  (Object.keys(languages) as Lang[]).forEach((l) => {
    if (l !== defaultLang) {
      alternates.push({
        hreflang: l,
        href: `${baseUrl}/${l}/`,
      });
    }
  });

  alternates.push({
    hreflang: 'x-default',
    href: `${baseUrl}/`,
  });

  return alternates;
}
