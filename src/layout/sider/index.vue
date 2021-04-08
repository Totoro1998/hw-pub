<template>
  <a-layout-sider class="app_sider beauty-scroll" v-if="showSider">
    <sider-menu :menu-item="menuItem" />
  </a-layout-sider>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import SiderMenu from './components/SiderMenu.vue';
  import { menus } from '@/router/menu';
  import { MenuItem } from '@/types/config';
  export default defineComponent({
    name: 'AppLayoutSider',
    components: {
      SiderMenu,
    },
    setup() {
      const { path } = useRoute();
      const initMenuItem: MenuItem = {
        path: '',
        title: '',
        icon: '',
      };
      const showSider = ref(true);
      const menuItem = ref<MenuItem>(initMenuItem);
      const initSide = (path: string) => {
        const urls = path.split('/');
        if (urls.length > 1) {
          const matchedMenuItem = menus.filter((item) => {
            return item.path === urls[1];
          })[0];
          if (matchedMenuItem && matchedMenuItem.children) {
            menuItem.value = matchedMenuItem;
            showSider.value = true;
          } else {
            showSider.value = false;
          }
        } else {
          showSider.value = false;
        }
      };
      initSide(path);
      return {
        showSider,
        menuItem,
        initSide,
      };
    },
    watch: {
      '$route.path': {
        handler(val) {
          this.initSide(val);
        },
        deep: true, //true 深度监听
      },
    },
  });
</script>
<style lang="less" scoped></style>
