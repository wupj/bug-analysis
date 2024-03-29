import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import Particles from 'particles.vue3'
import globalComponents from '@/components'
import router from './router'
import store from './store'
import i18n from './locale'
import directive from './directive'
import '../mock'
import App from './App.vue'
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register'

import '@/style/index.less'
import '@arco-design/web-vue/dist/arco.css'
import '@/utils/request'

const app = createApp(App)

app.use(ArcoVue, {})
app.use(ArcoVueIcon)
app.use(Particles)
window.onload = () => {
  console.log('onload')
}
app.use(router)
app.use(store)
app.use(i18n)
app.use(globalComponents)
app.use(directive)

app.mount('#app')

app.config.warnHandler = () => {}
