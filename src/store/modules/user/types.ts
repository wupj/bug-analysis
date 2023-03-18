export type RoleType = '' | '*' | 'develop' | 'user'
export interface UserState {
  name?: string
  location?: string
  locationName?: string
  email?: string
  phone?: string
  role: RoleType
}
