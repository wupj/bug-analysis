import isNil from 'lodash/isNil'

const constant: any = {
  bugLevel: [
    {
      key: 'P0',
      value: 0,
    },
    {
      key: 'P1',
      value: 1,
    },
    {
      key: 'P2',
      value: 2,
    },
    {
      key: 'P3',
      value: 3,
    },
  ],
  bugState: [
    {
      key: 'global.Unresolved',
      value: 0,
    },
    {
      key: 'global.resolved',
      value: 1,
    },
    {
      key: 'global.activated',
      value: 2,
    },
    {
      key: 'global.notClosed',
      value: 3,
    },
    {
      key: 'global.closed',
      value: 4,
    },
  ],
}

/**
 * 获取key
 * @param  {String}   type     类型
 * @param  {String}   value    值
 */
export const getConstantKey = (type: string, value: number) => {
  if (isNil(type)) return null
  return constant[type].find((o: any) => o.value === value)?.key || ''
}

/**
 * 获取constant枚举
 * @param  {String}   key
 */
export const getConstant = (key: string) => {
  return constant[key] || []
}

export default constant
