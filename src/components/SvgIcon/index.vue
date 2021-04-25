<template>
  <icon-font :type="iconName" />
</template>

<script>
  import { defineComponent } from 'vue';
  import { createFromIconfontCN } from '@ant-design/icons-vue';
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2385408_4fidjra7bo6.js',
  });
  export default defineComponent({
    name: 'SvgIcon',
    components: { IconFont },
    props: {
      iconName: {
        type: String,
        required: true,
      },
      className: {
        type: String,
        default: '',
      },
    },
  });
</script>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
  }
</style>
