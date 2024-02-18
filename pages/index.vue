<script>
import { useStore } from '~/store'

export default {
  data() {
    return {
      characters: [
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
      ],

      store: useStore()
    }
  },

  mounted() {
    this.store.$patch({
      innerPage: false
    })
  }
}

// const AsyncWrapper = defineComponent({
//   name: 'AsyncWrapper',
//   async setup(_, ctx) {
//     const list = await listMedia(type.value, queries.value[0].query, 1)
//     const item = await getMedia(type.value, list.results[0].id)
//     return () => ctx.slots?.default?.({ item })
//   },
// })
</script>

<template>
  <div>
    <!-- <AsyncWrapper v-slot="{ item }"> -->
    <!-- <NuxtLink :to="`/${type}/${item.id}`"> -->
    <MediaHero :item="characters[0].data[0]" />
    <!-- </NuxtLink> -->
    <!-- </AsyncWrapper> -->

    <!-- {{ characters }} -->

    <CarouselAutoQuery v-for="character of characters" :key="character.title" :query="character" />
    <!-- <TheFooter /> -->
  </div>
</template>
