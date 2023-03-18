import { defineStore } from 'pinia'
import {
  getUserList,
  DeleteUser,
  getDepartment,
  getPosition,
  addUser,
} from '@/api/manage/memberManage'
import useLoading from '@/hooks/loading'
import { tableSorter, tablePage, tablePageSize, Pagination } from '@/types/global'
import message from '@/utils/message'

const { loading, setLoading } = useLoading(true)

export interface stateProps {
  loading?: unknown
  tableData?: []
  departmentData?: []
  positionData?: []
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
    positionData: [],
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
      const { data = [], code } = await getDepartment()
      if (code === 200) {
        this.departmentData = data.result
      }
      return data
    },
    async DeleteUser(ids) {
      this.setTableLoading(true)
      const { code } = await DeleteUser({ ids })
      if (code === 200) {
        message.success(t('message.operationSuccessful'))
        this.getTableData()
      }
    },
    async getPosition() {
      // @ts-ignore
      const { data = [], code } = await getPosition()
      if (code === 200) {
        this.positionData = data.result
      }
      return data
    },
    async addData(data: any) {
      const res = await addUser(data)
      return res
    },
  },
})

export default useMemberStore
