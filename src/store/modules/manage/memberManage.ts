import { defineStore } from 'pinia'
import { getUserList } from '@/api/manage/memberManage'
import useLoading from '@/hooks/loading'
import { PaginationProps } from '@arco-design/web-vue/es/pagination/interface.d'

const { loading, setLoading } = useLoading(true)

const initPagination = {
  current: 1,
  pageSize: 10,
  total: 0,
}

export interface stateProps {
  searchText?: string
  loading?: unknown
  tableData: []
  pagination: PaginationProps
}

const useMemberStore = defineStore('memberMange', {
  state: (): stateProps => ({
    searchText: '',
    loading,
    tableData: [],
    pagination: initPagination,
  }),
  actions: {
    setTableLoading(value: boolean) {
      setLoading(value)
      this.loading = loading
    },
    setSearchText(value: string) {
      this.searchText = value
      this.pagination.current = 1
      this.getTableData()
    },
    async getTableData(params: unknown = null) {
      this.setTableLoading(true)
      const { data = [], code } = await getUserList(params)
      if (code === 200) {
        this.tableData = data.result
        this.pagination.total = data.total
      }
      this.setPagination(params)
      this.setTableLoading(false)
      return data
    },
    setPagination(value: any) {
      this.pagination = Object.assign(this.pagination, value)
    },
  },
})

export default useMemberStore
