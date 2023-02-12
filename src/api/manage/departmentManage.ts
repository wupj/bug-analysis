import axios from 'axios'

// eslint-disable-next-line import/prefer-default-export
export function getDepartmentList(data: unknown) {
  return axios.post('/api/departmentManage/list', data)
}
