<script lang="ts" setup>
import type { ContentCollectionItem } from '@nuxt/content';
import type { PropType } from 'vue';

defineProps({
  post: {
    type: Object as PropType<ContentCollectionItem | null>,
    default: null
  }
})
</script>

<template>
  <div class="post-detail">
    <ContentRenderer v-if="post" :value="post" />
    <UiAppError v-else />
  </div>
</template>


<style lang="scss">
.post-detail{
  font-size: 18px;
  h1{
    font-size: 3rem;
    line-height: 60px;
    margin-bottom: 12px;
  }

  h2{
    font-size: 2.5rem;
    margin-bottom: 8px;
  }

  h3{
    font-size: 2rem;
    margin-bottom: 8px;
  }

  h4{
    font-size: 1.5rem;
    margin-bottom: 8px;
  }

  h1, h2, h3, h4{
    font-weight: bold;
  }

  h1 > a, h2 > a, h3 > a, h4 > a, h5 > a {
    all: unset;
    color: inherit;
    text-decoration: none;
    pointer-events: none;
  }

  p{
    font-size: 18px;
    margin-bottom: 18px;
  }

  ul{
    list-style: disc
  }

  ul, ol{
    padding-left: 1rem;
    margin-bottom: 18px;
  }

  pre.shiki{
    margin: 1rem 0;
  }
}
</style>