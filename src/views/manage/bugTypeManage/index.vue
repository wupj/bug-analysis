<template>
  <div class="container">
    <a-row class="arco-row-block">
      <a-col :span="24" class="padding-content">
        <Search
          :searchValue="searchText"
          :placeholder="$t('bugTypeManage.enterName')"
          @search="handleSearch"
          @press-enter.self="handleEenter"
      /></a-col>
      <a-col :span="24">
        <Table
          rowKey="id"
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
      </a-col>
    </a-row>
  </div>
</template>

<script lang="tsx" setup>
  import { ref, reactive, onBeforeMount } from 'vue'
  import dayjs from 'dayjs'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import { useBugTypeStore } from '@/store'
  import { tableSorter, tablePage, tablePageSize } from '@/types/global'

  const { t } = useI18n()

  const bugTypeStore = useBugTypeStore()
  bugTypeStore.$reset()

  const { searchText, loading, tableData, pagination } = storeToRefs(bugTypeStore)

  const selectRow = reactive([])
  const columns = reactive([
    {
      title: t('bugTypeManage.Name'),
      dataIndex: 'name',
      width: '40%',
      sort: true,
      defaultSort: true,
    },
    {
      title: t('bugTypeManage.CreateTime'),
      dataIndex: 'createTime',
      width: '40%',
      render: ({ record }) => {
        return record?.createTime && dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    {
      title: t('global.operation'),
      dataIndex: 'operation',
      width: '20%',
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
    bugTypeStore.setSearchText(value)
  }

  const handleEenter = (Event) => {
    handleSearch(Event?.currentTarget?.value)
  }

  const clickAdd = (row: unknown) => {}

  const clickDelete = () => {}

  const clickRowDelete = (row: unknown) => {}

  const selectionChange = async (rowKeys: []) => {
    selectRow.push(...rowKeys)
  }

  const sorterChange = (params: tableSorter) => {
    bugTypeStore.sorterChange(params)
  }

  const pageChange = (params: tablePage) => {
    bugTypeStore.pageChange(params)
  }

  const pageSizeChange = (params: tablePageSize) => {
    bugTypeStore.pageSizeChange(params)
  }
  onBeforeMount(() => {
    bugTypeStore.getTableData()
  })
</script>

<script lang="tsx">
  export default {
    name: 'BugTypeManage',
  }
</script>

<style scoped></style>
