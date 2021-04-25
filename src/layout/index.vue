<template>
  <a-config-provider :locale="zhCN">
    <a-layout class="app_wrapper">
      <app-layout-header />
      <a-layout>
        <app-layout-sider />
        <app-layout-content />
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import AppLayoutHeader from './header/index.vue';
  import AppLayoutSider from './sider/index.vue';
  import AppLayoutContent from './content/index.vue';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  export default defineComponent({
    name: 'AppLayout',
    data() {
      return {
        zhCN: zhCN,
      };
    },
    components: {
      AppLayoutHeader,
      AppLayoutSider,
      AppLayoutContent,
    },
  });
</script>
<style lang="less" scoped></style>
