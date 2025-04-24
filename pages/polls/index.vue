<template>
  <div class="space-y-8">
    <PollCreator />
    
    <div v-if="pollStore.polls.length" class="space-y-6">
      <h2 class="text-2xl font-bold">Encuestas Disponibles</h2>
      
      <div v-for="poll in pollStore.polls" :key="poll.id" class="poll-card bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-2">{{ poll.question }}</h3>
        
        <div class="space-y-2 mb-3">
          <div v-for="(option, index) in poll.options" :key="index" class="flex items-center">
            <input
              type="radio"
              :name="`poll-${poll.id}`"
              :id="`option-${poll.id}-${index}`"
              @change="() => handleVote(poll.id, index)"
              class="mr-2"
            />
            <label :for="`option-${poll.id}-${index}`">{{ option.text }}</label>
          </div>
        </div>
        
        <NuxtLink
          :to="`/polls/${poll.id}`"
          class="text-blue-500 text-sm"
        >
          Ver resultados →
        </NuxtLink>
      </div>
    </div>
    
    <div v-else class="text-gray-500">
      No hay encuestas disponibles. Crea una nueva arriba.
    </div>
  </div>
</template>

<script lang="ts" setup>
const pollStore = usePollStore();

const handleVote = (pollId: number, optionIndex: number): void => {
  pollStore.vote(pollId, optionIndex);
  alert('¡Voto registrado!');
};
</script>