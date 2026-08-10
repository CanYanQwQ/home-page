<template>
  <div class="avatar-wrapper" :style="{ width: size + 'px', height: size + 'px' }">
    <!-- 用户提供的图片 -->
    <img
      v-if="src"
      :src="src"
      :alt="`${name} 的头像`"
      class="avatar-image"
      loading="lazy"
    />
    <!-- 默认 SVG 首字母头像 -->
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
      <defs>
        <linearGradient id="avatar-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#DC2626" />
          <stop offset="100%" stop-color="#B91C1C" />
        </linearGradient>
        <clipPath id="avatar-clip">
          <circle cx="60" cy="60" r="60" />
        </clipPath>
      </defs>
      <!-- 背景圆形 -->
      <circle cx="60" cy="60" r="60" fill="url(#avatar-grad)" />
      <!-- 人物剪影（简约风格） -->
      <g clip-path="url(#avatar-clip)" opacity="0.15">
        <circle cx="60" cy="46" r="28" fill="white" />
        <ellipse cx="60" cy="110" rx="44" ry="46" fill="white" />
      </g>
      <!-- 首字母 -->
      <text
        x="60"
        y="68"
        text-anchor="middle"
        fill="white"
        font-family="'Archivo', sans-serif"
        font-size="48"
        font-weight="700"
        dominant-baseline="central"
      >
        {{ initial }}
      </text>
    </svg>
    <!-- 悬浮光晕 -->
    <div class="avatar-glow" aria-hidden="true"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  name: { type: String, default: '?' },
  size: { type: Number, default: 120 },
})

const initial = computed(() => {
  return props.name.trim().charAt(0).toUpperCase() || '?'
})
</script>

<style scoped>
.avatar-wrapper {
  position: relative;
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.avatar-wrapper:hover {
  transform: scale(1.05);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}

.avatar-svg {
  display: block;
  border-radius: 50%;
}

.avatar-glow {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 50% 50%,
    var(--color-accent) 0%,
    transparent 60%
  );
  opacity: 0;
  z-index: -1;
  transition: opacity var(--transition-base);
  filter: blur(8px);
}

.avatar-wrapper:hover .avatar-glow {
  opacity: 0.35;
}
</style>