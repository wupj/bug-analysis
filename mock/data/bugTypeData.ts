import Mock from 'mockjs'
import dayjs from 'dayjs'

const nowTime = dayjs().valueOf()
const withYearTime = dayjs().subtract(1, 'year').valueOf()

const result = Mock.mock({
  data: [
    {
      id: '@id',
      name: '新需求Bug',
      CreateTime: Mock.Random.integer(withYearTime, nowTime),
      children: [
        {
          id: '@id',
          name: '新功能Bug',
          CreateTime: Mock.Random.integer(withYearTime, nowTime),
        },
        {
          id: '@id',
          name: '自测不充分',
          CreateTime: Mock.Random.integer(withYearTime, nowTime),
        },
        {
          id: '@id',
          name: '需求缺陷',
          CreateTime: Mock.Random.integer(withYearTime, nowTime),
        },
        {
          id: '@id',
          name: '兼容性Bug',
          CreateTime: Mock.Random.integer(withYearTime, nowTime),
        },
      ],
    },
    {
      id: '@id',
      name: '历史Bug',
      CreateTime: Mock.Random.integer(withYearTime, nowTime),
      children: [
        {
          id: '@id',
          name: '历史功能Bug',
          CreateTime: Mock.Random.integer(withYearTime, nowTime),
        },
        {
          id: '@id',
          name: '遗留Bug',
          CreateTime: Mock.Random.integer(withYearTime, nowTime),
        },
      ],
    },
    {
      id: '@id',
      name: '优化Bug',
      CreateTime: Mock.Random.integer(withYearTime, nowTime),
      children: [
        {
          id: '@id',
          name: '功能优化',
          CreateTime: Mock.Random.integer(withYearTime, nowTime),
        },
        {
          id: '@id',
          name: '样式优化',
          CreateTime: Mock.Random.integer(withYearTime, nowTime),
        },
      ],
    },
    {
      id: '@id',
      name: '设计如此',
      CreateTime: Mock.Random.integer(withYearTime, nowTime),
    },
    {
      id: '@id',
      name: '外部原因',
      CreateTime: Mock.Random.integer(withYearTime, nowTime),
    },
  ],
})

export default result.data
