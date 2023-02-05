import { defineStore } from 'pinia'
import { getUserList } from '@/api/manage/memberManage'
import useLoading from '@/hooks/loading'

const { loading, setLoading } = useLoading(true)

export interface stateProps {
  loading?: unknown
  tableData?: []
  searchText?: string
  searchName?: string
  sortName?: string
  sortOrder?: string
  pageNo?: number
  pageSize?: number
  total?: number
}

const useMemberStore = defineStore('memberMange', {
  state: (): stateProps => ({
    searchText: '',
    loading,
    tableData: [],
    searchName: 'userName',
    sortName: 'userName',
    sortOrder: 'descend',
    pageNo: 1,
    pageSize: 20,
    total: 0,
  }),
  getters: {
    pagination() {
      return {
        current: this.pageNo,
        pageSize: this.pageSize,
        total: this.total,
      }
    },
  },
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
    async getTableData(params: unknown = {}) {
      this.setTableLoading(true)
      Object.assign(this, params)
      const { searchText, searchName, sortName, sortOrder, pageNo, pageSize } = this
      const queryParams = {
        searchText,
        searchName,
        sortName,
        sortOrder,
        pageNo,
        pageSize,
        ...params,
      }
      const { data = [], code } = await getUserList(queryParams)
      if (code === 200) {
        this.tableData = data.result
        this.total = data.total
      }
      this.setTableLoading(false)
      return data
    },
  },
})

export default useMemberStore
