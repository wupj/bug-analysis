<template>
  <a-drawer
    :visible="visible"
    :title="title"
    width="70%"
    placement="right"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form ref="formRef" :model="form" :rules="rules">
      <a-form-item field="name" :label="$t('bugManage.Name')">
        <a-input v-model="form.name" :placeholder="$t('input.onlyChineseLetters')" allow-clear />
      </a-form-item>
      <a-form-item field="level" :label="$t('bugManage.level')">
        <Select
          v-model="form.level"
          :data="getConstant('bugLevel')"
          :fieldNames="{ value: 'value', label: 'key' }"
          :placeholder="$t('bugManage.selectLevel')"
        />
      </a-form-item>
      <a-form-item field="state" :label="$t('bugManage.state')">
        <Select
          v-model="form.state"
          :data="getConstant('bugState')"
          :fieldNames="{ value: 'value', label: 'key' }"
          :placeholder="$t('bugManage.selectState')"
          useI18n
        />
      </a-form-item>
      <a-form-item field="assignor" :label="$t('bugManage.assignor')">
        <TableSelect
          :columns="columns"
          :data="assData"
          :pagination="assPagination"
          :placeholder="$t('bugManage.selectAssignor')"
        />
      </a-form-item>
      <a-form-item field="cPerson" :label="$t('bugManage.cPerson')">
        <TableSelect
          :columns="columns"
          :data="ccData"
          :pagination="ccPagination"
          :placeholder="$t('bugManage.selectCPerson')"
        />
      </a-form-item>
      <a-form-item field="content" :label="$t('bugManage.level')">
        <Editor :editorValue="form.content" />
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, onBeforeMount } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { storeToRefs } from 'pinia'
  import { validateChineseOrLetter } from '@/utils/validate'
  import { getConstant } from '@/utils/constant'
  import { useBugStore } from '@/store'
  import TableSelect from '@/components/BusinessComponents/TableSelect/index.vue'
  import Editor from '@/components/BasicComponents/Editor/index.vue'

  const { t } = useI18n()

  const bugStore = useBugStore()
  const { assData, ccData, assPagination, ccPagination } = storeToRefs(bugStore)

  const visible = ref<boolean>(false)
  const title = ref<string>('新建Bug')
  const form = reactive<{
    id: number | null
    name: string | null
    level: number | null
    state: number | null
    content: string
  }>({
    id: null,
    name: null,
    level: null,
    state: null,
    content: '',
  })

  const rules = reactive({
    name: [
      {
        required: true,
        message: t('validate.cannotBeNull'),
      },
      {
        validator: validateChineseOrLetter,
        message: t('validate.incorrectFormat'),
      },
    ],
    level: [
      {
        required: true,
        message: t('bugManage.selectLevel'),
      },
    ],
    state: [
      {
        required: true,
        message: t('bugManage.selectState'),
      },
    ],
    assignor: [
      {
        required: true,
        message: t('bugManage.selectAssignor'),
      },
    ],
  })

  const columns = reactive([
    {
      title: t('memberManage.name'),
      dataIndex: 'userName',
      width: '30%',
    },
    {
      title: t('memberManage.department'),
      dataIndex: 'department',
      width: '30%',
    },
    {
      title: t('memberManage.position'),
      dataIndex: 'post',
      width: '30%',
    },
  ])

  const handleOpen = (row: any) => {
    if (row) {
      Object.assign(form, row)
    }
    visible.value = true
  }

  const handleOk = () => {}

  const handleCancel = () => {
    visible.value = false
  }

  onBeforeMount(() => {
    bugStore.getAssData()
    bugStore.getCCData()
  })

  defineExpose({
    handleOpen,
  })
</script>

<script lang="ts">
  export default {
    name: 'Add',
  }
</script>

<style scoped></style>
