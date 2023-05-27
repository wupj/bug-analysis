import Mock from 'mockjs-async'
import setupMock, {
  addLocalData,
  deleteLocalData,
  editLocalData,
  filterData,
  getLocalData,
  successResponseWrap,
} from '@/utils/setup-mock'
import { MockParams } from '@/types/mock'

setupMock({
  setup() {
    // 人员信息
    Mock.mock(new RegExp('/api/memberManage/list'), (params: MockParams) => {
      return new Promise(async (resolve) => {
        const res = await getLocalData('userData')
        const result = filterData(params, res)
        resolve(
          successResponseWrap({
            result,
            total: result.length,
          })
        )
      })
    })
    // 增加人员信息
    Mock.mock(new RegExp('/api/memberManage/add'), (params: MockParams) => {
      return new Promise(async (resolve) => {
        addLocalData('userData', 'userId', JSON.parse(params.body))
        resolve(successResponseWrap())
      })
    })
    // 编辑人员信息
    Mock.mock(new RegExp('/api/memberManage/edit'), (params: MockParams) => {
      return new Promise(async (resolve) => {
        editLocalData('userData', 'userId', JSON.parse(params.body).userId, JSON.parse(params.body))
        resolve(successResponseWrap())
      })
    })
    // 删除人员信息
    Mock.mock(new RegExp('/api/memberManage/deleteById'), (params: MockParams) => {
      deleteLocalData('userData', 'userId', JSON.parse(params.body).ids)
      return successResponseWrap()
    })
    // // 部门信息
    Mock.mock(new RegExp('/api/memberManage/department'), (params: MockParams) => {
      return new Promise(async (resolve) => {
        const res = await getLocalData('departmentData')
        const result = filterData(params, res)
        resolve(
          successResponseWrap({
            result,
            total: result.length,
          })
        )
      })
    })
    // // 职位信息
    Mock.mock(new RegExp('/api/memberManage/position'), (params: MockParams) => {
      return new Promise(async (resolve) => {
        const res = await getLocalData('positionData')
        const result = filterData(params, res)
        resolve(
          successResponseWrap({
            result,
            total: result.length,
          })
        )
      })
    })
  },
})
