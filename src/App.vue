<template>
  <div class="app" :data-theme="theme" id="top">
    <!-- 背景装饰 -->
    <div class="bg-decoration" aria-hidden="true">
      <div class="bg-blob bg-blob-1"></div>
      <div class="bg-blob bg-blob-2"></div>
      <div class="bg-dots"></div>
    </div>

    <!-- 导航栏 -->
    <SiteNav :name="config.name" :avatar="config.avatar" :nav-items="navItems" />

    <!-- 主题切换按钮 -->
    <button
      class="theme-toggle"
      :aria-label="theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'"
      :title="theme === 'dark' ? '浅色模式' : '深色模式'"
      @click="toggleTheme"
    >
      <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" :size="18" />
    </button>

    <!-- 主内容 -->
    <main class="main">
      <!-- Hero 区域 -->
      <section class="hero" ref="heroRef">
        <div class="container hero-inner">
          <div class="hero-avatar">
            <AppAvatar
              :src="config.avatar"
              :name="config.name"
              :size="isMobile ? 88 : 104"
            />
          </div>

          <h1 class="hero-name">{{ config.name }}</h1>
          <p class="hero-tagline">{{ config.title }}</p>
          <p class="hero-bio">{{ config.bio }}</p>
        </div>

        <!-- 下滑提示 -->
        <div class="scroll-hint" aria-hidden="true">
          <svg
            class="scroll-hint-arrow"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </section>

      <!-- 项目区域 -->
      <section class="projects-section" id="projects" ref="projectsRef">
        <div class="container">
          <h2 class="section-label">项目</h2>
          <div class="projects-grid">
            <ProjectCard
              v-for="project in config.projects"
              :key="project.name"
              :project="project"
            />
          </div>
        </div>
      </section>

      <!-- 引言文字 -->
      <section class="quote-section">
        <div class="container">
          <blockquote class="quote-text">{{ config.quote }}</blockquote>
        </div>
      </section>

      <!-- 社交区 -->
      <section class="contact-section" id="contact">
        <div class="container">
          <h2 class="section-label">关注 &amp; 联系</h2>
          <p class="contact-desc">在这些平台上找到我</p>
          <div class="contact-grid">
            <a
              v-for="link in config.links"
              :key="link.label"
              :href="link.url"
              class="contact-btn"
              :style="{ '--link-color': link.color }"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppIcon :name="link.icon" :size="20" />
              <span>{{ link.label }}</span>
            </a>
          </div>
        </div>
      </section>
    </main>

    <!-- 底部 -->
    <SiteFooter :name="config.name" :beian="config.beian" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AppIcon from './components/AppIcon.vue'
import { siteConfig as config } from './config.js'
import AppAvatar from './components/AppAvatar.vue'
import ProjectCard from './components/ProjectCard.vue'
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'

// 导航项目
const navItems = [
  { label: '项目', href: '#projects' },
  { label: '联系', href: '#contact' },
  { label: 'GitHub', href: 'https://github.com/your-username' },
]

// ---------- 主题 ----------
const theme = ref('light')

function getPreferredTheme() {
  const htmlTheme = document.documentElement.dataset.theme
  if (htmlTheme === 'dark' || htmlTheme === 'light') return htmlTheme
  if (localStorage.getItem('theme')) return localStorage.getItem('theme')
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem('theme', theme.value)
}

onMounted(() => { theme.value = getPreferredTheme() })

// ---------- 响应式 ----------
const isMobile = ref(false)
function checkMobile() { isMobile.value = window.innerWidth < 640 }
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => window.removeEventListener('resize', checkMobile))

// ---------- 滚动动画 ----------
const heroRef = ref(null)
const projectsRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )
  if (heroRef.value) observer.observe(heroRef.value)
  if (projectsRef.value) observer.observe(projectsRef.value)
})
</script>

<style scoped>
/* ============ 布局 ============ */
.app {
  position: relative;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--color-background);
  transition: background var(--transition-base);
}

.main {
  flex: 1;
  padding: 0;
}

