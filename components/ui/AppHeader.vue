<script lang="ts" setup>
const header :Ref<HTMLElement | null> = ref(null)
const routes = [
  {
    name: 'Inicio',
    route: '/'
  },
  {
    name: 'Acerca de Mi Blog',
    route: '/acerca-de-miblog'
  }
]

onMounted(() => {
  if(header.value){
    const headerHeight = getFullHeight(header.value)
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`)
  }
  
})
</script>

<template>
  <header ref="header" class="app-header p-3">
    <nav class="container" aria-label="Menú principal">
      <h1>
        <NuxtLink to="/">
          <NuxtImg class="app-header__logo" src="/images/miblog-logo.png" width="45" alt="Logo miblog.dev"/>
        </NuxtLink>
      </h1>
      <ul class="is-flex" role="menubar">
        <li v-for="(route, index) in routes" :key="index" :class="{'mr-4' : (index + 1) !== routes.length}" role="none">
          <NuxtLink :to="route.route" class="app-header__link has-text-dark" role="menuitem">{{ route.name }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
.app-header{
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--bulma-primary-100);
  box-shadow: var(--bulma-shadow);

  nav{
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
  }

  &__logo{
    vertical-align: middle;
  }

  &__link{
    &:hover, &:focus{
      text-decoration: underline;
    }
  }

  a.router-link-exact-active{
    text-decoration: underline;
  }
}
</style>