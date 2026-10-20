/**
 * OGImage Forge Pro - Core Open Graph & Social Card Rendering Engine
 * (c) 2026 OGImage Forge Pro. All rights reserved.
 */

(function(global) {
  'use strict';

  const THEMES = {
    dark_gradient: {
      name: 'Dark Cyber Gradient',
      bgType: 'gradient',
      bgGradient: 'linear-gradient(135deg, #090d16 0%, #111a2e 50%, #1e112e 100%)',
      cardBg: '#090d16',
      primaryText: '#f8fafc',
      secondaryText: '#94a3b8',
      accentColor: '#38bdf8',
      badgeBg: 'rgba(56, 189, 248, 0.15)',
      badgeBorder: '#0284c7',
      badgeText: '#38bdf8',
      tagBg: '#1e293b',
      tagText: '#cbd5e1'
    },
    minimal_light: {
      name: 'Editorial Minimal Light',
      bgType: 'solid',
      bgGradient: '#ffffff',
      cardBg: '#ffffff',
      primaryText: '#0f172a',
      secondaryText: '#475569',
      accentColor: '#2563eb',
      badgeBg: '#eff6ff',
      badgeBorder: '#bfdbfe',
      badgeText: '#1d4ed8',
      tagBg: '#f1f5f9',
      tagText: '#334155'
    },
    cyber_matrix: {
      name: 'Terminal & Hacker Green',
      bgType: 'gradient',
      bgGradient: 'linear-gradient(135deg, #050a06 0%, #0d1f11 50%, #030d06 100%)',
      cardBg: '#050a06',
      primaryText: '#4ade80',
      secondaryText: '#86efac',
      accentColor: '#22c55e',
      badgeBg: 'rgba(34, 197, 94, 0.15)',
      badgeBorder: '#16a34a',
      badgeText: '#4ade80',
      tagBg: '#0f2916',
      tagText: '#bbf7d0'
    },
    gold_fintech: {
      name: 'Dubai Luxury & Fintech Gold',
      bgType: 'gradient',
      bgGradient: 'linear-gradient(135deg, #0d0f17 0%, #1a1711 50%, #261f0d 100%)',
      cardBg: '#0d0f17',
      primaryText: '#fef08a',
      secondaryText: '#d4d4d8',
      accentColor: '#eab308',
      badgeBg: 'rgba(234, 179, 8, 0.15)',
      badgeBorder: '#ca8a04',
      badgeText: '#fde047',
      tagBg: '#272213',
      tagText: '#fef9c3'
    },
    sunset_glow: {
      name: 'Sunset Orange & Magenta',
      bgType: 'gradient',
      bgGradient: 'linear-gradient(135deg, #18091e 0%, #2e0821 50%, #431407 100%)',
      cardBg: '#18091e',
      primaryText: '#ffffff',
      secondaryText: '#fda4af',
      accentColor: '#f43f5e',
      badgeBg: 'rgba(244, 63, 94, 0.2)',
      badgeBorder: '#e11d48',
      badgeText: '#fb7185',
      tagBg: '#3b1227',
      tagText: '#fecdd3'
    }
  };

  class OGRenderer {
    constructor() {
      this.themes = THEMES;
    }

    escapeXml(text) {
      if (!text) return '';
      return String(text).replace(/[<>&"']/g, m => ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&apos;'
      }[m]));
    }

    generateSVG(config) {
      const themeKey = config.theme || 'dark_gradient';
      const theme = this.themes[themeKey] || this.themes.dark_gradient;

      const title = this.escapeXml(config.title || 'Mastering Modern Web Architecture in 2026');
      const desc = this.escapeXml(config.description || 'A comprehensive guide to zero-infrastructure systems, client-side computation, and scalable edge APIs.');
      const category = this.escapeXml((config.category || 'ARCHITECTURE').toUpperCase());
      const brand = this.escapeXml(config.brand || 'DevForge Studio');
      const author = this.escapeXml(config.author || 'Engineering Team');
      const readTime = this.escapeXml(config.readTime || '6 min read');
      const tags = (config.tags || ['Next.js', 'TypeScript', 'Web Workers', 'Edge']).slice(0, 5);

      // Tag SVG pills
      let tagPills = '';
      let tagX = 80;
      tags.forEach(tag => {
        const escapedTag = this.escapeXml(tag);
        const pillWidth = Math.max(70, escapedTag.length * 10 + 24);
        tagPills += `
          <g transform="translate(${tagX}, 475)">
            <rect width="${pillWidth}" height="32" rx="6" fill="${theme.tagBg}" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
            <text x="${pillWidth / 2}" y="20" fill="${theme.tagText}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" text-anchor="middle">${escapedTag}</text>
          </g>
        `;
        tagX += pillWidth + 12;
      });

      // SVG Definition
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <style>
      .title-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 54px; font-weight: 800; fill: ${theme.primaryText}; letter-spacing: -0.03em; line-height: 1.15; }
      .desc-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 400; fill: ${theme.secondaryText}; line-height: 1.4; }
      .brand-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 800; fill: ${theme.primaryText}; letter-spacing: -0.02em; }
      .meta-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 17px; font-weight: 600; fill: ${theme.secondaryText}; }
    </style>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      ${themeKey === 'dark_gradient' ? '<stop offset="0%" stop-color="#090d16" /><stop offset="50%" stop-color="#111a2e" /><stop offset="100%" stop-color="#1e112e" />' : ''}
      ${themeKey === 'minimal_light' ? '<stop offset="0%" stop-color="#f8fafc" /><stop offset="100%" stop-color="#f1f5f9" />' : ''}
      ${themeKey === 'cyber_matrix' ? '<stop offset="0%" stop-color="#050a06" /><stop offset="50%" stop-color="#0d1f11" /><stop offset="100%" stop-color="#030d06" />' : ''}
      ${themeKey === 'gold_fintech' ? '<stop offset="0%" stop-color="#0d0f17" /><stop offset="50%" stop-color="#1a1711" /><stop offset="100%" stop-color="#261f0d" />' : ''}
      ${themeKey === 'sunset_glow' ? '<stop offset="0%" stop-color="#18091e" /><stop offset="50%" stop-color="#2e0821" /><stop offset="100%" stop-color="#431407" />' : ''}
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="20" stdDeviation="30" flood-color="rgba(0,0,0,0.5)" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="url(#bgGradient)" />

  <!-- Outer Border Frame -->
  <rect x="24" y="24" width="1152" height="582" rx="16" fill="none" stroke="${theme.badgeBorder}" stroke-width="1.5" stroke-opacity="0.3" />

  <!-- Top Header Row -->
  <g transform="translate(80, 80)">
    <!-- Category Badge -->
    <rect width="${Math.max(100, category.length * 11 + 32)}" height="34" rx="6" fill="${theme.badgeBg}" stroke="${theme.badgeBorder}" stroke-width="1" />
    <text x="${Math.max(100, category.length * 11 + 32) / 2}" y="22" fill="${theme.badgeText}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" letter-spacing="1px" text-anchor="middle">${category}</text>

    <!-- Brand Name (Top Right) -->
    <text x="1040" y="23" class="brand-text" text-anchor="end">${brand}</text>
  </g>

  <!-- Main Headline (ForeignObject for automatic HTML word wrapping) -->
  <foreignObject x="80" y="150" width="1040" height="180">
    <div xmlns="http://www.w3.org/1999/xhtml" class="title-text" style="color: ${theme.primaryText};">
      ${title}
    </div>
  </foreignObject>

  <!-- Subtitle / Excerpt -->
  <foreignObject x="80" y="340" width="1040" height="110">
    <div xmlns="http://www.w3.org/1999/xhtml" class="desc-text" style="color: ${theme.secondaryText};">
      ${desc}
    </div>
  </foreignObject>

  <!-- Tag Pills -->
  ${tagPills}

  <!-- Footer Row (Author & Read Time) -->
  <g transform="translate(80, 560)">
    <circle cx="10" cy="-5" r="12" fill="${theme.accentColor}" />
    <text x="32" y="0" class="meta-text">${author}</text>
    <text x="1040" y="0" class="meta-text" text-anchor="end">${readTime}</text>
  </g>
</svg>`;
    }

    generateMetaTags(config, imageUrl = 'https://yourdomain.com/og-image.png') {
      const title = this.escapeXml(config.title || '');
      const desc = this.escapeXml(config.description || '');
      return `<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="${imageUrl}" />`;
    }
  }

  // Export
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { OGRenderer, THEMES };
  } else {
    global.OGRenderer = OGRenderer;
    global.THEMES = THEMES;
  }
})(typeof window !== 'undefined' ? window : this);
