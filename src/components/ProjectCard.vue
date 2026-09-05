<template>
  <a
    class="project-card"
    :href="project.url"
    :aria-label="`${project.name}（在新窗口打开）`"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="project-copy">
      <strong>{{ project.name }}</strong>
      <small>{{ hostname }}</small>
    </span>
    <span class="project-icon">
      <AppIcon name="external-link" :size="18" />
    </span>
  </a>
</template>

<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const hostname = computed(() => new URL(props.project.url).hostname)
</script>

<style scoped>
.project-card {
  min-width: 0;
  min-height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-foreground);
  transition: border-color var(--transition-fast), background-color var(--transition-fast), transform var(--transition-fast);
}

.project-copy {
  min-width: 0;
  display: grid;
  gap: var(--space-1);
}

.project-copy strong,
.project-copy small {
  overflow-wrap: anywhere;
}

.project-copy strong {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 750;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.project-copy small {
  color: var(--color-muted-foreground);
  font-size: var(--text-xs);
}

.project-icon {
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-sm);
  background: var(--color-surface-strong);
  color: var(--color-muted-foreground);
  transition: background-color var(--transition-fast), color var(--transition-fast);
}
</style>
