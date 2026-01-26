import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';

export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  keywords?: string;
  type?: 'website' | 'article' | 'video.movie';
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private meta = inject(Meta);
  private titleService = inject(Title);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private readonly defaultConfig: SeoConfig = {
    title: 'Movlix - Discover Movies & TV Shows',
    description:
      'Discover the latest movies and TV shows. Browse trending, popular, top rated, and upcoming movies. Watch trailers and manage your favorites.',
    image: `${environment.pageUrl}/assets/images/backdrop.png`,
    url: environment.pageUrl,
    keywords:
      'movies, tv shows, cinema, entertainment, trailers, movie database, watch movies, movie reviews',
    type: 'website',
  };

  updateMetaTags(config: Partial<SeoConfig>): void {
    const seoConfig: SeoConfig = { ...this.defaultConfig, ...config };

    // Set page title
    this.titleService.setTitle(seoConfig.title);

    // Standard meta tags
    this.meta.updateTag({
      name: 'description',
      content: seoConfig.description,
    });
    this.meta.updateTag({
      name: 'keywords',
      content: seoConfig.keywords || this.defaultConfig.keywords || '',
    });

    // Open Graph meta tags (Facebook, LinkedIn)
    this.meta.updateTag({ property: 'og:title', content: seoConfig.title });
    this.meta.updateTag({
      property: 'og:description',
      content: seoConfig.description,
    });
    this.meta.updateTag({
      property: 'og:type',
      content: seoConfig.type || 'website',
    });
    this.meta.updateTag({
      property: 'og:url',
      content: seoConfig.url || this.defaultConfig.url || '',
    });
    this.meta.updateTag({
      property: 'og:image',
      content: seoConfig.image || this.defaultConfig.image || '',
    });
    this.meta.updateTag({ property: 'og:site_name', content: 'Movlix' });

    // Twitter Card meta tags
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:title', content: seoConfig.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: seoConfig.description,
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: seoConfig.image || this.defaultConfig.image || '',
    });

    // Additional SEO tags
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'author', content: 'Movlix' });
    this.meta.updateTag({
      httpEquiv: 'Content-Type',
      content: 'text/html; charset=utf-8',
    });
    this.meta.updateTag({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    });
  }

  setCanonicalUrl(url: string): void {
    // Only run in browser
    if (!this.isBrowser) {
      return;
    }

    // Remove existing canonical link if any
    const existingLink = document.querySelector('link[rel="canonical"]');
    if (existingLink) {
      existingLink.remove();
    }

    // Add new canonical link
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }

  setJsonLd(data: any): void {
    // Only run in browser
    if (!this.isBrowser) {
      return;
    }

    // Remove existing JSON-LD if any
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]',
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Add new JSON-LD script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }
}
