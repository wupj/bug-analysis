<template>
  <div class="not-found-content">
    <a-result class="result" :subtitle="'Not Found'">
      <template #icon>
        <SvgIcon
          iconName="not-found"
          className="not-found"
          :style="{ width: '228px', height: '200px' }"
        />
      </template>
    </a-result>
    <div class="operation-row">
      <a-button key="back" type="primary" @click="back"> {{ $t('global.back') }} </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const back = () => {
    // warning： Go to the node that has the permission
    router.go(-1)
  }
</script>

<style scoped lang="less">
  .not-found-content {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);

    :deep(.arco-result-icon-tip) {
      width: 288px;
      height: 200px;
    }

    :deep(.arco-result-subtitle) {
      font-size: @font-size-eighteen;
    }
  }
</style>
