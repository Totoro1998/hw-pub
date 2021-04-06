<template>
  <a-menu v-model:selectedKeys="selectedKeys" @click="handleMenuClick">
    <sider-menu-item v-for="menu in menus" :key="menu.path" :item="menu" :base-path="menu.path" />
  </a-menu>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';
  import SiderMenuItem from './SiderMenuItem.vue';
  import { formatMenuPath } from '@/router/menu';
  import { MenuItem } from '@/types/config';
  export default defineComponent({
    name: 'SiderMenu',
    components: {
      SiderMenuItem,
    },
    props: {
      menuItem: {} as PropType<MenuItem>,
    },
    data() {
      return {
        selectedKeys: '',
      };
    },
    computed: {
      menus(): MenuItem[] {
        return this.menuItem ? formatMenuPath([this.menuItem]) : [];
      },
    },
    methods: {
      handleMenuClick({ key }: { key: string }) {
        this.$router.push({ path: key });
      },
    },
  });
</script>
<style lang="less" scoped></style>
