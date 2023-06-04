import { defineStore } from 'pinia'
import { getBugList } from '@/api/manage/bugManage'
import { getUserList } from '@/api/manage/memberManage'
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
  assLoading?: boolean
  assData?: []
  assPageNo: number
  assPageSize: number
  assTotal: number
  ccLoading?: boolean
  ccData?: []
  ccPageNo: number
  ccPageSize: number
  ccTotal: number
}

const useBugStore = defineStore('bugMange', {
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
    assLoading: true,
    assData: [],
    assPageNo: 1,
    assPageSize: 10,
    assTotal: 0,
    ccLoading: true,
    ccData: [],
    ccPageNo: 1,
    ccPageSize: 10,
    ccTotal: 0,
  }),
  getters: {
    pagination(): Pagination {
      return {
        current: this.pageNo,
        pageSize: this.pageSize,
        total: this.total,
      }
    },
    assPagination(): Pagination {
      return {
        current: this.assPageNo,
        pageSize: this.assPageSize,
        total: this.assTotal,
      }
    },
    ccPagination(): Pagination {
      return {
        current: this.ccPageNo,
        pageSize: this.ccPageSize,
        total: this.ccTotal,
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
      const { data = [], code } = await getBugList(queryParams)
      if (code === 200) {
        this.tableData = data.result
        this.total = data.total
      }
      this.setTableLoading(false)
      return data
    },
    async getAssData() {
      this.assLoading = true
      const { searchText, assPageNo, assPageSize } = this
      const queryParams = {
        searchText,
        sortName: 'userName',
        pageNo: assPageNo,
        pageSize: assPageSize,
      }
      // @ts-ignore
      const { data = [], code } = await getUserList(queryParams)
      if (code === 200) {
        this.assData = data.result
        this.assTotal = data.total
      }
      this.assLoading = false
      return data
    },
    async getCCData() {
      this.ccLoading = true
      const { searchText, ccPageNo, ccPageSize } = this
      const queryParams = {
        searchText,
        sortName: 'userName',
        pageNo: ccPageNo,
        pageSize: ccPageSize,
      }
      // @ts-ignore
      const { data = [], code } = await getUserList(queryParams)
      if (code === 200) {
        this.ccData = data.result
        this.ccTotal = data.total
      }
      this.ccLoading = false
      return data
    },
  },
})

export default useBugStore
