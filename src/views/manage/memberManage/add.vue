<template>
  <a-modal v-model:visible="visible" :title="$t('memberManage.addName')" @cancel="handleCancel">
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
          v-model="form.department"
          :fieldNames="fieldNames"
          :data="departmentData"
          :placeholder="$t('select.pleaseSelect')"
          @change="changeDepartment"
        />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button @click="handleCancel">{{ $t('button.cancel') }}</a-button>
      <a-button type="primary" :loading="loading" @click.stop="handleSubmit">{{
        $t('button.ok')
      }}</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, onBeforeMount } from 'vue'
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface.d'
  import { useMemberStore } from '@/store'
  import message from '@/utils/message'
  import { validateChineseOrLetter } from '@/utils/validate'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const visible = ref<boolean>(false)
  const loading = ref<boolean>(false)
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
    department: {
      required: true,
      message: t('memberManage.selectDepartment'),
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

  const handleSubmit = () => {
    loading.value = true
    formRef.value?.validate((errors: ValidatedError) => {
      loading.value = false
      if (!errors) {
        handleCancel()
        message.success(t('message.operationSuccessful'))
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
