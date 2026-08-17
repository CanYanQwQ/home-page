import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

// ---------- 从 src/config.js 读取站点信息，注入 SEO 元标签 ----------
let configCache = null

async function loadSiteConfig() {
  const configPath = path.resolve('src/config.js')
  const mtime = fs.statSync(configPath).mtimeMs
  if (configCache && configCache.mtime === mtime) return configCache.config
  const mod = await import(`${pathToFileURL(configPath).href}?t=${mtime}`)
  configCache = { mtime, config: mod.siteConfig }
  return mod.siteConfig
}

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function jsonEsc(value) {
  return String(value ?? '')
    .replace(/&/g, '\\u0026')
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
}

function renderSeoTags(cfg) {
  const siteUrl = (cfg.siteUrl || 'https://example.com').replace(/\/+$/, '')
  const title = `${cfg.name} · 个人主页 | ${cfg.title}`
  const description = cfg.seo?.description || cfg.bio
  const keywords = cfg.seo?.keywords || `${cfg.name},个人主页,${cfg.title}`
  const image = cfg.seo?.image || cfg.avatar
  const imageUrl = /^https?:\/\//.test(image)
    ? image
    : `${siteUrl}/${image.replace(/^\/+/, '')}`

  const sameAs = (cfg.links || [])
    .filter((l) => /^https?:\/\//.test(l.url))
    .map((l) => `"${jsonEsc(l.url)}"`)
    .join(', ')

  const jsonLd = `{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "${jsonEsc(cfg.name)}",
  "jobTitle": "${jsonEsc(cfg.title)}",
  "description": "${jsonEsc(description)}",
  "url": "${jsonEsc(siteUrl)}/",
  "image": "${jsonEsc(imageUrl)}",
  "sameAs": [${sameAs}]
}`

  return `
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="keywords" content="${esc(keywords)}" />
    <meta name="robots" content="index, follow" />
    <meta name="color-scheme" content="light dark" />
    <link rel="canonical" href="${esc(siteUrl)}/" />
    <link rel="preload" as="image" href="${esc(imageUrl)}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(cfg.name)}的个人主页" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${esc(imageUrl)}" />
    <meta property="og:url" content="${esc(siteUrl)}/" />
    <meta property="og:locale" content="zh_CN" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${esc(imageUrl)}" />

    <script type="application/ld+json">
    ${jsonLd}
    </script>
  `
}

function seoInjectPlugin() {
  return {
    name: 'seo-inject',
    async transformIndexHtml(html) {
      const cfg = await loadSiteConfig()
      const seo = renderSeoTags(cfg)

      const out = html
        .replace(/<title>[\s\S]*?<\/title>/i, '')
        .replace(/\s*<meta name="description"[^>]*>/i, '')
        .replace(/\s*<link rel="preload" as="image"[^>]*>/i, '')

      return out.replace('</head>', `${seo}\n  </head>`)
    },
  }
}

export default defineConfig({
  plugins: [vue(), seoInjectPlugin()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})