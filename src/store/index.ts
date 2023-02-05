import { createPinia } from 'pinia'
import useAppStore from './modules/app'
import useUserStore from './modules/user'
import useTabBarStore from './modules/tab-bar'

import useMemberStore from './modules/manage/memberManage'

const pinia = createPinia()

export { useAppStore, useUserStore, useTabBarStore, useMemberStore }
export default pinia
