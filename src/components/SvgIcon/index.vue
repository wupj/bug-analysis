<template>
  <svg :class="svgClass" :style="style" aria-hidden="true">
    <use :xlink:href="iconClass" />
  </svg>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps({
    iconName: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
      default: 'svg-icon',
    },
    style: {
      type: Object,
      default: () => ({
        width: '16px',
        height: '16px',
      }),
    },
  })
  const iconClass = computed(() => `#icon-${props.iconName}`)
  const svgClass = computed(() => {
    if (props.className) {
      return `svg-icon ${props.className}`
    }
    return props.className
  })
</script>

<script lang="ts">
  export default {
    name: 'SvgIcon',
  }
</script>

<style scoped>
  .svg-icon {
    vertical-align: middle;
  }
</style>
