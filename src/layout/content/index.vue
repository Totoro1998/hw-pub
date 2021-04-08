<template>
  <a-layout-content class="app_content">
    <router-view v-slot="{ Component }">
      <transition
        :enter-active-class="`animate__animated animate__slideInLeft page-toggle-enter-active`"
        :leave-active-class="`animate__animated animate__slideOutRight page-toggle-leave-active`"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </a-layout-content>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'AppLayoutContent',
  });
</script>
<style lang="less" scoped>
  .page-toggle-enter-active {
    animation-duration: 0.25s !important;
  }
  .page-toggle-leave-active {
    animation-duration: 0.25s !important;
  }
</style>
