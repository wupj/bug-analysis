import Mock from 'mockjs'
import setupMock, { filterData, simulateDelete, successResponseWrap } from '@/utils/setup-mock'
import { MockParams } from '@/types/mock'

import data from './data'
import department from './department'
import position from './position'

setupMock({
  setup() {
    // 人员信息
    Mock.mock(new RegExp('/api/memberManage/list'), (params: MockParams) => {
      const result = filterData(params, data)
      return successResponseWrap({
        result,
        total: result.length,
      })
    })
    // 删除人员信息
    Mock.mock(new RegExp('/api/memberManage/deleteById'), (params: MockParams) => {
      const result = simulateDelete(params, data)
      return successResponseWrap({
        result,
        total: result.length,
      })
    })
    // 部门信息
    Mock.mock(new RegExp('/api/memberManage/department'), (params: MockParams) => {
      const result = filterData(params, department)
      return successResponseWrap({
        result,
        total: result.length,
      })
    })
    // 职位信息
    Mock.mock(new RegExp('/api/memberManage/position'), (params: MockParams) => {
      const result = filterData(params, position)
      return successResponseWrap({
        result,
        total: result.length,
      })
    })
  },
})
