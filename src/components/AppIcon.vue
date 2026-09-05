<template>
  <svg
    v-if="brandIcon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="brandIcon" />
  </svg>

  <component
    v-else
    :is="iconComponent"
    :size="size"
    :stroke-width="1.8"
    aria-hidden="true"
    focusable="false"
    v-bind="$attrs"
  />
</template>

<script setup>
import { computed } from 'vue'
import {
  ExternalLink,
  Moon,
  ShieldCheck,
  Sun,
} from 'lucide-vue-next'
import {
  siBilibili,
  siGithub,
  siGmail,
} from 'simple-icons'

const iconMap = {
  moon: Moon,
  sun: Sun,
  'shield-check': ShieldCheck,
  'external-link': ExternalLink,
}

const brandIcons = {
  github: siGithub.path,
  bilibili: siBilibili.path,
  mail: siGmail.path,
}

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
})

const iconComponent = computed(() => iconMap[props.name] || null)
const brandIcon = computed(() => brandIcons[props.name] || null)
</script>
