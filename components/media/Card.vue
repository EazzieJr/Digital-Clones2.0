<script>

export default {
  props: {
    item: Object,
    type: String,
  },

  methods: {
    hover(e) {
      const video = e.target

      video.play()
    },

    leave(e) {
      const video = e.target

      video.pause()
      video.currentTime = 0
    },
  },
}
</script>

<template>
  <NuxtLink :to="`/clone/${item.name.toLowerCase().split(' ').join('-')}`" pb2>
    <div block bg-gray4:10 p1 class="aspect-10/16" transition duration-400 hover="scale-105 z10">
      <video v-if="item.image" width="400" height="600" class="object-cover w-full h-full" muted loop playsinline
        :poster="item.image" src="/videos/placeholder.mp4" :alt="item.title || item.name"
        :style="{ 'view-transition-name': `item-${item.id}` }" @mouseenter="hover($event)" @mouseout="leave($event)" />
      <div v-else h-full op10 flex>
        <div i-ph:question ma text-4xl />
      </div>
    </div>
    <div mt-2>
      {{ item.title || item.name }}
    </div>
    <!-- <div flex text-sm gap-2 items-center>
      <StarsRate w-20 :value="item.vote_average" />
      <div op60>
        {{ formatVote(item.vote_average) }}
      </div>
    </div> -->
  </NuxtLink>
</template>
