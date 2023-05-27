<template>
  <a-modal
    v-model:visible="visible"
    :title="isEdit ? $t('memberManage.editName') : $t('memberManage.addName')"
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
          v-model="form.department"
          :fieldNames="departmentField"
          :data="departmentData"
          :placeholder="$t('select.pleaseSelect')"
          @select="changeDepartment"
        />
      </a-form-item>
      <a-form-item field="position" :label="$t('memberManage.position')" :rules="rules.position">
        <Select
          v-model="form.position"
          :fieldNames="positionField"
          :data="positionData"
          :placeholder="$t('select.pleaseSelect')"
          @select="changePosition"
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
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import { FormInstance } from '@arco-design/web-vue/es/form'
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface.d'
  import { useMemberStore } from '@/store'
  import message from '@/utils/message'
  import { validateChineseOrLetter } from '@/utils/validate'

  const { t } = useI18n()

  const emit = defineEmits(['done'])

  const visible = ref<boolean>(false)
  const isEdit = ref<boolean>(false)
  const loading = ref<boolean>(false)
  const formRef = ref<FormInstance | null>(null)
  const departmentField = ref({
    label: 'department',
    value: 'departmentId',
  })
  const positionField = ref({
    label: 'position',
    value: 'positionId',
  })
  const form = reactive<{
    userId: string
    name: string
    department: string
    position: string
  }>({
    userId: '',
    name: '',
    department: '',
    position: '',
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
    position: {
      required: true,
      message: t('memberManage.selectPosition'),
    },
  })

  const userStore = useMemberStore()
  const { departmentData, positionData } = storeToRefs(userStore)

  const showModal = (row) => {
    if (row) {
      form.userId = row.userId
      form.name = row.userName
      form.department = row.department
      form.position = row.post
      isEdit.value = true
    }
    visible.value = true
  }

  const changeDepartment = (value: unknown) => {
    form.departmentId = value.departmentId
    form.department = value.department
  }

  const changePosition = (value: unknown) => {
    form.positionId = value.positionId
    form.position = value.position
  }

  const handleSubmit = () => {
    loading.value = true
    formRef.value
      ?.validate(async (errors: Record<string, ValidatedError> | undefined) => {
        if (!errors) {
          const res = await userStore.addData(
            {
              userName: form.name,
              post: form.position,
              ...form,
            },
            isEdit.value
          )
          if (res.code === 200) {
            handleCancel()
            emit('done')
            message.success(t('message.operationSuccessful'))
          }
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

  const handleCancel = () => {
    visible.value = false
    isEdit.value = false
    form.department = ''
    formRef.value?.resetFields()
  }

  onBeforeMount(() => {
    userStore.getDepartment()
    userStore.getPosition()
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
