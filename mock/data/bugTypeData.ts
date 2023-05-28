import Mock from 'mockjs'
import dayjs from 'dayjs'

const nowTime = dayjs().valueOf()
const withYearTime = dayjs().subtract(1, 'year').valueOf()

const result = Mock.mock({
  data: [
    {
      id: /\d{1,6}/,
      name: '新需求Bug',
      createTime: Mock.Random.integer(withYearTime, nowTime),
      children: [
        {
          id: /\d{1,6}/,
          name: '新功能Bug',
          createTime: Mock.Random.integer(withYearTime, nowTime),
        },
        {
          id: /\d{1,6}/,
          name: '自测不充分',
          createTime: Mock.Random.integer(withYearTime, nowTime),
        },
        {
          id: /\d{1,6}/,
          name: '需求缺陷',
          createTime: Mock.Random.integer(withYearTime, nowTime),
        },
        {
          id: /\d{1,6}/,
          name: '兼容性Bug',
          createTime: Mock.Random.integer(withYearTime, nowTime),
        },
      ],
    },
    {
      id: /\d{1,6}/,
      name: '历史Bug',
      createTime: Mock.Random.integer(withYearTime, nowTime),
      children: [
        {
          id: /\d{1,6}/,
          name: '历史功能Bug',
          createTime: Mock.Random.integer(withYearTime, nowTime),
        },
        {
          id: /\d{1,6}/,
          name: '遗留Bug',
          createTime: Mock.Random.integer(withYearTime, nowTime),
        },
      ],
    },
    {
      id: /\d{1,6}/,
      name: '优化Bug',
      createTime: Mock.Random.integer(withYearTime, nowTime),
      children: [
        {
          id: /\d{1,6}/,
          name: '功能优化',
          createTime: Mock.Random.integer(withYearTime, nowTime),
        },
        {
          id: /\d{1,6}/,
          name: '样式优化',
          createTime: Mock.Random.integer(withYearTime, nowTime),
        },
      ],
    },
    {
      id: /\d{1,6}/,
      name: '设计如此',
      createTime: Mock.Random.integer(withYearTime, nowTime),
    },
    {
      id: /\d{1,6}/,
      name: '外部原因',
      createTime: Mock.Random.integer(withYearTime, nowTime),
    },
  ],
})

export default result.data
