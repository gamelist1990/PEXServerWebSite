import { useEffect } from 'react';

export interface MetaTagsConfig {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
}

/**
 * Custom hook to dynamically update meta tags for each page
 * This enables proper OG (Open Graph) tags for social media sharing
 */
export function useMetaTags(config: MetaTagsConfig) {
  useEffect(() => {
    // Update document title
    if (config.title) {
      document.title = config.title;
    }

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = true) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Update description
    if (config.description) {
      updateMetaTag('description', config.description, false);
    }

    // Update OG tags
    if (config.ogTitle) {
      updateMetaTag('og:title', config.ogTitle);
    }

    if (config.ogDescription) {
      updateMetaTag('og:description', config.ogDescription);
    }

    if (config.ogType) {
      updateMetaTag('og:type', config.ogType);
    }

    if (config.ogImage) {
      updateMetaTag('og:image', config.ogImage);
    }

    // Update Twitter card
    if (config.twitterCard) {
      updateMetaTag('twitter:card', config.twitterCard, false);
    }
  }, [config]);
}
