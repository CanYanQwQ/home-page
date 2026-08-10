<template>
  <a
    class="project-card"
    :href="project.url"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="project-name">{{ project.name }}</span>
    <AppIcon name="external-link" :size="14" class="project-arrow" />
  </a>
</template>

<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.project-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-4);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-foreground);
  text-align: center;
  transition: all var(--transition-base);
  min-height: 48px;
  width: 100%;
}

.project-card:hover {
  border-color: var(--color-accent);
  background: var(--color-card-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.project-name {
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 500;
}

.project-arrow {
  color: var(--color-muted-foreground);
  opacity: 0;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
  flex-shrink: 0;
}

.project-card:hover .project-arrow {
  opacity: 0.6;
  transform: translate(2px, -2px);
}
</style>