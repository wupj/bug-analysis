import Mock from 'mockjs-async'
import setupMock, { filterData, getLocalData, successResponseWrap } from '@/utils/setup-mock'

import { MockParams } from '@/types/mock'

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/bugManage/list'), (params: MockParams) => {
      return new Promise(async (resolve) => {
        const res = await getLocalData('bugData')
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
