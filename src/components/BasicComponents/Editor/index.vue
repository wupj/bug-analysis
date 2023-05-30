<template>
  <div ref="editorRef"></div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import useLocale from '@/hooks/locale'
  import Editor from '@toast-ui/editor'
  import '@toast-ui/editor/dist/toastui-editor.css'

  const { currentLocale } = useLocale()
  const editorRef = ref()
  const editor = ref<any>(null)

  const props = defineProps({
    /**
     * 编辑器的初始值
     */
    editorValue: {
      type: String,
      required: true,
    },
    /**
     * 编辑器的高度
     */
    height: {
      type: String,
      default: '500px',
    },
    /**
     * 编辑器的初始类型  markdown  wysiwyg
     */
    initialEditType: {
      type: String,
      default: 'markdown',
    },
    /**
     * 编辑器的预览样式  tab  vertical
     */
    previewStyle: {
      type: String,
      default: 'vertical',
    },
    /**
     * 编辑器的其他配置
     */
    options: {
      type: Object,
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const editorEvents = [
    'load',
    'change',
    'caretChange',
    'focus',
    'blur',
    'keydown',
    'keyup',
    'beforePreviewRender',
    'beforeConvertWysiwygToMarkdown',
  ]

  const eventOptions = {}

  editorEvents.forEach((event) => {
    eventOptions[event] = (...args) => {
      emit(event, ...args)
    }
  })

  onMounted(() => {
    editor.value = new Editor({
      ...props.options,
      el: editorRef.value,
      initialValue: props.editorValue,
      initialEditType: props.initialEditType,
      previewStyle: props.previewStyle,
      height: props.height,
      language: currentLocale,
      events: eventOptions,
    })
  })

  onUnmounted(() => {
    editorEvents.forEach((event) => {
      editor.value.off(event)
    })
    editor.value.destroy()
  })
</script>

<script lang="ts">
  export default {
    name: 'Editor',
  }
</script>

<style scoped></style>