/* ============ 背景装饰 ============ */
.bg-decoration {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: float 20s ease-in-out infinite;
}
.bg-blob-1 {
  width: 400px; height: 400px;
  background: var(--color-accent);
  top: -10%; right: -10%;
  animation-delay: 0s;
}
.bg-blob-2 {
  width: 300px; height: 300px;
  background: var(--color-accent);
  bottom: 10%; left: -8%;
  animation-delay: -7s;
  opacity: 0.08;
}
.bg-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(var(--color-border) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.4;
}
@media (prefers-color-scheme: dark) {
  .bg-blob { opacity: 0.08; }
  .bg-blob-1 { opacity: 0.06; }
  .bg-blob-2 { opacity: 0.05; }
}

/* ============ 主题切换按钮 ============ */
.theme-toggle {
  position: fixed;
  top: calc(var(--header-height) + var(--space-2));
  right: var(--space-4);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  color: var(--color-foreground);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}
.theme-toggle:hover {
  background: var(--color-card-hover);
  box-shadow: var(--shadow-md);
  transform: rotate(12deg);
}
.theme-toggle:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}
@media (min-width: 768px) {
  .theme-toggle { right: var(--space-6); }
}

/* ============ Hero 区域 ============ */
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100dvh;
  padding: var(--header-height) 0 var(--space-8);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.hero.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.hero-avatar {
  margin-bottom: var(--space-6);
  animation: fade-in-up 0.8s ease-out 0.1s both;
}

.hero-name {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-foreground);
  margin-bottom: var(--space-2);
  text-wrap: balance;
  animation: fade-in-up 0.8s ease-out 0.2s both;
}

.hero-tagline {
  font-size: var(--text-lg);
  font-weight: 500;
  color: var(--color-accent);
  margin-bottom: var(--space-3);
  letter-spacing: 0.04em;
  animation: fade-in-up 0.8s ease-out 0.3s both;
}

.hero-bio {
  font-size: var(--text-sm);
  color: var(--color-muted-foreground);
  max-width: 480px;
  line-height: 1.7;
  margin-bottom: 0;
  animation: fade-in-up 0.8s ease-out 0.35s both;
}

/* 下滑提示 */
.scroll-hint {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  animation: fade-in-up 0.8s ease-out 0.7s both;
}
.scroll-hint-arrow {
  display: block;
  width: 20px;
  height: 20px;
  color: var(--color-muted-foreground);
  animation: scroll-hint 2s ease-in-out infinite;
}
@keyframes scroll-hint {
  0%, 100% { transform: translateY(-4px); opacity: 0.3; }
  50% { transform: translateY(4px); opacity: 1; }
}

@media (min-width: 640px) {
  .hero-name { font-size: var(--text-5xl); }
  .hero-tagline { font-size: var(--text-xl); }
  .hero-bio { font-size: var(--text-base); }
}

/* ============ 项目区域 ============ */
.projects-section {
  padding: var(--space-20) 0 var(--space-16);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s;
}
.projects-section.visible {
  opacity: 1;
  transform: translateY(0);
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
  justify-items: stretch;
}
@media (max-width: 639px) {
  .projects-grid { grid-template-columns: repeat(2, 1fr); }
}

/* ============ 引言文字 ============ */
.quote-section {
  padding: var(--space-8) 0 var(--space-8);
}
.quote-text {
  text-align: center;
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  line-height: 1.8;
  color: var(--color-muted-foreground);
  font-style: italic;
  max-width: 480px;
  margin: 0 auto;
}

/* ============ 联系区域 ============ */
.contact-section {
  padding: var(--space-12) 0 var(--space-16);
}
.contact-desc {
  text-align: center;
  font-size: var(--text-sm);
  color: var(--color-muted-foreground);
  margin-bottom: var(--space-4);
}
.contact-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
}
.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-8);
  border-radius: var(--radius-full);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  color: var(--color-foreground);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all var(--transition-base);
  min-height: 40px;
}
.contact-btn:hover {
  border-color: var(--link-color);
  background: color-mix(in srgb, var(--link-color) 8%, var(--color-card));
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm), 0 0 0 1px color-mix(in srgb, var(--link-color) 15%, transparent);
}

/* ============ 通用 ============ */
.section-label {
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-muted-foreground);
  text-align: center;
  margin-bottom: var(--space-4);
}
</style>