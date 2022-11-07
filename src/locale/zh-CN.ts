const locales = import.meta.globEager('./zh-CN/*.ts')

let messages = {}

Object.keys(locales).forEach((key: string) => {
  const locale = locales[key].default
  messages = { ...messages, ...locale }
})

export default {
  'menu.home': '主页',
  'menu.manage': '管理',
  'menu.manage.memberManage': '人员管理',
  'menu.manage.bugTypeManage': 'Bug类型管理',
  'menu.manage.bugManage': 'Bug管理',
  ...messages,
}
