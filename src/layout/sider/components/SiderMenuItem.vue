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
    <sider-menu-item
      v-for="child in item.children"
      :key="child.path"
      :item="child"
      :base-path="child.path"
    />
  </a-sub-menu>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'SiderMenuItem',
    props: {
      item: {
        required: true,
        type: Object,
      },
    },
  });
</script>
<style lang="less" scoped></style>
