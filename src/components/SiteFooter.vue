<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <span class="footer-copy">© {{ year }} {{ name }} · 保留所有权利</span>
      <a
        v-if="beian && beian.icp"
        :href="beian.url || 'javascript:void(0)'"
        class="footer-beian"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AppIcon name="shield-check" :size="14" />
        {{ beian.icp }}
      </a>
      <a
        v-if="beian && beian.moe"
        :href="beian.moe.url"
        class="footer-beian"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ beian.moe.text }}
      </a>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  name: { type: String, default: '' },
  beian: { type: Object, default: null },
})

const year = computed(() => new Date().getFullYear())
</script>

<style scoped>
.site-footer {
  border-top: 1px solid var(--color-border);
  padding: var(--space-6) 0;
  margin-top: 0;
  background: transparent;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  text-align: center;
}

.footer-copy {
  font-size: var(--text-xs);
  color: var(--color-muted-foreground);
}

.footer-beian {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-muted-foreground);
  transition: color var(--transition-fast);
}

.footer-beian:hover {
  color: var(--color-accent);
}

@media (min-width: 640px) {
  .footer-inner {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}
</style>