<template>
  <div class="export flex-center">
    <template v-if="type === 'table'">
      <a-tooltip :content="content">
        <SvgIcon iconName="download" className="download" @click="downloadExcel" />
      </a-tooltip>
    </template>
    <template v-else-if="type === 'custom'">
      <slot />
    </template>
    <template v-else></template>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { computed } from 'vue'
  import { exportExcel } from '@/utils'

  const { t } = useI18n()

  const props = defineProps({
    /**
     * 下载类型
     */
    type: {
      type: String,
      default: 'all',
    },
    /**
     * 是否显示border
     */
    border: {
      type: Boolean,
      default: true,
    },
    /**
     * 下载按钮浮层文字
     */
    tipContent: {
      type: String,
    },
    /**
     * 表格的列
     */
    tableColumns: {
      type: String,
    },
    /**
     * 表格的数据
     */
    tableData: {
      type: String,
    },
  })

  /**
   * 下载按钮浮层文字
   */
  const content = computed(() => {
    if (props.tipContent) {
      return props.tipContent
    }
    return t('global.download')
  })

  /**
   * 导出excel
   */
  const downloadExcel = () => {
    exportExcel(props.tableColumns, props.tableData, '')
  }
</script>

<script lang="ts">
  export default {
    name: 'Export',
  }
</script>

<style lang="less" scoped>
  .export {
    .download {
      width: @base-px * 5;
      height: @base-px * 5;
      outline-color: transparent;
      cursor: pointer;
      fill: rgb(var(--primary-6));

      &:hover,
      &:active {
        fill: rgb(var(--primary-5));
      }
    }
  }
</style>
