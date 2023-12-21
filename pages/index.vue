<script setup lang="ts">
import type { MediaType } from '~/types'
import { QUERY_LIST } from '~/constants/lists'

const route = useRoute()
const type = computed(() => route.params.type as MediaType || 'movie')

const queries = computed(() => [
  QUERY_LIST.movie[0],
  QUERY_LIST.tv[0],
])


const characters = [
  {
    title: 'Popular Characters',
    data: [
      { name: 'Elon Musk', image: '/placeholder.webp' },
      { name: 'Jeff Bezos', image: '/placeholder.webp' },
      { name: 'Oprah Winfrey', image: '/placeholder.webp' },
      { name: 'Dwayne Johnson', image: '/placeholder.webp' },
      { name: 'Beyoncé', image: '/placeholder.webp' },
      { name: 'Leonardo DiCaprio', image: '/placeholder.webp' },
      { name: 'Taylor Swift', image: '/placeholder.webp' },
      { name: 'Cristiano Ronaldo', image: '/placeholder.webp' },
      { name: 'Serena Williams', image: '/placeholder.webp' },
      { name: 'Kanye West', image: '/placeholder.webp' },
      { name: 'Emma Watson', image: '/placeholder.webp' },
      { name: 'Tom Hanks', image: '/placeholder.webp' },
      { name: 'Ellen DeGeneres', image: '/placeholder.webp' },
      { name: 'David Beckham', image: '/placeholder.webp' },
      { name: 'Rihanna', image: '/placeholder.webp' },
    ]
  },
  {
    title: 'Most rated Characters',
    data: [
      { name: 'Elon Musk', image: '/placeholder.webp' },
      { name: 'Jeff Bezos', image: '/placeholder.webp' },
      { name: 'Oprah Winfrey', image: '/placeholder.webp' },
      { name: 'Dwayne Johnson', image: '/placeholder.webp' },
      { name: 'Beyoncé', image: '/placeholder.webp' },
      { name: 'Leonardo DiCaprio', image: '/placeholder.webp' },
      { name: 'Taylor Swift', image: '/placeholder.webp' },
      { name: 'Cristiano Ronaldo', image: '/placeholder.webp' },
      { name: 'Serena Williams', image: '/placeholder.webp' },
      { name: 'Kanye West', image: '/placeholder.webp' },
      { name: 'Emma Watson', image: '/placeholder.webp' },
      { name: 'Tom Hanks', image: '/placeholder.webp' },
      { name: 'Ellen DeGeneres', image: '/placeholder.webp' },
      { name: 'David Beckham', image: '/placeholder.webp' },
      { name: 'Rihanna', image: '/placeholder.webp' },
    ]
  }
]

const AsyncWrapper = defineComponent({
  name: 'AsyncWrapper',
  async setup(_, ctx) {
    const list = await listMedia(type.value, queries.value[0].query, 1)
    const item = await getMedia(type.value, list.results[0].id)
    return () => ctx.slots?.default?.({ item })
  },
})
</script>

<template>
  <div>
    <AsyncWrapper v-slot="{ item }">
      <NuxtLink :to="`/${type}/${item.id}`">
        <MediaHero :item="item" />
      </NuxtLink>
    </AsyncWrapper>

    <CarouselAutoQuery v-for="character of characters" :key="character.title" :query="character" />
    <!-- <TheFooter /> -->
  </div>
</template>
