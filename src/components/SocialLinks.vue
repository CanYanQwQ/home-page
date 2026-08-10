<template>
  <div class="social-links">
    <a
      v-for="link in links"
      :key="link.label"
      :href="link.url"
      class="social-link"
      :style="{ '--link-color': link.color }"
      :aria-label="link.label"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span class="social-link-icon">
        <AppIcon :name="link.icon" :size="22" weight="duotone" />
      </span>
      <span class="social-link-label">{{ link.label }}</span>
      <AppIcon
        name="arrow-square-out"
        :size="14"
        class="external-icon"
        weight="bold"
      />
    </a>
  </div>
</template>

<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  links: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.social-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
}

.social-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  color: var(--color-foreground);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
  min-height: 48px;
}

.social-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--link-color);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.social-link:hover {
  transform: translateX(6px);
  border-color: var(--link-color);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  background: var(--color-card-hover);
}

.social-link:hover::before {
  opacity: 1;
}

.social-link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--link-color) 10%, transparent);
  color: var(--link-color);
  flex-shrink: 0;
  transition: transform var(--transition-fast), background var(--transition-base);
}

.social-link:hover .social-link-icon {
  background: color-mix(in srgb, var(--link-color) 18%, transparent);
  transform: scale(1.05);
}

.social-link-label {
  flex: 1;
}

.external-icon {
  color: var(--color-muted-foreground);
  opacity: 0;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.social-link:hover .external-icon {
  opacity: 0.7;
  transform: translate(2px, -2px);
}

/* 响应式：桌面端网格布局 */
@media (min-width: 640px) {
  .social-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3);
  }
}
</style>