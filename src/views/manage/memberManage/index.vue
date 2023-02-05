<template>
  <div class="container">
    <a-row>
      <a-col :span="24" class="padding-content">
        <Search
          :searchValue="searchText"
          placeholder="请输入姓名"
          @search="handleSearch"
          @pressEnter="handleSearch"
      /></a-col>
      <a-col :span="24">
        <Table
          rowKey="userId"
          :loading="loading"
          :columns="columns"
          :tableData="tableData"
          :pagination="pagination"
          showSelect
          @request="getTableData"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, onBeforeMount } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useMemberStore } from '@/store'

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

  const getTableData = async (params: unknown = null) => {
    await userStore.getTableData(params)
  }
  onBeforeMount(() => {
    getTableData()
  })
</script>

<script lang="ts">
  export default {
    name: 'MemberManage',
  }
</script>

<style scoped></style>
