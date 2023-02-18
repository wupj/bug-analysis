import { Message } from '@arco-design/web-vue'

import { MessageConfig } from '@arco-design/web-vue/es/message/interface.d'

const info = (config: string | MessageConfig) => {
  Message.clear()
  Message.info(config)
}

const success = (config: string | MessageConfig) => {
  Message.clear()
  Message.success(config)
}

const warning = (config: string | MessageConfig) => {
  Message.clear()
  Message.warning(config)
}

const error = (config: string | MessageConfig) => {
  Message.clear()
  Message.error(config)
}

const loading = (config: string | MessageConfig) => {
  Message.clear()
  Message.loading(config)
}

export default {
  info,
  success,
  warning,
  error,
  loading,
}
