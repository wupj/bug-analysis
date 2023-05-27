import axios from 'axios'

export function getUserList(data: unknown) {
  return axios.post('/api/memberManage/list', data)
}
export function addUser(data: unknown) {
  return axios.post('/api/memberManage/add', data)
}
export function editUser(data: unknown) {
  return axios.post('/api/memberManage/edit', data)
}
export function DeleteUser(data: unknown) {
  return axios.post('/api/memberManage/deleteById', data)
}
export function getDepartment(data: unknown) {
  return axios.post('/api/memberManage/department', data)
}
export function getPosition(data: unknown) {
  return axios.post('/api/memberManage/position', data)
}
