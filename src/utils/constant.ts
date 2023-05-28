import isNil from 'lodash/isNil'

const constant = {
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
export const getConstantKey = (type, value) => {
  if (isNil(type)) return null
  return constant[type].find((o) => o.value === value)?.key || ''
}

export default constant
