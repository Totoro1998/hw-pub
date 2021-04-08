<template>
  <a-layout-header class="app_header">
    <div class="logo"></div>
    <header-menu />
    <header-drop-down :avatar-url="userInfo.avatar" />
  </a-layout-header>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import HeaderMenu from './components/HeaderMenu.vue';
  import HeaderDropDown from './components/HeaderDropDown.vue';
  import { IUserInfo } from '@/store/types';
  import { cacheStore } from '@/store/modules/cache';
  export default defineComponent({
    name: 'AppLayoutHeader',
    data() {
      return {
        userInfo: cacheStore.userInfo as IUserInfo,
      };
    },
    components: {
      HeaderMenu,
      HeaderDropDown,
    },
  });
</script>
<style lang="less" scoped></style>
