<template>
  <div class="avatar">
    <a-dropdown>
      <a-avatar :size="48" :src="avatarUrl" />
      <template #overlay>
        <a-menu @click="menuClick">
          <a-menu-item key="logout">Logout</a-menu-item>
          <a-menu-item key="setting">设置</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { removeCookie } from '@/utils/cookies';
  import { userStore } from '@/store/modules/user';
  import { appStore } from '@/store/modules/app';
  import { isDev } from '@/utils/common';
  export default defineComponent({
    name: 'HeaderDropDown',
    props: {
      avatarUrl: {
        type: String,
        required: true,
        default: '',
      },
    },
    methods: {
      menuClick({ key }: { key: string }) {
        switch (key) {
          case 'logout':
            this.handleLogout();
            break;
          default:
            break;
        }
      },
      handleLogout() {
        removeCookie('session');
        userStore.COMMIT_RESETUSERINFO();
        appStore.ChangeLogin(false);
        let env = '';
        if (isDev) {
          env = `https://dev-gamepub.modooplay.com/cas/cas_logout?next=${window.location.origin.replace(
            'localhost',
            '127.0.0.1'
          )}/login`;
        } else {
          env = `https://gamepub.modooplay.com/cas/cas_logout?next=${window.location.origin.replace(
            'localhost',
            '127.0.0.1'
          )}/login`;
        }
        window.location.href = env;
      },
    },
  });
</script>
<style lang="less" scoped></style>
