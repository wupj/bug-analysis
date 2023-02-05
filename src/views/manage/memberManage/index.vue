<template>
  <div class="container">
    <a-row>
      <a-col :span="24"> </a-col>
      <a-col :span="24">
        <Table
          :rowKey="id"
          :loading="loading"
          :columns="table.columns"
          :tableData="table.tableData"
          :pagination="table.pagination"
          @request="getTableData"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, onBeforeMount } from 'vue'
  import { useMemberStore } from '@/store'
  import useLoading from '@/hooks/loading'

  const userStore = useMemberStore()

  const { loading, setLoading } = useLoading()

  const table = reactive({
    columns: [
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
    ],
    tableData: [],
  })

  const getTableData = async (params: any = null) => {
    setLoading(true)
    const data = await userStore.getTableData()
    table.tableData = data
    setLoading(false)
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
