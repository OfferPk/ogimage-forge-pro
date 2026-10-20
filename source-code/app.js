/**
 * OGImage Forge Pro - Application Controller & Live Canvas Exporter
 * (c) 2026 OGImage Forge Pro. All rights reserved.
 */

document.addEventListener('DOMContentLoaded', () => {
  const renderer = new OGRenderer();

  let state = {
    title: 'Introducing AgentFlow 2.0: Autonomous Workflow Orchestration',
    description: 'Deploy self-healing multi-agent pipelines with sub-second execution, distributed memory caching, and zero cloud lock-in.',
    category: 'PRODUCT LAUNCH',
    brand: 'AgentFlow.io',
    author: 'Sarah Jenkins • Founder & CEO',
    readTime: 'v2.0 Release Notes',
    tags: ['AI Agents', 'Python', 'Workflows', 'Automation'],
    theme: 'dark_gradient'
  };

  // DOM Elements
  const elPresetSelect = document.getElementById('presetSelect');
  const elTitle = document.getElementById('title');
  const elDescription = document.getElementById('description');
  const elCategory = document.getElementById('category');
  const elBrand = document.getElementById('brand');
  const elAuthor = document.getElementById('author');
  const elReadTime = document.getElementById('readTime');
  const elTags = document.getElementById('tags');
  const elTheme = document.getElementById('theme');

  const elSvgContainer = document.getElementById('ogSvgContainer');
  const elMetaCode = document.getElementById('metaCode');
  const elHiddenCanvas = document.getElementById('hiddenCanvas');
  const ctx = elHiddenCanvas.getContext('2d');

  // Zoom buttons
  const zoomBtns = document.querySelectorAll('.zoom-btn');
  let currentZoom = 0.75;

  zoomBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      zoomBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentZoom = parseFloat(btn.dataset.zoom);
      elSvgContainer.style.transform = `scale(${currentZoom})`;
    });
  });

  function syncForm() {
    elTitle.value = state.title;
    elDescription.value = state.description;
    elCategory.value = state.category;
    elBrand.value = state.brand;
    elAuthor.value = state.author;
    elReadTime.value = state.readTime;
    elTags.value = state.tags.join(', ');
    elTheme.value = state.theme;

    updatePreview();
  }

  function updatePreview() {
    const svgString = renderer.generateSVG(state);
    elSvgContainer.innerHTML = svgString;

    // Update Meta Code
    const metaTags = renderer.generateMetaTags(state, 'https://yourdomain.com/og-image.png');
    elMetaCode.textContent = metaTags;

    try {
      localStorage.setItem('ogimage_config', JSON.stringify(state));
    } catch (e) {}
  }

  // Field change listeners
  elTitle.addEventListener('input', e => { state.title = e.target.value; updatePreview(); });
  elDescription.addEventListener('input', e => { state.description = e.target.value; updatePreview(); });
  elCategory.addEventListener('input', e => { state.category = e.target.value; updatePreview(); });
  elBrand.addEventListener('input', e => { state.brand = e.target.value; updatePreview(); });
  elAuthor.addEventListener('input', e => { state.author = e.target.value; updatePreview(); });
  elReadTime.addEventListener('input', e => { state.readTime = e.target.value; updatePreview(); });
  elTags.addEventListener('input', e => {
    state.tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
    updatePreview();
  });
  elTheme.addEventListener('change', e => { state.theme = e.target.value; updatePreview(); });

  // Action: Download SVG
  document.getElementById('btnDownloadSvg').addEventListener('click', () => {
    const svgString = renderer.generateSVG(state);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const dl = document.createElement('a');
    dl.href = URL.createObjectURL(blob);
    dl.download = `${(state.title || 'og-card').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}.svg`;
    dl.click();
  });

  // Action: Download 1200x630 PNG
  document.getElementById('btnDownloadPng').addEventListener('click', () => {
    const svgString = renderer.generateSVG(state);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      elHiddenCanvas.width = 1200;
      elHiddenCanvas.height = 630;
      ctx.clearRect(0, 0, 1200, 630);
      ctx.drawImage(img, 0, 0, 1200, 630);
      URL.revokeObjectURL(url);

      const pngUrl = elHiddenCanvas.toDataURL('image/png');
      const dl = document.createElement('a');
      dl.href = pngUrl;
      dl.download = `${(state.title || 'og-card').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}.png`;
      dl.click();
    };
    img.src = url;
  });

  // Action: Copy Meta Tags
  document.getElementById('btnCopyMeta').addEventListener('click', () => {
    const metaTags = renderer.generateMetaTags(state, 'https://yourdomain.com/og-image.png');
    navigator.clipboard.writeText(metaTags).then(() => {
      const btn = document.getElementById('btnCopyMeta');
      const originalText = btn.textContent;
      btn.textContent = 'Copied to Clipboard!';
      setTimeout(() => { btn.textContent = originalText; }, 2000);
    });
  });

  // Action: Export JSON
  document.getElementById('btnExportJson').addEventListener('click', () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const dl = document.createElement('a');
    dl.href = dataStr;
    dl.download = `${(state.title || 'og-config').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}.json`;
    dl.click();
  });

  // Preset Template Loader
  elPresetSelect.addEventListener('change', async (e) => {
    const val = e.target.value;
    if (!val) return;
    try {
      const res = await fetch(`templates/${val}.json`);
      if (res.ok) {
        state = await res.json();
        syncForm();
      }
    } catch (err) {
      console.warn('Fallback preset loader', err);
    }
  });

  // Initial setup
  try {
    const cached = localStorage.getItem('ogimage_config');
    if (cached) state = JSON.parse(cached);
  } catch (e) {}

  syncForm();
});
