<template>
  <div>
    <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
      <a-button v-bind="action" :class="'column_button_' + action.color">{{
        action.label
      }}</a-button>
    </template>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed, toRaw } from 'vue';

  import { ActionItem } from '../types/tableAction';
  export default defineComponent({
    name: 'TableAction',
    props: {
      actions: {
        type: Array as PropType<ActionItem[]>,
        default: () => [],
      },
    },
    setup(props) {
      const getActions = computed(() => {
        return (toRaw(props.actions) || []).map((action) => {
          return {
            type: 'link',
            size: 'small',
            ...action,
          };
        });
      });
      return { getActions };
    },
  });
</script>
<style lang="less">
  .column_button_error {
    color: red;
  }
</style>
