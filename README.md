# OGImage Forge Pro (v1.0.0)

### Automated Open Graph & Social Media Card Studio

OGImage Forge Pro is an offline-first visual studio and CLI utility for generating production-ready 1200x630 pixel social cards for Twitter/X, LinkedIn, Facebook, and messaging platforms.

---

## Key Features

- **Standard 1200x630 Resolution**: Formatted to the optimal 1.91:1 aspect ratio across all major social networks and chat platforms.  
- **Pure Client-Side Rendering**: Uses SVG 2.0 and native HTML5 Canvas 2D rasterization for sub-50ms instant PNG and SVG downloads with zero server dependencies.  
- **5 Modern Curated Themes**:  
  - `dark_gradient`: Sleek dark cyber glassmorphism for modern SaaS products and startups.  
  - `minimal_light`: Clean editorial aesthetic for technical blogs and essays.  
  - `cyber_matrix`: High-contrast terminal green for developer utilities, security, and open source tools.  
  - `gold_fintech`: Dubai luxury and DIFC fintech corporate gold theme.  
  - `sunset_glow`: Vibrant sunset gradients for podcasts, creative portfolios, and media.  
- **Dynamic Tag Pills & Badges**: Automatic tag pill wrapping, category pill rendering, and brand/author alignment.  
- **Social Meta Tags Generator**: 1-click copy of ready-to-paste `<meta property="og:image">` and Twitter card tags.  
- **Static Site Automation CLI**: Python 3 script (`build/ogimage-cli.py`) that parses Markdown/MDX frontmatter and batch-generates cards for Next.js, Astro, Hugo, and 11ty.  
- **Privacy & Security**: Zero tracking, external telemetry, or subscription billing overhead.

---

## Directory Structure

2026-09-29-OGImage-Forge/

├── source-code/

│   ├── index.html                   \# Visual studio interface & canvas workspace

│   ├── css/

│   │   └── ogimage.css              \# Cyber dark UI, zoom controls & canvas styling

│   ├── js/

│   │   ├── og-renderer.js           \# SVG generator, themes & meta tag builder

│   │   └── app.js                   \# Application state binder & PNG exporter

│   └── templates/

│       ├── saas-product-launch.json \# Dark cyber gradient product launch preset

│       ├── tech-blog-post.json      \# Minimalist light editorial article preset

│       └── uae-fintech-announcement.json \# Dubai DIFC luxury fintech summit preset

├── build/

│   ├── ogimage-cli.py               \# Standalone Python CLI batch generator

│   └── ogimage-forge-v1.0.0.zip     \# Complete production release package

├── documentation/

│   ├── ARCHITECTURE.md              \# System design & rasterization architecture

│   ├── USER\_GUIDE.md                \# Operating guide & static site CI/CD integration

│   └── MONETIZATION\_AND\_MARKETING\_PLAYBOOK.md \# Commercial strategy & agency packages

├── screenshots/

│   ├── card-preview.svg             \# High-resolution vector preview of generated card

│   └── studio-preview.svg           \# High-resolution vector preview of the web studio

└── README.md                        \# Master repository documentation

---

## Quick Start

### 1\. Launch the Web Studio

Open `source-code/index.html` in any web browser. Double-clicking works immediately without installation.

### 2\. Command-Line Batch Generation

\# Validate a card configuration

python3 build/ogimage-cli.py \--input source-code/templates/saas-product-launch.json \--validate

\# Render an SVG card

python3 build/ogimage-cli.py \--input source-code/templates/saas-product-launch.json \--output card.svg

\# Batch-generate social cards from a folder of Markdown blog articles

python3 build/ogimage-cli.py \--markdown-dir ./content/posts \--output-dir ./public/og-images

---

## Specifications

- **Dimensions**: 1200 × 630 pixels (1.91 : 1 ratio)  
- **Supported Formats**: PNG (lossless raster) and SVG (infinite vector)  
- **Browser Compatibility**: Chrome 90+, Safari 14+, Firefox 88+, Edge 90+  
- **CLI Requirements**: Python 3.8+ (Zero third-party packages required)  
- **License**: MIT / Dual Commercial License