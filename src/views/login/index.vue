<template>
  <div class="container">
    <Particles
      id="tsparticles"
      class="login-particles"
      :particles-init="particlesInit"
      :options="options"
    />
    <div class="content">
      <div class="content-inner">
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { merge } from 'lodash'
  import { loadFull } from 'tsparticles'

  import particles from '@/config/particles.json'
  import LoginForm from './loginForm.vue'

  const options = computed(() => {
    const bgColor = getComputedStyle(document.body).getPropertyValue('--color-bg-5').trim()
    return merge(particles, {
      particles: {
        move: {
          trail: {
            fillColor: bgColor,
          },
        },
      },
      background: {
        color: bgColor,
      },
    })
  })

  const particlesInit = async (engine: any) => {
    await loadFull(engine)
  }
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;
    background-color: transparent;

    .login-particles {
      position: absolute;
      z-index: -10;
      width: 100%;
      height: 100%;
    }

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
    }
  }
</style>
