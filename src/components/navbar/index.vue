<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <SvgIcon iconName="logo" className="logo" :style="{ width: '32px', height: '32px' }" />
        <a-typography-title :style="{ margin: 0, fontSize: '18px' }" :heading="5">
          Bug Analysis
        </a-typography-title>
        <icon-menu-fold
          v-if="appStore.device === 'mobile'"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </a-space>
    </div>
    <ul class="right-side">
      <li>
        <a-tooltip :content="$t('navbar.language')">
          <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setDropDownVisible">
            <template #icon>
              <icon-language />
            </template>
          </a-button>
        </a-tooltip>
        <a-dropdown trigger="click" @select="changeLocale">
          <div ref="triggerBtn" class="trigger-btn"></div>
          <template #content>
            <a-doption v-for="item in locales" :key="item.value" :value="item.value">
              {{ item.label }}
            </a-doption>
          </template>
        </a-dropdown>
      </li>
      <li>
        <a-tooltip
          :content="theme === 'light' ? $t('navbar.theme.toDark') : $t('navbar.theme.toLight')"
        >
          <a-button class="nav-btn" type="outline" :shape="'circle'" @click="toggleTheme">
            <template #icon>
              <icon-moon-fill v-if="theme === 'dark'" />
              <icon-sun-fill v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown trigger="click">
          <a-avatar :size="32" :style="{ marginRight: '8px', cursor: 'pointer' }">
            <SvgIcon
              iconName="navbar-user"
              className="navbar-user"
              :style="{ width: '32px', height: '32px' }"
            />
          </a-avatar>
          <template #content>
            <a-doption>
              <a-space @click="switchRoles">
                <icon-tag />
                <span>
                  {{ $t('navbar.switchRoles') }}
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>
                  {{ $t('navbar.logout') }}
                </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, inject } from 'vue'
  import { Message } from '@arco-design/web-vue'
  import { useI18n } from 'vue-i18n'
  import { useDark, useToggle } from '@vueuse/core'
  import { useAppStore, useUserStore } from '@/store'
  import { LOCALE_OPTIONS } from '@/locale'
  import useLocale from '@/hooks/locale'
  // import useUser from '@/hooks/user'
  import { useRouter } from 'vue-router'

  const appStore = useAppStore()
  const userStore = useUserStore()
  const router = useRouter()
  const { t } = useI18n()
  // const { logout } = useUser()
  const { changeLocale } = useLocale()
  const locales = [...LOCALE_OPTIONS]

  const theme = computed(() => {
    return appStore.theme
  })
  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
    onChanged(dark: boolean) {
      // overridded default behavior
      appStore.toggleTheme(dark)
    },
  })
  const toggleTheme = useToggle(isDark)
  const triggerBtn = ref()

  const handleLogout = () => {
    localStorage.clear()
    Message.success(t('navbar.logoutSucceed'))
    router.push({
      name: 'login',
    })
    // logout()
  }
  const setDropDownVisible = () => {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    triggerBtn.value.dispatchEvent(event)
  }
  const switchRoles = async () => {
    const res = await userStore.switchRoles()
    Message.success(res as string)
  }
  const toggleDrawerMenu = inject('toggleDrawerMenu')
</script>

<style scoped lang="less">
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
  }

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .right-side {
    display: flex;
    padding-right: 20px;
    list-style: none;

    :deep(.locale-select) {
      border-radius: 20px;
    }

    li {
      display: flex;
      align-items: center;
      padding: 0 10px;
    }

    a {
      color: var(--color-text-1);
      text-decoration: none;
    }

    .nav-btn {
      color: rgb(var(--gray-8));
      font-size: 16px;
      border-color: rgb(var(--gray-2));
    }

    .trigger-btn,
    .ref-btn {
      position: absolute;
      bottom: 14px;
    }

    .trigger-btn {
      margin-left: 14px;
    }
  }
</style>
