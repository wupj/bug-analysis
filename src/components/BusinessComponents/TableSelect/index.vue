<template>
  <a-trigger
    ref="triggerRef"
    class="trigger-select"
    :trigger="trigger"
    :position="position"
    :show-arrow="showArrow"
    :unmount-on-close="unmountOnClose"
    auto-fit-popup-width
    v-bind="$attrs"
    @show="triggerShow"
    @hide="triggerHide"
  >
    <a-input :placeholder="placeholder" :allow-clear="allowClear">
      <template #suffix>
        <icon-up v-if="popupVisible" />
        <icon-down v-else />
      </template>
    </a-input>
    <template #content>
      <Table
        rowKey="userId"
        :loading="loading"
        :columns="columns"
        :tableData="data"
        :pagination="pagination"
        :showExport="false"
        v-bind="$attrs"
      />
    </template>
  </a-trigger>
</template>

<script lang="ts" setup>
  import { ref, defineExpose } from 'vue'
  import { TriggerInstance } from '@arco-design/web-vue/es/trigger'

  defineProps({
    /**
     * 触发方式
     */
    trigger: {
      type: Array,
      default() {
        return ['click']
      },
    },
    /**
     * 弹出位置
     */
    position: {
      type: String,
      default: 'bottom',
    },
    /**
     * 提示文案
     */
    placeholder: {
      type: String,
      default: '',
    },
    /**
     * 是否显示箭头
     */
    showArrow: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否允许清空输入框
     */
    allowClear: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否卸载节点
     */
    unmountOnClose: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否加载中状态
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * 表格行复选框的取值字段
     */
    rowKey: {
      type: String,
    },
    /**
     * 表格选项的数据
     */
    data: {
      type: Array,
      required: true,
    },
    /**
     * 表格选项的数据列
     */
    columns: {
      type: Array,
      required: true,
    },
    /**
     * 表格选项的分页
     */
    pagination: {
      type: [Boolean, Object],
    },
  })

  const triggerRef = ref<TriggerInstance>()
  const popupVisible = ref<boolean>(false)

  /**
   * 弹出框显示后
   */
  const triggerShow = () => {
    popupVisible.value = true
  }
  /**
   * 弹出框隐藏后
   */
  const triggerHide = () => {
    popupVisible.value = false
  }

  defineExpose({
    triggerRef,
  })
</script>

<script lang="ts">
  export default {
    name: 'TableSelect',
  }
</script>

<style lang="less" scoped>
  .trigger-select {
    :deep(.arco-table.table-container) {
      padding: 0 !important;

      tbody {
        .arco-table-tr {
          cursor: pointer;
        }
      }
    }
  }
</style>
