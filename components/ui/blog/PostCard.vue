<script lang="ts" setup>
import type { ContentCollectionItem } from '@nuxt/content';


defineProps({
  post: {
    type: Object as PropType<ContentCollectionItem | null>,
    default: null
  }
})


</script>

<template>
  <article class="card post-card">
    <nuxt-link :to="post?.path" class="post-card__link" :aria-label="`Ir al post: ${post?.title}`">
    </nuxt-link>
    <div class="card-content">  
      <div class="content">
        <header>
          <time :datetime="post?.meta.date">
            <span class="is-size-7">{{dateDDMMYYYY((post?.meta.date))}}</span>
          </time>
          <br>
          <a v-for="cat in post?.meta.categories" :key="cat" class="post-card__category" :class="[{'mr-2': true}]" href="#">{{ `#${cat}` }}</a>
          <h3 class="is-size-4 mt-1 mb-2">{{ post?.title }}</h3>
        </header>
        <!-- <p class="mt-1 mb-2 ellipsis">{{ post?.description }}</p> -->
      </div>
    </div>
  </article>
</template>

<style lang="scss">
.post-card{
  display: block;
  position: relative;
  transition: transform 0.3s ease-out;

  &__link{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &:hover{
    transform: translateY(-3px);
  }

  &__category{
    font-size: .85rem;
  }

  .ellipsis {
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>