import isNil from 'lodash/isNil'
import isNumber from 'lodash/isNumber'
import debug from './env'

export default ({ mock, setup }: { mock?: boolean; setup: () => void }) => {
  if (mock !== false && debug) setup()
}

export const successResponseWrap = (data: unknown) => {
  return {
    data,
    status: 'ok',
    msg: '请求成功',
    code: 200,
  }
}

export const failResponseWrap = (data: unknown, msg: string, code = 500) => {
  return {
    data,
    status: 'fail',
    msg,
    code,
  }
}

export const filterData = (params: any, data: any) => {
  if (isNil(params.body)) {
    return data
  }
  const { searchText, searchName, sortName, sortOrder, pageNo, pageSize } = JSON.parse(params.body)
  const start = (pageNo - 1) * pageSize
  const end = pageNo * pageSize
  const sortData = data.sort((current: any, next: any) => {
    const c = current[sortName]
    const n = next[sortName]
    if (isNumber(c)) {
      return sortOrder === 'descend' ? c - n : n - c
    }
    return sortOrder === 'descend' ? c.localeCompare(n, 'zh') : n.localeCompare(c, 'zh')
  })
  const searchData = sortData.filter((item: any) => {
    const value = item[sortName]
    return value.includes(searchText)
  })
  return searchData.slice(start, end)
}

export const simulateDelete = (params: any, data: any) => {
  if (isNil(params.body)) {
    return data
  }
  const { ids, filterField } = JSON.parse(params.body)
  return data.filter((item: any) => {
    return !ids.includes(item[filterField])
  })
}
