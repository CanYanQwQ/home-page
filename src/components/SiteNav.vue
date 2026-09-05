<template>
  <header class="site-nav">
    <div class="container nav-inner">
      <a href="#top" class="nav-logo" aria-label="返回页面顶部">
        <img
          v-if="avatar"
          :src="avatar"
          :alt="`${name} 的头像`"
          class="nav-logo-avatar"
          width="36"
          height="36"
        />
        <span v-else class="nav-logo-mark" aria-hidden="true">{{ initial }}</span>
        <span class="nav-logo-name">{{ name }}</span>
      </a>

      <button
        class="theme-toggle"
        :aria-label="theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'"
        :aria-pressed="theme === 'dark'"
        :title="theme === 'dark' ? '浅色模式' : '深色模式'"
        @click="$emit('toggle-theme')"
      >
        <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" :size="19" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  name: { type: String, default: '' },
  avatar: { type: String, default: '' },
  theme: { type: String, default: 'light' },
})

defineEmits(['toggle-theme'])

const initial = computed(() => props.name.trim().charAt(0).toUpperCase() || '?')
</script>

<style scoped>
.site-nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background);
  transition: background-color var(--transition-base), border-color var(--transition-base);
}

.nav-inner {
  min-height: calc(var(--header-height) + env(safe-area-inset-top));
  padding-top: env(safe-area-inset-top);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
}

.nav-logo {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-foreground);
  font-weight: 760;
}

.nav-logo-avatar,
.nav-logo-mark {
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  border-radius: var(--radius-sm);
}

.nav-logo-avatar {
  object-fit: cover;
}

.nav-logo-mark {
  display: grid;
  place-items: center;
  background: var(--color-accent);
  color: var(--color-on-accent);
}

.nav-logo-name {
  letter-spacing: -0.02em;
}

.theme-toggle {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  transition: background-color var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
}

.theme-toggle:hover {
  border-color: var(--color-border-strong);
  background: var(--color-surface-strong);
}

.theme-toggle:active {
  transform: scale(0.96);
}
</style>
