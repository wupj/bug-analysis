import { defineStore } from 'pinia'
import { getUserList } from '@/api/manage/memberManage'

export interface stateProps {
  tableData?: []
}

const useMemberStore = defineStore('memberMange', {
  state: (): stateProps => ({
    tableData: [],
  }),
  actions: {
    async getTableData() {
      this.tableLoading = false
      const { data = [], code } = await getUserList()
      if (code === 200) {
        this.tableData = data
      }
      return data
    },
  },
})

export default useMemberStore
