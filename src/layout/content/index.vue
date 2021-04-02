<template>
  <a-layout-content class="app_content">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </a-layout-content>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'AppLayoutContent',
  });
</script>
<style lang="less" scoped></style>
