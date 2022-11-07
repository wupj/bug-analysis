<template>
  <div class="loading-container">
    <div class="loading-container-icon">
      <a-spin :loading="loading" :tip="tip" dot>
        <template #element>
          <slot />
        </template>
      </a-spin>
    </div>
  </div>
</template>

<script lang="ts" setup>
  // @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const props = defineProps({
    /**
     * 是否加载中状态
     */
    loading: {
      type: Boolean,
      required: true,
    },
    /**
     * 提示内容
     */
    tip: {
      type: String,
    },
  })
</script>

<script lang="ts">
  export default {
    name: 'Loading',
  }
</script>

<style lang="less" scoped>
  .loading-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    text-align: center;
    transition: opacity 0.1s cubic-bezier(0, 0, 1, 1);
    user-select: none;

    .loading-container-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      transform: translate(-50%, -50%);
    }
  }
</style>
