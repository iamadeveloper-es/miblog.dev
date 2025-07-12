<script setup lang="ts">
const route = useRoute()

useSeoMeta({
  title: 'Mi Blog',
  description: 'Blog personal de programación'
})

const { data } = await useAsyncData(route.path, () => {
  return queryCollection('content')
  // .order('date', 'DESC')
  // .select('title', 'path', 'description')
  .all()
})

</script>

<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-desktop is-6">
        <UiBlogPostList :posts="data"/>
      </div>
    </div>
  </section>
</template>

<style>

</style>