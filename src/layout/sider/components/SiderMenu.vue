<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    @click="handleMenuClick"
    v-model:openKeys="openKeys"
    mode="inline"
    theme="dark"
  >
    <sider-menu-item v-for="menu in menus" :key="menu.path" :item="menu" :base-path="menu.path" />
  </a-menu>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';
  import SiderMenuItem from './SiderMenuItem.vue';
  import { formatMenuPath } from '@/router/menu';
  import { urlToList } from '@/utils/page';
  import { MenuItem } from '@/types/config';
  import dropRight from 'lodash/dropRight';
  export default defineComponent({
    name: 'SiderMenu',
    components: {
      SiderMenuItem,
    },
    props: {
      menuItem: Object as PropType<MenuItem>,
    },
    data() {
      return {
        selectedKeys: urlToList(this.$route.path),
        openKeys: dropRight(urlToList(this.$route.path)),
      };
    },
    watch: {
      '$route.path': {
        handler(val) {
          this.selectedKeys = urlToList(val);
          this.openKeys = dropRight(urlToList(val));
        },
        deep: true, //true 深度监听
      },
    },
    computed: {
      menus(): MenuItem[] {
        return this.menuItem ? formatMenuPath([this.menuItem])[0].children! : [];
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
