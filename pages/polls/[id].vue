<template>
  <div class="poll-results container mx-auto p-4">
    <div v-if="poll" class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold mb-6">{{ poll.question }}</h1>
      
      <div class="results-grid space-y-4">
        <div v-for="(option, index) in poll.options" :key="index" class="result-item">
          <div class="flex justify-between mb-1">
            <span class="font-medium">{{ option.text }}</span>
            <span>{{ option.votes }} votos ({{ percentage(index) }}%)</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div
              class="bg-blue-500 h-4 rounded-full"
              :style="{ width: percentage(index) + '%' }"
            ></div>
          </div>
        </div>
      </div>
      
      <div class="mt-8 text-center">
        <NuxtLink
          to="/polls"
          class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Volver a las encuestas
        </NuxtLink>
      </div>
    </div>
    
    <div v-else class="text-center py-10">
      <p class="text-xl">Encuesta no encontrada</p>
      <NuxtLink to="/polls" class="text-blue-500 mt-4 inline-block">
        Volver a la lista de encuestas
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import type { Poll } from '~/stores/poll'; 
const route = useRoute();
const pollStore = usePollStore();

const poll = ref<Poll | null>(null);

onMounted(() => {
  const foundPoll = pollStore.polls.find(p => p.id === Number(route.params.id));
  if (foundPoll) {
    poll.value = foundPoll;
  }
});

definePageMeta({
  layout: 'poll' 
});


const totalVotes = computed(() => {
  if (!poll.value) return 0;
  return poll.value.options.reduce((sum, opt) => sum + opt.votes, 0);
});

const percentage = (index: number) => {
  if (!poll.value || totalVotes.value === 0) return 0;
  return Math.round((poll.value.options[index].votes / totalVotes.value) * 100);
};
</script>

<style scoped>
.results-grid {
  max-width: 600px;
  margin: 0 auto;
}
</style>