import Mock from 'mockjs'
import setupMock, { filterData, successResponseWrap } from '@/utils/setup-mock'
import { MockParams } from '@/types/mock'

import data from './data'

setupMock({
  setup() {
    // 用户信息
    Mock.mock(new RegExp('/api/memberManage/list'), (params: MockParams) => {
      const result = filterData(params, data)
      return successResponseWrap({
        result,
        total: result.length,
      })
    })
  },
})
