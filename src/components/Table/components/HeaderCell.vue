<template>
  <span>{{ getTitle }}</span>
</template>
<script lang="ts">
  import type { PropType } from 'vue';
  import type { BasicColumn } from '../types/table';

  import { defineComponent, computed } from 'vue';
  export default defineComponent({
    name: 'TableHeaderCell',
    props: {
      column: {
        type: Object as PropType<BasicColumn>,
        default: {},
      },
    },
    setup(props) {
      const getTitle = computed(() => props.column?.customTitle);

      return { getTitle };
    },
  });
</script>
<style lang="less"></style>
