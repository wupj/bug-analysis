import { defineStore } from 'pinia'
import { getUserList } from '@/api/manage/memberManage'
import { getDepartmentList } from '@/api/manage/departmentManage'
import useLoading from '@/hooks/loading'
import { tableSorter, tablePage, tablePageSize, Pagination } from '@/types/global'

const { loading, setLoading } = useLoading(true)

export interface stateProps {
  loading?: unknown
  tableData?: []
  departmentData?: []
  searchText?: string
  searchName?: string
  sortName?: string
  sortOrder?: string
  pageNo: number
  pageSize: number
  total: number
}

const useMemberStore = defineStore('memberMange', {
  state: (): stateProps => ({
    searchText: '',
    loading,
    tableData: [],
    departmentData: [],
    searchName: 'userName',
    sortName: 'userName',
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
      const { data = [], code } = await getUserList(queryParams)
      if (code === 200) {
        this.tableData = data.result
        this.total = data.total
      }
      this.setTableLoading(false)
      return data
    },
    async getDepartment() {
      // @ts-ignore
      const { data = [], code } = await getDepartmentList()
      if (code === 200) {
        this.departmentData = data.result
      }
      return data
    },
  },
})

export default useMemberStore
