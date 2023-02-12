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
          @sorterChange="sorterChange"
          @pageChange="pageChange"
          @pageSizeChange="pageSizeChange"
        >
          <template #leftButton
            ><a-button type="primary" @click="clickAdd">{{ $t('global.add') }}</a-button></template
          >
        </Table>
        <Add ref="addRef" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onBeforeMount } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useMemberStore } from '@/store'
  import { tableSorter, tablePage, tablePageSize } from '@/types/global'
  import Add from './add.vue'

  const addRef = ref<null>(null)

  const userStore = useMemberStore()
  userStore.$reset()

  const { searchText, loading, tableData, pagination } = storeToRefs(userStore)

  const columns = reactive([
    {
      title: '姓名',
      dataIndex: 'userName',
      width: '30%',
      sort: true,
      defaultSort: true,
    },
    {
      title: '部门',
      dataIndex: 'department',
      width: '30%',
    },
    {
      title: '职位',
      dataIndex: 'post',
      width: '30%',
    },
  ])

  const handleSearch = (value: string) => {
    userStore.setSearchText(value)
  }

  const clickAdd = () => {
    addRef.value?.showModal()
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

<script lang="ts">
  export default {
    name: 'MemberManage',
  }
</script>

<style scoped></style>
