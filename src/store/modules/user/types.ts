export type RoleType = '' | '*' | 'develop' | 'user'
export interface UserState {
  name?: string
  location?: string
  email?: string
  phone?: string
  role: RoleType
}
