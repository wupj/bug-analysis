const locales = import.meta.globEager('./en-US/*.ts')

let messages = {}

Object.keys(locales).forEach((key: string) => {
  const locale = locales[key].default
  messages = { ...messages, ...locale }
})

export default {
  'menu.home': 'Home',
  'menu.manage': 'Manage',
  'menu.manage.memberManage': 'Member Manage',
  'menu.manage.bugTypeManage': 'Bug Type Manage',
  'menu.manage.bugManage': 'Bug Manage',
  ...messages,
}
