import Mock from 'mockjs-async'
import setupMock, { filterData, getLocalData, successResponseWrap } from '@/utils/setup-mock'

import { MockParams } from '@/types/mock'

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/bugTypeManage/list'), (params: MockParams) => {
      return new Promise(async (resolve) => {
        const res = await getLocalData('bugTypeData')
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
