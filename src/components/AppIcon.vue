<template>
  <!-- 品牌图标（Simple Icons 官方图标） -->
  <svg
    v-if="brandIcon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :aria-label="name"
  >
    <path :d="brandIcon" />
  </svg>

  <!-- 其他图标走 Lucide -->
  <component v-else :is="iconComponent" :size="size" :stroke-width="1.75" v-bind="$attrs" />
</template>

<script setup>
import { computed } from 'vue'
import {
  Moon,
  Sun,
  ShieldCheck,
  ExternalLink,
  X,
  Menu,
} from 'lucide-vue-next'
import {
  siGithub,
  siBilibili,
  siGmail,
} from 'simple-icons'

const iconMap = {
  'moon': Moon,
  'sun': Sun,
  'shield-check': ShieldCheck,
  'external-link': ExternalLink,
  'x': X,
  'menu': Menu,
}

// 品牌图标使用 Simple Icons 官方 SVG path
const brandIcons = {
  'github': siGithub.path,
  'bilibili': siBilibili.path,
  'mail': siGmail.path,
}

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
})

const iconComponent = computed(() => {
  return iconMap[props.name] || null
})

const brandIcon = computed(() => {
  return brandIcons[props.name] || null
})
</script>