# OGImage Forge Pro — User Guide & Integration Manual

Welcome to **OGImage Forge Pro**, your automated Open Graph social card generator.

---

## 1\. Quick Start

### 1.1 Web Studio

1. Open `source-code/index.html` in your web browser. No server setup is required.  
2. Edit your title, description, author, and tags in the left panel.  
3. Observe real-time visual updates in the 1200x630 viewport.  
4. Click **Download 1200x630 PNG** for a production raster image or **Download SVG** for vector production.  
5. Click **Copy Meta Tags** to copy standard `<meta>` tags directly into your HTML `<head>` section.

### 1.2 Automation CLI

Generate social cards programmatically:

\# Validate a single card configuration

python3 build/ogimage-cli.py \--input source-code/templates/saas-product-launch.json \--validate

\# Render a single SVG card

python3 build/ogimage-cli.py \--input source-code/templates/saas-product-launch.json \--output product-card.svg

\# Batch-generate social cards for all blog articles in a markdown folder

python3 build/ogimage-cli.py \--markdown-dir ./content/posts \--output-dir ./public/og-images

---

## 2\. Integration with Static Site Generators

### Next.js (App Router)

Save generated social cards into `public/og/` or automate card creation during build:

// app/blog/\[slug\]/page.tsx

export async function generateMetadata({ params }) {

  const post \= await getPost(params.slug);

  return {

    title: post.title,

    description: post.description,

    openGraph: {

      title: post.title,

      description: post.description,

      images: \[

        {

          url: \`https\://yourdomain.com/og/\${params.slug}-og.svg\`,

          width: 1200,

          height: 630,

          alt: post.title,

        },

      \],

    },

    twitter: {

      card: 'summary\_large\_image',

      title: post.title,

      description: post.description,

      images: \[\`https\://yourdomain.com/og/\${params.slug}-og.svg\`\],

    },

  };

}

### Astro & Hugo

Point your markdown frontmatter to the output directory:

\---

title: "Why We Migrated to Bun and Rust"

description: "How reducing cold start latency by 72% cut our cloud infrastructure bill."

image: "/og-images/why-we-migrated-og.svg"

\---