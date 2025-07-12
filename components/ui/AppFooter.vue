<script lang="ts" setup>
const footer :Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  if(footer.value){
    const footerHeight = getFullHeight(footer.value)
    document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`)
  }
  
})
</script>

<template>
  <footer ref="footer" class="app-footer py-4 px-3 has-background-white">
    <div class="container">
      <small>myblog.dev &copy; 2025</small>
    </div>
  </footer>
</template>

<style lang="scss">
.app-footer{
  text-align: center;
}
</style>