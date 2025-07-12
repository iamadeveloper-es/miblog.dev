<script setup lang="ts">
const route = useRoute()

const { data: doc } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

useSeoMeta({
  title: doc.value?.title,
  description: doc.value?.description
})
</script>

<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-desktop is-6">
        <UiBlogPostDetail :post="doc"/>
      </div>
    </div>
  </section>
</template>