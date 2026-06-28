import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  titleKey?: string;
  description?: string;
  descKey?: string;
  keywords?: string;
  keywordsKey?: string;
  canonicalPath?: string;
}

const BASE_URL = 'https://firecalc.nextapi.pro';

export default function SEO({
  title,
  titleKey,
  description,
  descKey,
  keywords,
  keywordsKey,
  canonicalPath = '',
}: SEOProps = {}) {
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const resolvedTitle = titleKey ? t(titleKey) : title;
  const resolvedDesc = descKey ? t(descKey) : description;
  const resolvedKeywords = keywordsKey ? t(keywordsKey) : keywords;

  const path = canonicalPath || location.pathname;
  const url = `${BASE_URL}${path}`;

  useEffect(() => {
    // Update lang attribute
    document.documentElement.lang = lang;

    // Update title
    if (resolvedTitle) {
      document.title = resolvedTitle;
    }

    // Update meta tags
    if (resolvedDesc) {
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) descMeta.setAttribute('content', resolvedDesc);
      
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', resolvedDesc);
      
      const twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (twitterDesc) twitterDesc.setAttribute('content', resolvedDesc);
    }

    if (resolvedKeywords) {
      const keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta) keywordsMeta.setAttribute('content', resolvedKeywords);
    }

    // Update OG title
    if (resolvedTitle) {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', resolvedTitle);
      
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) twitterTitle.setAttribute('content', resolvedTitle);
    }

    // Update canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', url);

    // Update OG URL
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', url);

    // Update hreflang links
    const existingHreflangs = document.querySelectorAll('link[hreflang]');
    existingHreflangs.forEach(el => el.remove());

    const languages = [
      { lang: 'en', href: `${url}?lang=en` },
      { lang: 'zh', href: `${url}?lang=zh` },
      { lang: 'es', href: `${url}?lang=es` },
      { lang: 'ja', href: `${url}?lang=ja` },
      { lang: 'de', href: `${url}?lang=de` },
      { lang: 'fr', href: `${url}?lang=fr` },
      { lang: 'ru', href: `${url}?lang=ru` },
      { lang: 'pt', href: `${url}?lang=pt` },
      { lang: 'id', href: `${url}?lang=id` },
      { lang: 'ar', href: `${url}?lang=ar` },
      { lang: 'x-default', href: url },
    ];

    languages.forEach(({ lang: l, href }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.setAttribute('hreflang', l);
      link.href = href;
      document.head.appendChild(link);
    });
  }, [resolvedTitle, resolvedDesc, resolvedKeywords, url, lang]);

  return null;
}
