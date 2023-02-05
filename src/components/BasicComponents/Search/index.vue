<template>
  <a-input-search
    :v-model="searchValue"
    :placeholder="placeholderText"
    :allow-clear="allowClear"
    :style="style"
    search-button
    v-bind="$attrs"
  />
</template>

<script lang="ts" setup>
  defineProps({
    /**
     * 输入的值
     */
    searchValue: {
      type: String,
      default: '',
    },
    /**
     * 提示文案
     */
    placeholderText: {
      type: String,
      default: '',
    },
    /**
     * 是否允许清空输入框
     */
    allowClear: {
      type: Boolean,
      default: true,
    },
    /**
     * 样式
     */
    style: {
      type: Object,
      default() {
        return {
          width: '180px',
        }
      },
    },
  })
</script>

<script lang="ts">
  export default {
    name: 'Search',
  }
</script>

<style scoped></style>
