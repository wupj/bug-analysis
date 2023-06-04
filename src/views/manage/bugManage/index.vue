<template>
  <div class="container">
    <a-row class="arco-row-block">
      <a-col :span="24" class="padding-content">
        <Search
          :searchValue="searchText"
          :placeholder="$t('bugManage.enterName')"
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
    <Add ref="addRef" />
  </div>
</template>

<script lang="tsx" setup>
  import { ref, reactive, onBeforeMount } from 'vue'
  import dayjs from 'dayjs'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import { useBugStore } from '@/store'
  import { tableSorter, tablePage, tablePageSize } from '@/types/global'
  import { getConstantKey } from '@/utils/constant'
  import Add from './add.vue'

  const { t } = useI18n()
  const addRef = ref<null>(null)

  const bugStore = useBugStore()
  bugStore.$reset()

  const { searchText, loading, tableData, pagination } = storeToRefs(bugStore)

  const levelColor = ['#f53f3f', '#ff5722', '#ff7d00', '#ffb400']
  const stateColor = ['#7816ff', '#165dff', '#b71de8', '#0fc6c2', '#00b42a']

  const selectRow = reactive([])
  const columns = reactive([
    {
      title: t('bugManage.Name'),
      dataIndex: 'name',
      width: '20%',
      sort: true,
      defaultSort: true,
    },
    {
      title: t('bugManage.level'),
      dataIndex: 'level',
      width: '10%',
      sort: true,
      defaultSort: true,
      render: ({ record }) => {
        return (
          <a-tag color={levelColor[record.level]}>{getConstantKey('bugLevel', record.level)}</a-tag>
        )
      },
    },
    {
      title: t('bugManage.state'),
      dataIndex: 'state',
      width: '10%',
      sort: true,
      defaultSort: true,
      render: ({ record }) => {
        return (
          <a-tag color={stateColor[record.level]}>
            {t(getConstantKey('bugState', record.level))}
          </a-tag>
        )
      },
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
    bugStore.setSearchText(value)
  }

  const handleEenter = (Event: any) => {
    handleSearch(Event?.currentTarget?.value)
  }

  const clickAdd = (row: unknown) => {
    addRef.value?.handleOpen(row)
  }

  const clickDelete = () => {}

  const clickRowDelete = (row: unknown) => {}

  const selectionChange = async (rowKeys: []) => {
    selectRow.push(...rowKeys)
  }

  const sorterChange = (params: tableSorter) => {
    bugStore.sorterChange(params)
  }

  const pageChange = (params: tablePage) => {
    bugStore.pageChange(params)
  }

  const pageSizeChange = (params: tablePageSize) => {
    bugStore.pageSizeChange(params)
  }
  onBeforeMount(() => {
    bugStore.getTableData()
  })
</script>

<script lang="tsx">
  export default {
    name: 'BugManage',
  }
</script>

<style scoped></style>
