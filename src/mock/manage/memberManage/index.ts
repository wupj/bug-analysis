import Mock from 'mockjs'
import setupMock, { successResponseWrap } from '@/utils/setup-mock'
import { MockParams } from '@/types/mock'

import data from './data'

setupMock({
  setup() {
    // 用户信息
    Mock.mock(new RegExp('/api/memberManage/list'), (params: MockParams) => {
      return successResponseWrap({
        result: data,
        total: data.length,
      })
    })
  },
})
