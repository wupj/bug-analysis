import { Message } from '@arco-design/web-vue'

import { MessageConfig } from '@arco-design/web-vue/es/message/interface.d'

const info = (config: MessageConfig) => {
  Message.clear()
  Message.info(config)
}

const success = (config: MessageConfig) => {
  Message.clear()
  Message.success(config)
}

const warning = (config: MessageConfig) => {
  Message.clear()
  Message.warning(config)
}

const error = (config: MessageConfig) => {
  Message.clear()
  Message.error(config)
}

const loading = (config: MessageConfig) => {
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
