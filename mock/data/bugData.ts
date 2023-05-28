import Mock from 'mockjs'
import dayjs from 'dayjs'

const nowTime = dayjs().valueOf()
const withMonthTime = dayjs().subtract(1, 'months').valueOf()

const result = Mock.mock({
  'data|0-100': [
    {
      'id': /\d{1,6}/,
      'name': '@ctitle',
      'createTime': Mock.Random.integer(withMonthTime, nowTime),
      'assignor': null,
      'cPerson': null,
      'level|0-3': 1,
      'state|0-4': '1',
      'content': '@cparagraph(30)',
    },
  ],
})

export default result.data
