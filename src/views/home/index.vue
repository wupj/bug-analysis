<template>
  <div class="container">
    <Table
      :loading="table.loading"
      :columns="table.columns"
      :tableData="table.tableData"
      :pagination="table.pagination"
      @request="getTableData"
    />
    <Select
      :data="selectData"
      :placeholderText="select.placeholderText"
      :selectVal="select.selectVal"
      :defaultVal="select.defaultVal"
      :multiple="select.multiple"
      :fieldNames="select.fieldNames"
    >
      <template #footer>
        <div style="padding: 6px 0; text-align: center">
          <a-button>Click Me</a-button>
        </div>
      </template>
    </Select>
  </div>
</template>

<script lang="tsx" setup>
  import { reactive, onBeforeMount } from 'vue'
  import Select from '@/components/Select/index.vue'

  const table = reactive({
    loading: true,
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 20,
        sort: true,
        defaultSort: true,
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
        width: 20,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        width: 20,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width: 20,
      },
      {
        title: 'Optional',
        slotName: 'optional',
        width: 20,
        render: () => {
          return <a-button>view</a-button>
        },
      },
    ],
    tableData: [],
  })
  const select = reactive({
    placeholderText: '搜索',
    selectVal: '1',
    defaultVal: '1',
    multiple: false,
    fieldNames: { value: 'id', label: 'name' },
  })

  const tableData = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ]
  const selectData = [
    {
      id: '1',
      name: '测试',
    },
    {
      id: '11',
      name: '测试2',
    },
  ]
  const getTableData = (params: any = null) => {
    setTimeout(() => {
      Object.assign(table, {
        tableData,
        loading: false,
        pagination: true,
      })
    }, 3000)
  }
  onBeforeMount(() => {
    getTableData()
  })
</script>

<script lang="tsx">
  export default {
    name: 'Home',
  }
</script>

<style scoped></style>
