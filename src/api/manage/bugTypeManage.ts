import axios from 'axios'

export function getBugTypeList(data: unknown) {
  return axios.post('/api/bugTypeManage/list', data)
}
