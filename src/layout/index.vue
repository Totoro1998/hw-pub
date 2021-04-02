<template>
  <a-layout>
    <app-layout-header />
    <a-layout>
      <app-layout-sider />
      <app-layout-content />
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import AppLayoutHeader from './header/index.vue';
  import AppLayoutSider from './sider/index.vue';
  import AppLayoutContent from './content/index.vue';
  export default defineComponent({
    name: 'AppLayout',
    components: {
      AppLayoutHeader,
      AppLayoutSider,
      AppLayoutContent,
    },
  });
</script>
<style lang="less" scoped></style>
