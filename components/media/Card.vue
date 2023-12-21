<script setup>
defineProps({
  item: Object,
  type: String,
})
</script>

<template>
  <NuxtLink
    :to="`/${item.media_type || type}/${item.id}`" pb2
  >
    <div
      block bg-gray4:10 p1
      class="aspect-10/16"
      transition duration-400
      hover="scale-105 z10"
    >
      <video
        v-if="item.image"
        width="400"
        height="600"
        class="object-cover w-full h-full" 
        autoplay muted loop playsinline
        :poster="item.image"
        src="/videos/placeholder.mp4"
        :alt="item.title || item.name"
        :style="{ 'view-transition-name': `item-${item.id}` }"
      />
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
