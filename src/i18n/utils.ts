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
    const cleanSub = segments.join('/');

    if (targetLang === defaultLang) {
      return cleanSub ? `/${cleanSub}/` : '/';
    }
    return cleanSub ? `/${targetLang}/${cleanSub}/` : `/${targetLang}/`;
  };
}

export function getAlternateUrls(pathOrUrl: string, baseUrl = 'https://gradecalculatorfinalx.com') {
  let path = pathOrUrl;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    try {
      path = new URL(path).pathname;
    } catch {
      // fallback
    }
  }

  // Error pages and redirect aliases should not declare hreflang annotations
  if (
    path.includes('/404') ||
    path.includes('/500') ||
    path === '/privacy' ||
    path === '/privacy/' ||
    path === '/terms' ||
    path === '/terms/'
  ) {
    return [];
  }

  // Strip any existing language prefix
  const segments = path.split('/').filter(Boolean);
  if (segments[0] && segments[0] in languages) {
    segments.shift();
  }
  const cleanSub = segments.join('/');
  const cleanPath = cleanSub ? `/${cleanSub}/` : '/';

  const alternates: { hreflang: string; href: string }[] = [];

  // Default English route
  alternates.push({
    hreflang: 'en',
    href: `${baseUrl}${cleanPath}`,
  });

  (Object.keys(languages) as Lang[]).forEach((l) => {
    if (l !== defaultLang) {
      alternates.push({
        hreflang: l,
        href: `${baseUrl}/${l}${cleanPath === '/' ? '/' : cleanPath}`,
      });
    }
  });

  alternates.push({
    hreflang: 'x-default',
    href: `${baseUrl}${cleanPath}`,
  });

  return alternates;
}
