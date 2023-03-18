<template>
  <div class="container">
    <a-row class="arco-row-block">
      <a-col :span="24" class="padding-content">
        <Search
          :searchValue="searchText"
          :placeholder="$t('memberManage.enterName')"
          @search="handleSearch"
          @press-enter="handleSearch"
      /></a-col>
      <a-col :span="24">
        <Table
          rowKey="userId"
          :loading="loading"
          :columns="columns"
          :tableData="tableData"
          :pagination="pagination"
          showSelect
          @selection-change="selectionChange"
          @sorter-change="sorterChange"
          @page-change="pageChange"
          @page-size-change="pageSizeChange"
        >
          <template #leftButton
            ><a-button type="primary" @click="clickAdd">{{ $t('global.add') }}</a-button
            ><a-button
              class="ml8"
              type="primary"
              status="danger"
              :disabled="!selectRow.length"
              @click="clickDelete"
              >{{ $t('global.delete') }}</a-button
            ></template
          >
        </Table>
        <Add ref="addRef" @done="handleSearch" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="tsx" setup>
  import { ref, reactive, onBeforeMount } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import { useMemberStore } from '@/store'
  import { tableSorter, tablePage, tablePageSize } from '@/types/global'
  import Add from './add.vue'

  const { t } = useI18n()

  const addRef = ref<null>(null)

  const userStore = useMemberStore()
  userStore.$reset()

  const { searchText, loading, tableData, pagination } = storeToRefs(userStore)

  const selectRow = reactive([])
  const columns = reactive([
    {
      title: t('memberManage.name'),
      dataIndex: 'userName',
      width: '30%',
      sort: true,
      defaultSort: true,
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
    {
      title: t('global.operation'),
      dataIndex: 'operation',
      width: '10%',
      render: ({ record }) => {
        return (
          <div>
            <a-link onClick={() => clickAdd(record)}>{t('global.edit')}</a-link>
            <a-link status="danger" onClick={() => clickRowDelete(record)}>
              {t('global.delete')}
            </a-link>
          </div>
        )
      },
    },
  ])

  const handleSearch = (value = '') => {
    userStore.setSearchText(value)
  }

  const clickAdd = (row) => {
    addRef.value?.showModal(row)
  }

  const clickDelete = () => {
    userStore.DeleteUser(selectRow)
  }

  const clickRowDelete = (row) => {
    userStore.DeleteUser([row.userId])
  }

  const selectionChange = async (rowKeys) => {
    selectRow.push(...rowKeys)
  }

  const sorterChange = (params: tableSorter) => {
    userStore.sorterChange(params)
  }

  const pageChange = (params: tablePage) => {
    userStore.pageChange(params)
  }

  const pageSizeChange = (params: tablePageSize) => {
    userStore.pageSizeChange(params)
  }
  onBeforeMount(() => {
    userStore.getTableData()
  })
</script>

<script lang="tsx">
  export default {
    name: 'MemberManage',
  }
</script>

<style scoped></style>
