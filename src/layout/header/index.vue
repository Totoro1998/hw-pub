<template>
  <a-layout-header class="app_header">
    <div class="logo"></div>
    <header-menu />
    <a-avator />
  </a-layout-header>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import HeaderMenu from './components/HeaderMenu.vue';
  export default defineComponent({
    name: 'AppLayoutHeader',
    components: {
      HeaderMenu,
    },
  });
</script>
<style lang="less" scoped></style>
