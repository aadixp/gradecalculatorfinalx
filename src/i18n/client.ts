import { ui, languages, type Lang, defaultLang } from './ui';
import { faqs } from './faqs';

export interface ClientI18n {
  ui: typeof ui;
  faqs: typeof faqs;
  languages: typeof languages;
  currentLang: Lang;
  t: (key: string, lang?: Lang) => string;
  setLanguage: (lang: Lang) => void;
}

declare global {
  interface Window {
    __i18n__: {
      ui: typeof ui;
      faqs: typeof faqs;
      languages: typeof languages;
      currentLang: Lang;
      t: (key: string, lang?: Lang) => string;
      setLanguage: (lang: Lang) => void;
    };
  }
}

export function initClientI18n(initialLang: Lang = 'en') {
  if (typeof window === 'undefined') return;

  function t(key: string, lang: Lang = window.__i18n__?.currentLang || initialLang): string {
    const dict = ui[lang] as Record<string, string> | undefined;
    if (dict && key in dict) {
      return dict[key];
    }
    const fallback = ui[defaultLang] as Record<string, string>;
    return fallback[key] || key;
  }

  function applyLanguageToDOM(lang: Lang) {
    document.documentElement.lang = lang;

    // 1. Text content
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = t(key, lang);
      }
    });

    // 2. HTML content
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (key) {
        el.innerHTML = t(key, lang);
      }
    });

    // 3. Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key && 'placeholder' in el) {
        (el as HTMLInputElement).placeholder = t(key, lang);
      }
    });

    // 4. Titles / Tooltips
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      if (key) {
        el.setAttribute('title', t(key, lang));
      }
    });

    // 5. Optgroup Labels
    document.querySelectorAll('[data-i18n-label]').forEach((el) => {
      const key = el.getAttribute('data-i18n-label');
      if (key) {
        el.setAttribute('label', t(key, lang));
      }
    });

    // 6. Aria Labels
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      if (key) {
        el.setAttribute('aria-label', t(key, lang));
      }
    });

    // 7. Dynamic FAQs
    const faqList = faqs[lang] || faqs.en;
    document.querySelectorAll('.faq-item').forEach((itemEl, idx) => {
      if (idx < faqList.length) {
        const qEl = itemEl.querySelector('.faq-question span, .faq-question');
        const aEl = itemEl.querySelector('.faq-answer');
        if (qEl) qEl.innerHTML = faqList[idx].question;
        if (aEl) aEl.innerHTML = faqList[idx].answer;
      }
    });

    // 8. Update language selectors
    document.querySelectorAll('#site-language-select').forEach((sel) => {
      const selectEl = sel as HTMLSelectElement;
      for (let i = 0; i < selectEl.options.length; i++) {
        const opt = selectEl.options[i];
        if (opt.value.includes(`/${lang}/`) || (lang === 'en' && (opt.value === '/' || opt.getAttribute('data-lang-code') === 'en'))) {
          selectEl.selectedIndex = i;
          break;
        }
      }
    });

    // 9. Update calculator menu select options hrefs
    document.querySelectorAll('#site-calculators-select option').forEach((opt) => {
      const optionEl = opt as HTMLOptionElement;
      const rawVal = optionEl.value;
      if (rawVal) {
        const segments = rawVal.split('/').filter(Boolean);
        if (segments[0] && segments[0] in languages) {
          segments.shift();
        }
        const cleanSub = segments.length ? segments.join('/') : '';
        optionEl.value = lang === 'en' ? `/${cleanSub}` : `/${lang}/${cleanSub}`;
      }
    });

    // 10. Update internal links hrefs
    document.querySelectorAll('a[href^="/"]').forEach((linkEl) => {
      const a = linkEl as HTMLAnchorElement;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('/#') || href.startsWith('//') || href.includes('mailto:') || href.includes('javascript:')) return;
      
      const segments = href.split('/').filter(Boolean);
      if (segments[0] && segments[0] in languages) {
        segments.shift();
      }
      const cleanSub = segments.join('/');
      const isAnchor = href.includes('#');
      const hashPart = isAnchor ? '#' + href.split('#')[1] : '';
      const baseClean = cleanSub.split('#')[0];
      
      const newHref = lang === 'en' 
        ? `/${baseClean}${baseClean ? '/' : ''}${hashPart}`
        : `/${lang}/${baseClean}${baseClean ? '/' : ''}${hashPart}`;
      
      a.setAttribute('href', newHref);
    });

    // 11. Update language badge text
    document.querySelectorAll('.lang-text-desktop').forEach((el) => {
      el.textContent = languages[lang] || 'English';
    });
    document.querySelectorAll('.lang-text-mobile').forEach((el) => {
      el.textContent = lang.toUpperCase();
    });

    // 12. Dispatch custom event so calculators and modules re-render
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  function setLanguage(newLang: Lang) {
    if (!languages[newLang]) return;
    try {
      localStorage.setItem('gradecalc_lang', newLang);
    } catch (e) {}

    // Update URL route cleanly
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] && segments[0] in languages) {
      segments.shift();
    }
    const cleanSubPath = segments.length ? segments.join('/') + '/' : '';
    const newPath = newLang === 'en' ? `/${cleanSubPath}` : `/${newLang}/${cleanSubPath}`;
    
    if (window.location.pathname !== newPath) {
      window.location.href = newPath + window.location.search + window.location.hash;
    } else {
      applyLanguageToDOM(newLang);
    }
  }

  window.__i18n__ = {
    ui,
    faqs,
    languages,
    currentLang: initialLang,
    t,
    setLanguage,
  };

  // Check saved preference on root homepage
  try {
    const saved = localStorage.getItem('gradecalc_lang') as Lang | null;
    if (saved && saved in languages && saved !== initialLang && initialLang === 'en' && (window.location.pathname === '/' || window.location.pathname === '')) {
      window.location.href = `/${saved}/`;
    }
  } catch (e) {}
}
