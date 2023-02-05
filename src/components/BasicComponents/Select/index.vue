<template>
  <a-select
    :v-model="selectVal"
    :default-value="defaultVal"
    :loading="loading"
    :placeholder="placeholderText"
    :style="selectStyle"
    v-bind="$attrs"
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
  import { SelectOptionData, SelectOptionValue } from '@arco-design/web-vue/es/select/interface.d'

  defineProps({
    /**
     * 是否加载中状态
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * 默认的值
     */
    defaultVal: {
      type: String as PropType<SelectOptionValue>,
      default: '',
    },
    /**
     * 选中的值
     */
    selectVal: {
      type: String,
      default: undefined,
    },
    /**
     * 自定义 SelectOptionData 中的字段
     */
    fieldNames: {
      type: Object,
      default: () => {
        return {
          value: 'value',
          label: 'label',
        }
      },
    },
    /**
     * 下拉筛选框的数据
     */
    data: {
      type: Array as PropType<SelectOptionData[]>,
      required: true,
    },
    /**
     * 提示文案
     */
    placeholderText: {
      type: String,
      default: '',
    },
    /**
     * 是否允许清除
     */
    allowClear: {
      type: Boolean,
      default: false,
    },
    /**
     * 让选择器可以创建选项中不存在的条目
     */
    allowCreate: {
      type: Boolean,
      default: false,
    },
    /**
     *下拉样式
     */
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
</script>

<script lang="ts">
  export default {
    name: 'Select',
  }
</script>

<style lang="less" scoped />
