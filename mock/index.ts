import Mock from 'mockjs'

import './user'
import './manage/memberManage'
import './manage/bugTypeManage'
import './manage/bugManage'
import { clearLocalData, setLocalData } from '@/utils/setup-mock'

const datas = import.meta.globEager('./data/*.ts')

clearLocalData()
Object.keys(datas).forEach((key) => {
  if (Object.prototype.hasOwnProperty.call(datas, key)) {
    const keyField = key.replace(/(\.\/|\.ts|data\/)/g, '')
    setLocalData(keyField, datas[key].default)
  }
})

Mock.setup({
  timeout: '600-1000',
})
