<template>
  <a-layout-sider class="app_sider" v-if="menuItem.children">
    <sider-menu :menu-item="menuItem" />
  </a-layout-sider>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { onBeforeRouteUpdate } from 'vue-router';
  import SiderMenu from './components/SiderMenu.vue';
  import { getFlatMenus } from '@/router/menu';
  import { MenuItem } from '@/types/config';
  export default defineComponent({
    name: 'AppLayoutSider',
    components: {
      SiderMenu,
    },
    setup() {
      const initMenuItem: MenuItem = {
        path: '',
        title: '',
        icon: '',
      };
      const menuItem = ref<MenuItem>(initMenuItem);
      onBeforeRouteUpdate((to) => {
        if (to.path !== '/index' && to.path !== '/') {
          menuItem.value = getFlatMenus().filter((item) => {
            return item.path === to.path;
          })[0];
        }
      });
      return {
        menuItem,
      };
    },
  });
</script>
<style lang="less" scoped></style>
