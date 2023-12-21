<script setup >
// import type { QueryItem } from '~/types'

const props = defineProps({
  query: Object
})

console.log(props.query.title)
// const item = await listMedia(props.query.type, props.query.query, 1)
</script>

<template>
  <CarouselBase>
    <template #title>
      {{ props.query.title }}
    </template>
    <template #more>
      <NuxtLink :to="`/`" n-link>
        {{ $t('Explore more') }}
      </NuxtLink>
    </template>
    <MediaCard
      v-for="i of props.query.data || []"
      :key="i.name"
      :item="i"
      :type="props.query.type"
      flex-1 w-40 md:w-60
    />
  </CarouselBase>
</template>
