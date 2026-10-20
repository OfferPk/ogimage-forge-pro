# OGImage Forge Pro — Technical Architecture & Pipeline Specification

**Product Version**: 1.0.0  
**Release Date**: 2026-09-29  
**License**: MIT / Commercial Dual License

---

## 1\. System Overview

OGImage Forge Pro is an offline-capable, zero-infrastructure Open Graph social card generator and metadata studio. It produces standard 1200x630 pixel visual cards designed for Twitter/X summary large image cards, Facebook Open Graph, LinkedIn feeds, Discord embeds, and iMessage previews.

### Core Architectural Pillars:

1. **Zero-Dependency Vector & Raster Pipeline**: Generates scalable SVG 2.0 graphics and leverages the browser's native HTML5 Canvas 2D context (`toDataURL('image/png')`) to render 1200x630 PNG images locally in sub-50 milliseconds without headless browsers, Puppeteer, or server-side Node canvas binaries.  
2. **Deterministic Layout & Multi-Line Typography**: Uses SVG `foreignObject` with strict viewport wrapping for responsive text flow, tag pill rendering, and badge alignment across variable headline lengths.  
3. **Dual Runtime Interface**:  
   - **Interactive Web Studio**: Real-time visual editor with zoom viewport scaling (50%, 75%, 100%), theme selection, instant PNG/SVG download, and automated `<meta>` tag code generation.  
   - **Static Site Generator CLI (`ogimage-cli.py`)**: Standalone Python 3 automation tool that parses Markdown/MDX frontmatter and batch-generates cards during static site build workflows (Next.js, Astro, Hugo, 11ty).

---

## 2\. Directory Layout & Module Structure

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

## 3\. Social Media Specification Compliance

| Platform | Recommended Dimensions | Aspect Ratio | Maximum File Size | Card Format Type |
| :---- | :---- | :---- | :---- | :---- |
| **Twitter / X** | 1200 × 630 px | 1.91 : 1 | 5 MB | `summary_large_image` |
| **Facebook & Meta** | 1200 × 630 px | 1.91 : 1 | 8 MB | `og:image` |
| **LinkedIn** | 1200 × 627 px | 1.91 : 1 | 5 MB | Open Graph Protocol |
| **Slack / Discord** | 1200 × 630 px | 1.91 : 1 | Auto-scaled | Inline Media Embed |
| **iMessage & WhatsApp** | 1200 × 630 px | 1.91 : 1 | 2 MB | Rich Link Preview |

---

## 4\. Theme & Palette Specifications

| Theme Key | Visual Mood | Primary Background | Accent Color | Primary Text | Target Use Case |
| :---- | :---- | :---- | :---- | :---- | :---- |
| `dark_gradient` | Cyber Dark | `#090d16` to `#1e112e` | `#38bdf8` (Cyan) | `#f8fafc` | SaaS launches, developer utilities, AI products |
| `minimal_light` | Clean Editorial | `#f8fafc` to `#f1f5f9` | `#2563eb` (Royal Blue) | `#0f172a` | Engineering blogs, longform essays, case studies |
| `cyber_matrix` | Terminal Hacker | `#050a06` to `#0d1f11` | `#22c55e` (Emerald) | `#4ade80` | Devops, cybersecurity, CLI tools, open source |
| `gold_fintech` | Corporate Gold | `#0d0f17` to `#261f0d` | `#eab308` (Gold) | `#fef08a` | Financial services, GCC summits, luxury brands |
| `sunset_glow` | Creative Vibrant | `#18091e` to `#431407` | `#f43f5e` (Rose) | `#ffffff` | Podcasts, design systems, consumer newsletters |

