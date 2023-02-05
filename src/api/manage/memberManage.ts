import axios from 'axios'

// eslint-disable-next-line import/prefer-default-export
export function getUserList(data: any) {
  return axios.post('/api/memberManage/list', data)
}
