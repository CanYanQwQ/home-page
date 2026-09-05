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

function normalizeSiteUrl(value) {
  return `${String(value || 'https://example.com').replace(/\/+$/, '')}/`
}

function toAbsoluteUrl(value, siteUrl) {
  if (/^https?:\/\//i.test(value)) return value
  return new URL(String(value || '').replace(/^\/+/, ''), siteUrl).href
}

function serializeJsonLd(value) {
  return JSON.stringify(value, null, 2)
    .replace(/&/g, '\\u0026')
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(new RegExp('\\u2028', 'g'), '\\u2028')
    .replace(new RegExp('\\u2029', 'g'), '\\u2029')
}

function renderSeoTags(cfg) {
  const canonicalUrl = normalizeSiteUrl(cfg.siteUrl)
  const title = cfg.seo?.title || `${cfg.name} · 个人主页 | ${cfg.title}`
  const description = cfg.seo?.description || cfg.bio
  const keywords = cfg.seo?.keywords || `${cfg.name},个人主页,${cfg.title}`
  const shareImageUrl = toAbsoluteUrl(cfg.seo?.image || cfg.avatar, canonicalUrl)
  const avatarUrl = cfg.avatar ? toAbsoluteUrl(cfg.avatar, canonicalUrl) : ''
  const imageAlt = cfg.seo?.imageAlt || `${cfg.name}的个人主页`
  const imageWidth = Number(cfg.seo?.imageWidth) || 1200
  const imageHeight = Number(cfg.seo?.imageHeight) || 630
  const imageType = cfg.seo?.imageType || 'image/png'

  const sameAs = (cfg.links || [])
    .map((link) => link.url)
    .filter((url) => /^https?:\/\//i.test(url))

  const projectUrls = (cfg.projects || [])
    .map((project) => project.url)
    .filter((url) => /^https?:\/\//i.test(url))

  const websiteId = `${canonicalUrl}#website`
  const profileId = `${canonicalUrl}#profile`
  const personId = `${canonicalUrl}#person`

  const profilePage = {
    '@type': 'ProfilePage',
    '@id': profileId,
    url: canonicalUrl,
    name: title,
    description,
    inLanguage: 'zh-CN',
    isPartOf: { '@id': websiteId },
    mainEntity: { '@id': personId },
  }
  if (projectUrls.length) profilePage.significantLink = projectUrls

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: cfg.name,
    url: canonicalUrl,
    description,
    mainEntityOfPage: { '@id': profileId },
    sameAs,
  }
  if (avatarUrl) person.image = avatarUrl
  if (cfg.seo?.knowsAbout?.length) person.knowsAbout = cfg.seo.knowsAbout

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: canonicalUrl,
        name: `${cfg.name}的个人主页`,
        inLanguage: 'zh-CN',
      },
      profilePage,
      person,
    ],
  }

  return `
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="keywords" content="${esc(keywords)}" />
    <meta name="author" content="${esc(cfg.name)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="color-scheme" content="light dark" />
    <link rel="canonical" href="${esc(canonicalUrl)}" />
    ${avatarUrl ? `<link rel="preload" as="image" href="${esc(avatarUrl)}" fetchpriority="high" />` : ''}

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(cfg.name)}的个人主页" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${esc(shareImageUrl)}" />
    <meta property="og:image:secure_url" content="${esc(shareImageUrl)}" />
    <meta property="og:image:alt" content="${esc(imageAlt)}" />
    <meta property="og:image:width" content="${imageWidth}" />
    <meta property="og:image:height" content="${imageHeight}" />
    <meta property="og:image:type" content="${esc(imageType)}" />
    <meta property="og:url" content="${esc(canonicalUrl)}" />
    <meta property="og:locale" content="zh_CN" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${esc(shareImageUrl)}" />
    <meta name="twitter:image:alt" content="${esc(imageAlt)}" />

    <script type="application/ld+json">
    ${serializeJsonLd(jsonLd)}
    </script>
  `
}

function renderStaticFallback(cfg) {
  const initial = String(cfg.name || '?').trim().charAt(0).toUpperCase() || '?'
  const avatar = cfg.avatar
    ? `<img src="${esc(cfg.avatar)}" alt="${esc(`${cfg.name} 的头像`)}" width="152" height="152" />`
    : `<span class="seo-fallback-avatar" role="img" aria-label="${esc(`${cfg.name} 的头像`)}">${esc(initial)}</span>`

  const links = (cfg.links || [])
    .filter((link) => /^(https?:\/\/|mailto:)/i.test(link.url))
    .map((link) => `
          <li><a href="${esc(link.url)}">${esc(link.label)}</a></li>`)
    .join('')

  const projects = (cfg.projects || [])
    .filter((project) => /^https?:\/\//i.test(project.url))
    .map((project) => `
          <li><a href="${esc(project.url)}">${esc(project.name)}</a></li>`)
    .join('')

  return `
      <main class="seo-fallback">
        <section class="seo-fallback-profile" aria-labelledby="seo-fallback-name">
          ${avatar}
          <div>
            <h1 id="seo-fallback-name">${esc(cfg.name)}</h1>
            <p><strong>${esc(cfg.title)}</strong></p>
            <p>${esc(cfg.bio)}</p>
            <nav aria-label="站外平台"><ul>${links}
            </ul></nav>
          </div>
        </section>
        <section aria-labelledby="seo-fallback-projects">
          <h2 id="seo-fallback-projects">项目</h2>
          <ul>${projects}
          </ul>
        </section>
      </main>`
}

function seoInjectPlugin() {
  return {
    name: 'seo-inject',
    async transformIndexHtml(html) {
      const cfg = await loadSiteConfig()
      const seo = renderSeoTags(cfg)
      const fallback = renderStaticFallback(cfg)

      const out = html
        .replace(/<title>[\s\S]*?<\/title>/i, '')
        .replace(/\s*<meta name="description"[^>]*>/i, '')
        .replace(/\s*<link rel="preload" as="image"[^>]*>/i, '')
        .replace('<div id="app"></div>', `<div id="app">${fallback}\n    </div>`)

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
