<template>
  <a-select :loading="loading" :placeholder="placeholder" :style="selectStyle" v-bind="$attrs">
    <a-option
      v-for="(item, idx) in data"
      :key="idx"
      :value="item[fieldNames.value]"
      @click="handleSelect(item)"
    >
      {{ item[fieldNames.label] }}
    </a-option>
    <slot name="footer"></slot>
  </a-select>
</template>

<script setup lang="ts">
  import { PropType } from 'vue'
  import { SelectOptionData } from '@arco-design/web-vue/es/select/interface.d'

  defineProps({
    /**
     * 是否加载中状态
     */
    loading: {
      type: Boolean,
      default: false,
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
    placeholder: {
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
    },
  })

  const emit = defineEmits(['select'])

  const handleSelect = (item: SelectOptionData) => {
    emit('select', item)
  }
</script>

<script lang="ts">
  export default {
    name: 'Select',
  }
</script>

<style lang="less" scoped />
