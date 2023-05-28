import axios from 'axios'

export function getBugList(data: unknown) {
  return axios.post('/api/bugManage/list', data)
}
