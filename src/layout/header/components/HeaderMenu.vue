<template>
  <a-menu theme="light" mode="horizontal" :selectedKeys="selectedKeys" @click="handleMenuClick">
    <header-menu-item v-for="menu in menus" :key="menu.path" :item="menu" :base-path="menu.path" />
  </a-menu>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import HeaderMenuItem from './HeaderMenuItem.vue';
  import { menus, formatMenuPath } from '@/router/menu';
  export default defineComponent({
    name: 'HeaderMenu',
    components: {
      HeaderMenuItem,
    },
    data() {
      return {
        menus: formatMenuPath(menus),
        selectedKeys: [],
      };
    },
    methods: {
      handleMenuClick({ key }: { key: string }) {
        this.$router.push({ path: key });
      },
    },
  });
</script>
<style lang="less" scoped>
  .header_menu {
    background-color: #181530;
    color: white;
    font-weight: 500;
  }
</style>
