<script lang="ts" setup>
import type { ContentCollectionItem } from '@nuxt/content';
import type { PropType } from 'vue';

defineProps({
  posts: {
    type: Array as PropType<ContentCollectionItem[] | null>,
    default: (() => [])
  }
})
</script>

<template>
  <div v-if="posts?.length" class="post-list">
    <UiBlogPostCard
    v-for="post in posts"
    :key="post.id"
    :post="post"
    />
  </div>
</template>
<style lang="scss">
.post-list{
  .post-card{
    margin-bottom: 1rem;

    // &:last-child{
    //   margin-bottom: 0;
    // }
  }
}
</style>