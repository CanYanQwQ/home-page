<template>
  <div class="app" :data-theme="theme" id="top">
    <a class="skip-link" href="#main-content">跳到主要内容</a>

    <SiteNav
      :name="config.name"
      :avatar="config.avatar"
      :theme="theme"
      @toggle-theme="toggleTheme"
    />

    <main id="main-content">
      <section class="profile-section" aria-labelledby="profile-name">
        <div class="container profile-layout">
          <div class="profile-avatar">
            <AppAvatar
              :src="config.avatar"
              :name="config.name"
              :size="152"
              shape="portrait"
            />
          </div>

          <div class="profile-copy">
            <h1 id="profile-name">{{ config.name }}</h1>
            <p class="profile-role">{{ config.title }}</p>
            <p class="profile-bio">{{ config.bio }}</p>

            <nav class="social-links" aria-label="站外平台">
              <a
                v-for="link in config.links"
                :key="link.label"
                :href="link.url"
                class="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AppIcon :name="link.icon" :size="18" />
                <span>{{ link.label }}</span>
              </a>
            </nav>
          </div>
        </div>
      </section>

      <section class="project-section" id="projects" aria-labelledby="projects-title">
        <div class="container">
          <h2 id="projects-title">项目</h2>
          <div class="project-grid">
            <ProjectCard
              v-for="project in config.projects"
              :key="project.name"
              :project="project"
            />
          </div>
        </div>
      </section>
    </main>

    <SiteFooter
      :name="config.name"
      :beian="config.beian"
      :quote="config.quote"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AppAvatar from './components/AppAvatar.vue'
import AppIcon from './components/AppIcon.vue'
import ProjectCard from './components/ProjectCard.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteNav from './components/SiteNav.vue'
import { siteConfig as config } from './config.js'

const theme = ref('light')

function getPreferredTheme() {
  const htmlTheme = document.documentElement.dataset.theme
  if (htmlTheme === 'dark' || htmlTheme === 'light') return htmlTheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const themeColors = {
  light: '#FFFFFF',
  dark: '#0A0A0A',
}

function applyTheme(nextTheme) {
  theme.value = nextTheme
  document.documentElement.dataset.theme = nextTheme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[nextTheme])
}

function toggleTheme() {
  const nextTheme = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(nextTheme)
  localStorage.setItem('theme', nextTheme)
}

onMounted(() => applyTheme(getPreferredTheme()))
</script>

<style scoped>
.app {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--color-background);
  color: var(--color-foreground);
  transition: background-color var(--transition-base), color var(--transition-base);
}

main {
  flex: 1;
}

.skip-link {
  position: fixed;
  top: var(--space-3);
  left: var(--space-3);
  z-index: 1000;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--color-foreground);
  color: var(--color-background);
  transform: translateY(-160%);
  transition: transform var(--transition-fast);
}

.skip-link:focus {
  transform: translateY(0);
}

.profile-section {
  padding: calc(var(--header-height) + var(--space-16)) 0 var(--space-16);
}

.profile-layout {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: clamp(2rem, 6vw, 4.5rem);
  max-width: 920px;
  animation: profile-enter 360ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.profile-avatar {
  padding: var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: calc(var(--radius-xl) + var(--space-2));
  background: var(--color-surface);
}

.profile-copy h1 {
  font-family: var(--font-heading);
  font-size: clamp(3.75rem, 8vw, 5.5rem);
  font-weight: 850;
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.profile-role {
  width: fit-content;
  margin-top: var(--space-4);
  padding-bottom: 2px;
  border-bottom: 2px solid var(--color-accent);
  font-size: var(--text-lg);
  font-weight: 700;
}

.profile-bio {
  max-width: 38rem;
  margin-top: var(--space-4);
  color: var(--color-muted-foreground);
  font-size: var(--text-base);
  line-height: 1.75;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-6);
}

.social-link {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-muted-foreground);
  font-size: var(--text-sm);
  font-weight: 650;
  transition: border-color var(--transition-fast), background-color var(--transition-fast), color var(--transition-fast);
}

.social-link:hover {
  border-color: var(--color-border-strong);
  background: var(--color-surface-strong);
  color: var(--color-foreground);
}

.project-section {
  padding: var(--space-12) 0 var(--space-20);
  border-top: 1px solid var(--color-border);
}

.project-section h2 {
  margin-bottom: var(--space-6);
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 780;
  line-height: 1.15;
  letter-spacing: -0.035em;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
}

@keyframes profile-enter {
  from {
    opacity: 0.65;
    transform: translateY(10px);
  }
}

@media (max-width: 860px) {
  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 719px) {
  .profile-section {
    padding: calc(var(--header-height) + var(--space-10)) 0 var(--space-12);
  }

  .profile-layout {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .profile-avatar {
    width: fit-content;
  }

  .profile-copy h1 {
    font-size: clamp(3.5rem, 18vw, 4.75rem);
  }

  .social-links {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .social-link {
    justify-content: center;
    padding-inline: var(--space-2);
  }

  .project-section {
    padding: var(--space-10) 0 var(--space-16);
  }

  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>
