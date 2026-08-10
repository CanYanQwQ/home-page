<template>
  <header class="site-nav">
    <div class="nav-inner">
      <!-- Logo / 名称 -->
      <a href="#top" class="nav-logo">
        <img
          v-if="avatar"
          :src="avatar"
          :alt="name"
          class="nav-logo-avatar"
        />
        <span v-else class="nav-logo-mark">{{ initial }}</span>
      </a>

      <!-- 导航链接 -->
      <nav class="nav-links" aria-label="站点导航">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.href"
          class="nav-link"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- 移动端菜单按钮 -->
      <button
        class="nav-toggle"
        :aria-label="menuOpen ? '关闭菜单' : '打开菜单'"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <AppIcon :name="menuOpen ? 'x' : 'menu'" :size="22" />
      </button>
    </div>

    <!-- 移动端下拉菜单 -->
    <transition name="nav-drop">
      <nav v-if="menuOpen" class="nav-mobile" aria-label="移动端导航">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.href"
          class="nav-mobile-link"
          @click="menuOpen = false"
        >
          {{ item.label }}
        </a>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  name: { type: String, default: '' },
  avatar: { type: String, default: '' },
  navItems: {
    type: Array,
    default: () => [],
  },
})

const menuOpen = ref(false)

const initial = computed(() => props.name.trim().charAt(0).toUpperCase() || '?')
</script>

<style scoped>
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: color-mix(in srgb, var(--color-background) 80%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.nav-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-6);
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-foreground);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: var(--text-base);
}

.nav-logo-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-md);
  background: var(--color-accent);
  color: var(--color-on-primary);
  font-size: var(--text-sm);
}

.nav-logo-avatar {
  width: 28px;
  height: 28px;
  display: block;
  object-fit: cover;
  border-radius: 50%;
}

.nav-links {
  display: none;
  align-items: center;
  gap: var(--space-6);
}

.nav-link {
  font-size: var(--text-sm);
  color: var(--color-muted-foreground);
  transition: color var(--transition-fast);
  padding: var(--space-2) 0;
}

.nav-link:hover {
  color: var(--color-foreground);
}

.nav-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  color: var(--color-foreground);
  background: transparent;
  border: 1px solid var(--color-border);
}

.nav-mobile {
  padding: var(--space-3) var(--space-6) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}

.nav-mobile-link {
  padding: var(--space-3) var(--space-2);
  font-size: var(--text-base);
  color: var(--color-foreground);
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
}

.nav-mobile-link:hover {
  background: var(--color-muted);
}

@media (min-width: 640px) {
  .nav-links {
    display: flex;
  }
  .nav-toggle {
    display: none;
  }
}

/* 移动端下拉动画 */
.nav-drop-enter-active,
.nav-drop-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.nav-drop-enter-from,
.nav-drop-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>