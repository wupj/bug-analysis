import isNil from 'lodash/isNil'
import isNumber from 'lodash/isNumber'
import map from 'lodash/map'
import filter from 'lodash/filter'
import localforage from 'localforage'
import dayjs from 'dayjs'
import { toFixed } from '@/utils/index'

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

/**
 * 获取localForage的数据
 * @param  {string}   params 参数
 * @param  {Array}    data   数据
 */
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
  const searchData = filter(sortData, (item: any) => {
    const value = item[sortName]
    return value.includes(searchText)
  })
  return searchData.slice(start, end)
}

/**
 * 模拟数据删除
 * @param  {string}   params 参数
 * @param  {Array}    data   数据
 */
export const simulateDelete = (params: any, data: any) => {
  if (isNil(params.body)) {
    return data
  }
  const { ids, filterField } = JSON.parse(params.body)
  return filter(data, (item: any) => {
    return !ids.includes(item[filterField])
  })
}

/**
 * 获取localForage的数据
 * @param  {String}   key
 */
export const getLocalData = async (key: string) => {
  const data = await localforage.getItem(key)
  return data
}

/**
 * 设置localForage的数据
 * @param  {String}   key
 * @param  {Array}   data
 */
export const setLocalData = (key: string, data: []) => {
  localforage.setItem(key, data)
}

/**
 * 清除localForage的数据
 */
export const clearLocalData = () => {
  localforage.clear()
}

/**
 * 增加localForage的数据
 * @param  {String}   key
 * @param  {String}   field
 * @param  {Object}   data
 */
export const addLocalData = async (key: string, field: string, value: []) => {
  const $data = await getLocalData(key)
  $data.unshift({
    [field]: toFixed(Math.random() * 1000),
    createTime: dayjs().valueOf(),
    ...value,
  })
  setLocalData(key, $data)
}

/**
 * 修改localForage的数据
 * @param  {String}   key
 * @param  {String}   field
 * @param  {String}   fieldValue
 * @param  {Object}   data
 */
export const editLocalData = async (
  key: string,
  field: string,
  fieldValue: number | string,
  value: any
) => {
  const $data = await getLocalData(key)
  const dealData = map($data, (item: any) => {
    let $item = item
    if (item[field] === fieldValue) {
      $item = { ...$item, ...value, updateTime: dayjs().valueOf() }
    }
    return $item
  })
  setLocalData(key, dealData)
}

/**
 * 删除localForage的数据
 * @param  {String}   key
 * @param  {String}   field
 * @param  {Object}   data
 */
export const deleteLocalData = async (key: string, field: string, value: []) => {
  const $data = await getLocalData(key)
  const dealData = filter($data, (item: any) => {
    return !value.includes(item[field])
  })
  setLocalData(key, dealData)
}
