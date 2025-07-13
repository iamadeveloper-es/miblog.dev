<script setup lang="ts">
import '@/assets/scss/main.scss'
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
.app-wrapper{
  
  &__main{
    min-height: calc(100dvh - (var(--header-height, 0) + var(--footer-height, 0)));
  }
}
</style>
