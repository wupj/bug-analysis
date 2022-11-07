<template>
  <a-select
    :multiple="multiple"
    :v-model="selectVal"
    :style="selectStyle"
    :placeholder="placeholderText"
    :default-value="defaultVal"
    :trigger-props="{ autoFitPopupMinWidth: true }"
    :allow-clear="allowClear"
    :max-tag-count="maxTagCount"
    :allow-create="allowCreate"
    :bordered="bordered"
    :loading="loading"
    :field-names="fieldNames"
    :search-icon="searchIcon"
    :loading-icon="loadingIcon"
    @change="changeVal"
    @dropdown-scroll="handleScroll"
    @dropdown-reach-bottom="handleReachBottom"
    @clear="clear"
    @remove="remove"
  >
    <a-option v-for="(item, idx) in data" :key="idx" :value="item[fieldNames.value]">
      {{ item[fieldNames.label] }}
    </a-option>
    <!-- 具名插槽 -->
    <slot name="footer"></slot>
  </a-select>
</template>

<script setup lang="ts">
  import { PropType } from 'vue'
  import { SelectOptionData, SelectOptionValue } from '@arco-design/web-vue/es/select/interface'

  const props = defineProps({
    /** 加载图标 */
    loadingIcon: {
      type: String,
    },
    /** 搜索的icon图标 */
    searchIcon: {
      type: String,
    },
    /** 自定义 SelectOptionData 中的字段 */
    fieldNames: {
      type: Object,
      default: () => {
        return {
          value: 'value',
          label: 'label',
        }
      },
    },
    /** 是否开启多选 */
    multiple: {
      type: Boolean,
      default: false,
    },
    /** 默认的值 */
    defaultVal: {
      type: String as PropType<SelectOptionValue>,
      default: '',
    },
    /** 选中的值 */
    selectVal: {
      type: String,
      default: undefined,
    },
    /** 下拉筛选框的数据 */
    data: {
      type: Array as PropType<SelectOptionData[]>,
      required: true,
    },
    /** 下拉提示文案 */
    placeholderText: {
      type: String,
    },
    /** 是否允许清除 */
    allowClear: {
      type: Boolean,
      default: false,
    },
    /** 多选最多显示多少个 */
    maxTagCount: {
      type: Number,
      default: 2,
    },
    /** 是否有边框 */
    bordered: {
      type: Boolean,
      default: true,
    },
    /** 加载loading */
    loading: {
      type: Boolean,
      default: false,
    },
    /** 让选择器可以创建选项中不存在的条目 */
    allowCreate: {
      type: Boolean,
      default: false,
    },
    /** 下拉样式 */
    selectStyle: {
      type: Object,
      default: () => {
        return {
          width: '160px',
          height: '32px',
        }
      },
    },
  })
  const emit = defineEmits([
    'change',
    'handleSeclectScroll',
    'handleSeclectReachBottom',
    'clearSeclect',
    'removeSeclect',
  ])
  /**
   * 选中的值发生改变的时候触发
   * @param  {any} val
   */
  const changeVal = (val: any) => {
    /** let arrVal: any[] = []
    if (typeof val === 'string') {
      arrVal.push(val)
    } else {
      arrVal = val
    }
    const objVal = props.data.filter((item) => {
      return arrVal.includes(item.value)
    }) */
    emit('change', val)
  }
  /**
   * 监听下拉菜单的滚动事件
   */
  const handleScroll = (ev: any) => {
    emit('handleSeclectScroll', ev)
  }
  /**
   * 监听下拉菜单滚动到底部的事件
   */
  const handleReachBottom = (ev: any) => {
    emit('handleSeclectReachBottom', ev)
  }
  /** 点击清除触发事件 */
  const clear = () => {
    emit('clearSeclect')
  }
  /** 点击标签的删除按钮时触发  */
  const remove = () => {
    emit('removeSeclect')
  }
</script>

<script lang="ts">
  export default {
    name: 'Select',
  }
</script>

<style lang="less" scoped></style>
