<template>
  <div
    class="avatar-wrapper"
    :class="`avatar-${shape}`"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <img
      v-if="src"
      :src="src"
      :alt="`${name} 的头像`"
      class="avatar-image"
      width="280"
      height="280"
      fetchpriority="high"
    />

    <svg
      v-else
      class="avatar-svg"
      :width="size"
      :height="size"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      :aria-label="`${name} 的头像`"
    >
      <rect width="120" height="120" rx="24" fill="var(--color-accent)" />
      <circle cx="60" cy="44" r="27" fill="white" opacity="0.14" />
      <ellipse cx="60" cy="112" rx="45" ry="43" fill="white" opacity="0.14" />
      <text
        x="60"
        y="63"
        text-anchor="middle"
        fill="white"
        font-family="var(--font-heading)"
        font-size="46"
        font-weight="800"
        dominant-baseline="central"
      >
        {{ initial }}
      </text>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  name: { type: String, default: '?' },
  size: { type: Number, default: 120 },
  shape: { type: String, default: 'circle' },
})

const initial = computed(() => props.name.trim().charAt(0).toUpperCase() || '?')
</script>

<style scoped>
.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  background: var(--color-surface-strong);
}

.avatar-circle {
  border-radius: 50%;
}

.avatar-portrait {
  border-radius: var(--radius-xl);
}

.avatar-image,
.avatar-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.avatar-image {
  object-fit: cover;
}

.avatar-svg {
  border-radius: inherit;
}
</style>
