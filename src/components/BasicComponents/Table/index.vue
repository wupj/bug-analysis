<template>
  <div class="table-button">
    <div class="left-button">
      <slot name="leftButton" />
    </div>
    <div class="right-button">
      <slot name="rightButton" />
      <Export v-if="showExport" type="table" :tableColumns="tableColumns" :tableData="tableData" />
    </div>
  </div>
  <a-table
    class="table-container"
    :loading="tableLoading"
    :row-key="rowKey"
    :row-selection="rowSelection"
    :columns="tableColumns"
    :data="tableData"
    :pagination="tablePagination"
    pagePosition="bottom"
    v-bind="$attrs"
    @sorter-change="sorterChange"
    @page-change="pageChange"
    @page-size-change="pageSizeChange"
    @selection-change="selectionChange"
    @row-click="rowClick"
  >
  </a-table>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { TableData } from '@arco-design/web-vue/es/table/interface.d'
  import cloneDeep from 'lodash/cloneDeep'
  import assign from 'lodash/assign'
  import isBoolean from 'lodash/isBoolean'
  import Export from '@/components/BusinessComponents/Export/index.vue'

  const props = defineProps({
    /**
     * 表格行复选框的取值字段
     */
    rowKey: {
      type: String,
    },
    /**
     * 是否显示表格行复选框
     */
    showSelect: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否加载中状态
     */
    loading: {
      type: Boolean,
    },
    /**
     * 表格的列配置
     * 自定义单元格使用render渲染，script标签的lang改为tsx
     * @example
     * render: (data) => {
     *   return <a-button onClick={handleClick}>view</a-button>
     * }
     */
    columns: {
      type: Array,
      required: true,
    },
    /**
     * 表格的数据
     */
    tableData: {
      type: Array,
      required: true,
    },
    /**
     * 分页的配置
     * @example
     * {
     *   total: 数据总数
     *   current: 当前的页数
     *   pageSize: 展示的条数
     * }
     */
    pagination: {
      type: [Boolean, Object],
    },
    /**
     * 是否显示下载
     */
    showExport: {
      type: Boolean,
      default: true,
    },
  })

  /**
   * 表格loading配置
   */
  const tableLoading = computed(() => {
    if (props.loading) {
      return assign(
        {
          dot: true,
        },
        {
          loading: props.loading,
        }
      )
    }
    return false
  })

  /**
   * 表格行复选框单元格配置
   */
  const rowSelection = computed(() => {
    if (props.showSelect) {
      return {
        type: 'checkbox',
        showCheckedAll: true,
      }
    }
    return null
  })

  /**
   * 表格列配置
   */
  const tableColumns = computed(() => {
    return cloneDeep(props.columns).map((item: any) => {
      if (item.sort) {
        item.sortable = {
          sortDirections: ['ascend', 'descend'],
        }
        if (item.defaultSort) {
          item.sortable.defaultSortOrder = isBoolean(item.defaultSort)
            ? 'descend'
            : item.defaultSort
        }
      }
      return item
    })
  })

  /**
   * 表格分页配置
   */
  const tablePagination = computed(() => {
    if (props.pagination) {
      return assign(
        {
          showTotal: true,
          showJumper: true,
          showPageSize: true,
          pageSizeOptions: [10, 20, 30, 50, 100],
        },
        props.pagination
      )
    }
    return false
  })

  const emit = defineEmits([
    'sorterChange',
    'pageChange',
    'pageSizeChange',
    'selectionChange',
    'rowClick',
  ])

  /**
   * 排序状态改变时触发
   * @param {string} sortName
   * @param {string} direction
   */
  const sorterChange = (sortName: string, sortOrder: string) => {
    emit('sorterChange', {
      sortName,
      sortOrder,
    })
  }

  /**
   * 页码切换改变时触发
   * @param {string} pageNo
   */
  const pageChange = (pageNo: number) => {
    emit('pageChange', {
      pageNo,
    })
  }

  /**
   * 展示页数切换改变时触发
   * @param {number} pageSize
   */
  const pageSizeChange = (pageSize: number) => {
    emit('pageSizeChange', {
      pageSize,
    })
  }

  /**
   * 行复选框改变时触发
   * @param {string} rowKeys
   */
  const selectionChange = (rowKeys: string[]) => {
    emit('selectionChange', rowKeys)
  }

  /**
   * 点击表格行时触发
   * @param {TableData} record
   */
  const rowClick = (record: TableData) => {
    emit('rowClick', record)
  }
</script>

<script lang="ts">
  export default {
    name: 'Table',
  }
</script>

<style lang="less" scoped>
  .table-button {
    display: flex;
    flex: 1;
    padding: 0 @padding-medium;

    .left-button,
    .right-button {
      display: flex;
      flex: 1;
    }

    .left-button {
      justify-content: left;
    }

    .right-button {
      justify-content: right;
    }
  }

  .table-container {
    position: relative;
    width: 100%;
    height: auto;
    padding: @padding-medium;

    :deep(.arco-spin) {
      height: auto;
    }

    :deep(.arco-table-th.arco-table-col-sorted) {
      background-color: var(--color-neutral-2);
    }

    :deep(.arco-table-td.arco-table-col-sorted) {
      background-color: var(--color-bg-2);
    }
  }
</style>
