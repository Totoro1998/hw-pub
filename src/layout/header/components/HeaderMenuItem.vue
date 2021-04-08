<template>
  <a-menu-item v-if="!item.children || item.showSide" :key="item.path">
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
    <a-menu-item-group v-for="child in item.children" :key="child.path" :title="child.title">
      <a-menu-item v-for="grandson in getGrandson(child)" :key="grandson.path">
        <span>{{ grandson.title }}</span>
      </a-menu-item>
    </a-menu-item-group>
  </a-sub-menu>
</template>
<script lang="ts">
  import { MenuItem } from '@/types/config';
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'HeaderMenuItem',
    props: {
      item: {
        required: true,
        type: Object,
      },
    },
    methods: {
      getGrandson(val: MenuItem) {
        return val.children ? val.children : [val];
      },
    },
  });
</script>
<style lang="less" scoped></style>
