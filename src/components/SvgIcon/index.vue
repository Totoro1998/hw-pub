<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconType" />
  </svg>
</template>

<script>
  export default {
    name: 'SvgIcon',
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
    computed: {
      iconType() {
        return `#icon-${this.iconName}`;
      },
      svgClass() {
        if (this.className) {
          return 'svg-icon ' + this.className;
        } else {
          return 'svg-icon';
        }
      },
    },
  };
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
