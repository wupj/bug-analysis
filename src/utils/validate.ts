import i18n from '@/locale'

export const validateChinese = (value: undefined | any, callback: (error?: string) => void) => {
  const reg = /[^\u4e00-\u9fa5]/
  if (!reg.test(value.trim())) {
    callback()
  } else {
    callback(i18n.global.t('validate.incorrectFormat'))
  }
}

export const validateChineseOrLetter = (
  value: undefined | any,
  callback: (error?: string) => void
) => {
  const reg = /[^\u4e00-\u9fa5_a-zA-Z0-9.]/
  if (!reg.test(value.trim())) {
    callback()
  } else {
    callback(i18n.global.t('validate.incorrectFormat'))
  }
}
