<template>
  <footer class="site-footer">
    <div class="container">
      <blockquote v-if="quote" class="footer-quote">{{ quote }}</blockquote>

      <div class="footer-meta">
        <span>© {{ year }} {{ name }} · 保留所有权利</span>
        <div class="footer-links" v-if="beian">
          <a
            v-if="beian.icp"
            :href="beian.url || 'javascript:void(0)'"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AppIcon name="shield-check" :size="15" />
            {{ beian.icp }}
          </a>
          <a
            v-if="beian.moe"
            :href="beian.moe.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ beian.moe.text }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  name: { type: String, default: '' },
  beian: { type: Object, default: null },
  quote: { type: String, default: '' },
})

const year = computed(() => new Date().getFullYear())
</script>

<style scoped>
.site-footer {
  border-top: 1px solid var(--color-border);
  padding: var(--space-8) 0;
  background: var(--color-surface);
}

.footer-quote {
  max-width: 48rem;
  color: var(--color-muted-foreground);
  font-size: var(--text-sm);
  line-height: 1.75;
}

.footer-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  margin-top: var(--space-6);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-border);
  color: var(--color-muted-foreground);
  font-size: var(--text-xs);
}

.footer-links,
.footer-links a {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.footer-links a:hover {
  color: var(--color-foreground);
  text-decoration: underline;
}

@media (max-width: 640px) {
  .footer-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
