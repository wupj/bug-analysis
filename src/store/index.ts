import { createPinia } from 'pinia'
import useAppStore from './modules/app'
import useUserStore from './modules/user'
import useTabBarStore from './modules/tab-bar'

import useMemberStore from './modules/manage/memberManage'
import useBugTypeStore from './modules/manage/bugTypeManage'
import useBugStore from './modules/manage/bugManage'

const pinia = createPinia()

export { useAppStore, useUserStore, useTabBarStore, useMemberStore, useBugTypeStore, useBugStore }
export default pinia
