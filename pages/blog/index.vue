<script setup lang="ts">
const route = useRoute()
const searchValue = ref('')

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

const filteredPosts = computed(() => {
  if (!data.value) return []
  const search = searchValue.value.toLowerCase()

  return data.value.filter(post => {
    const inTitle = post.title.toLowerCase().includes(search)
    const inCategory = post.meta?.categories?.some(cat =>
      cat.toLowerCase().includes(search)
    )
    return inTitle || inCategory
  })
})

</script>

<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-desktop is-6">
        <UiAppSearchBar v-model="searchValue"/>
      </div>
    </div>
    <div v-if="filteredPosts?.length" class="columns is-centered">
      <div class="column is-desktop is-6">
        <UiBlogPostList :posts="filteredPosts"/>
      </div>
    </div>
    <div v-else class="columns is-centered">
      <div class="column is-desktop is-6">
        <p class="is-size-4">👀 Nada por aquí...</p>
      </div>
    </div>
  </section>
</template>

<style>

</style>