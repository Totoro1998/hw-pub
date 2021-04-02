<template>
  <div>
    <a-button @click="handleLogin">登录</a-button>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { isDev } from '@/utils/common';
  export default defineComponent({
    name: 'Login',
    data() {
      return {
        casLink: '',
        redirectLink: '',
      };
    },
    created() {
      const { query } = this.$route;
      this.redirectLink = (query.redirect as string) || '/';
    },
    methods: {
      handleLogin() {
        if (isDev) {
          this.casLink = `https://dev-gamepub.modooplay.com/cas/before?next=${window.location.origin.replace(
            'localhost',
            '127.0.0.1'
          )}${this.redirectLink}`;
        } else {
          this.casLink = `https://gamepub.modooplay.com/cas/before?next=${window.location.origin.replace(
            'localhost',
            '127.0.0.1'
          )}${this.redirectLink}`;
        }
        window.location.href = this.casLink;
      },
    },
  });
</script>
<style lang="less" scoped></style>
