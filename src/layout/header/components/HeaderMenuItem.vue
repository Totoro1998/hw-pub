<template>
  <a-menu-item v-if="!item.children" :key="item.path">
    <span>
      {{ item.title }}
    </span>
  </a-menu-item>
  <a-sub-menu v-else>
    <template #title>
      <span class="submenu-title-wrapper">
        {{ item.title }}
      </span>
    </template>
    <a-menu-item v-for="child in item.children" :key="child.path">
      <span>
        {{ child.title }}
      </span>
    </a-menu-item>
  </a-sub-menu>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'HeaderMenuItem',
    props: {
      item: {
        required: true,
        type: Object,
      },
    },
    data() {
      return {
        selectedKeys: '',
      };
    },
  });
</script>
<style lang="less" scoped></style>
