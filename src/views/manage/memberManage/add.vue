<template>
  <a-modal
    v-model:visible="visible"
    :title="$t('global.add')"
    :okLoading="okLoading"
    @before-ok="handleBeforeOk"
    @cancel="handleCancel"
  >
    <a-form ref="formRef" :model="form">
      <a-form-item field="name" :label="$t('memberManage.name')" :rules="rules.name">
        <a-input v-model="form.name" :placeholder="$t('input.onlyChineseLetters')" />
      </a-form-item>
      <a-form-item
        field="department"
        :label="$t('memberManage.department')"
        :rules="rules.department"
      >
        <Select
          :fieldNames="fieldNames"
          :selectVal="form.department"
          :data="departmentData"
          :placeholder="$t('select.pleaseSelect')"
          @change="changeDepartment"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, onBeforeMount } from 'vue'
  import { useMemberStore } from '@/store'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const visible = ref<boolean>(false)
  const okLoading = ref<boolean>(false)
  const formRef = ref<null>(null)
  const fieldNames = ref({
    label: 'department',
    value: 'departmentId',
  })
  const form = reactive<{
    name: string
    department: string
  }>({
    name: '',
    department: '',
  })

  const rules = reactive({
    name: {
      required: true,
      message: t('input.onlyChineseLetters'),
    },
    department: {
      required: true,
      message: t('select.pleaseSelect'),
    },
  })

  const userStore = useMemberStore()
  const { departmentData } = storeToRefs(userStore)

  const showModal = () => {
    visible.value = true
  }

  const changeDepartment = (value: string) => {
    form.department = value
  }

  const handleBeforeOk = () => {
    okLoading.value = true
    formRef.value?.validate((errors) => {
      okLoading.value = false
      if (!errors) {
        handleCancel()
      }
    })
  }

  const handleCancel = () => {
    visible.value = false
    form.department = ''
    formRef.value?.resetFields()
  }

  onBeforeMount(() => {
    userStore.getDepartment()
  })

  defineExpose({
    showModal,
  })
</script>

<script lang="ts">
  export default {
    name: 'Add',
  }
</script>

<style scoped></style>
