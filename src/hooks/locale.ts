import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { Message } from '@arco-design/web-vue'

export default function useLocale() {
  const i18 = useI18n()
  const router = useRouter()
  const currentLocale = computed(() => {
    return i18.locale.value
  })
  const changeLocale = (value: string) => {
    i18.locale.value = value
    const { meta } = router.currentRoute.value
    if (meta?.locale) {
      useTitle(`${i18.t(meta.locale)} - Bug Analysis`)
    }
    localStorage.setItem('arco-locale', value)
    Message.success(i18.t('navbar.action.locale'))
  }
  return {
    currentLocale,
    changeLocale,
  }
}
