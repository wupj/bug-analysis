<template>
  <div ref="editorRef"></div>
</template>

<script lang="ts" setup>
  import { ref, watch, defineExpose, onMounted, onUnmounted } from 'vue'
  import useLocale from '@/hooks/locale'
  import Editor from '@toast-ui/editor'
  import '@toast-ui/editor/dist/i18n/zh-cn'
  import '@toast-ui/editor/dist/toastui-editor.css'

  const { currentLocale } = useLocale()
  const editorRef = ref()
  let editor: any = null

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

  const emit = defineEmits([
    'load',
    'change',
    'caretChange',
    'focus',
    'blur',
    'keydown',
    'keyup',
    'beforePreviewRender',
    'beforeConvertWysiwygToMarkdown',
  ])

  const eventOptions: any = {}

  editorEvents.forEach((event: string) => {
    eventOptions[event] = (...args: any) => {
      emit(event, ...args)
    }
  })

  watch(
    () => props.editorValue,
    (newValue) => {
      editor?.setMarkdown(newValue)
    }
  )

  const invoke = (methodName: string, ...args: any) => {
    let result = null
    if (editor[methodName]) {
      result = editor[methodName](...args)
    }
    return result
  }

  onMounted(() => {
    editor = new Editor({
      ...props.options,
      el: editorRef.value,
      initialValue: props.editorValue,
      initialEditType: props.initialEditType,
      previewStyle: props.previewStyle,
      height: props.height,
      language: currentLocale.value,
      events: eventOptions,
    })
  })

  onUnmounted(() => {
    editorEvents.forEach((event) => {
      editor?.off(event)
    })
    editor?.destroy()
  })

  defineExpose({
    editorRef,
    editor,
    invoke,
  })
</script>

<script lang="ts">
  export default {
    name: 'Editor',
  }
</script>

<style scoped></style>
