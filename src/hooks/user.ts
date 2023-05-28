import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Message } from '@arco-design/web-vue'

import { useUserStore } from '@/store'

export default function useUser() {
  const router = useRouter()
  const { t } = useI18n()
  const userStore = useUserStore()
  const logout = async (logoutTo?: string) => {
    await userStore.logout()
    const currentRoute = router.currentRoute.value
    Message.success(t('navbar.logoutSucceed'))
    router.push({
      name: logoutTo && typeof logoutTo === 'string' ? logoutTo : 'login',
      query: {
        ...router.currentRoute.value.query,
        redirect: currentRoute.name as string,
      },
    })
  }
  return {
    logout,
  }
}
