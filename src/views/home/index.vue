<template>
  <div class="container">
    <SvgIcon iconName="home" className="home" :style="{ flex: 1 }" />
  </div>
</template>

<script lang="tsx" setup></script>

<script lang="tsx">
  export default {
    name: 'Home',
  }
</script>

<style lang="less" scoped>
  .svg-icon {
    width: auto;
    height: auto;
  }
</style>
