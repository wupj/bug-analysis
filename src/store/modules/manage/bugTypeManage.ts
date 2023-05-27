import { defineStore } from 'pinia'
import { getBugTypeList } from '@/api/manage/bugTypeManage'
import useLoading from '@/hooks/loading'
import { tableSorter, tablePage, tablePageSize, Pagination } from '@/types/global'

const { loading, setLoading } = useLoading(true)

export interface stateProps {
  loading?: unknown
  tableData?: []
  searchText?: string
  searchName?: string
  sortName?: string
  sortOrder?: string
  pageNo: number
  pageSize: number
  total: number
}

const useBugTypeStore = defineStore('memberMange', {
  state: (): stateProps => ({
    searchText: '',
    loading,
    tableData: [],
    searchName: 'name',
    sortName: 'name',
    sortOrder: 'descend',
    pageNo: 1,
    pageSize: 20,
    total: 0,
  }),
  getters: {
    pagination(): Pagination {
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
    sorterChange(params: tableSorter) {
      this.sortName = params.sortName
      this.sortOrder = params.sortOrder
      this.getTableData()
    },
    pageChange(params: tablePage) {
      this.pageNo = params.pageNo
      this.getTableData()
    },
    pageSizeChange(params: tablePageSize) {
      this.pageSize = params.pageSize
      this.getTableData()
    },
    async getTableData() {
      this.setTableLoading(true)
      const { searchText, searchName, sortName, sortOrder, pageNo, pageSize } = this
      const queryParams = {
        searchText,
        searchName,
        sortName,
        sortOrder,
        pageNo,
        pageSize,
      }
      // @ts-ignore
      const { data = [], code } = await getBugTypeList(queryParams)
      if (code === 200) {
        this.tableData = data.result
        this.total = data.total
      }
      this.setTableLoading(false)
      return data
    },
  },
})

export default useBugTypeStore
