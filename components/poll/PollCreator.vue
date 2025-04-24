<template>
  <div class="poll-creator bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4">Crear Nueva Encuesta</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Pregunta:</label>
        <input
          v-model="question"
          placeholder="¿Cuál es tu color favorito?"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div v-for="(option, index) in options" :key="index" class="flex items-center space-x-2">
        <input
          v-model="option.text"
          :placeholder="`Opción ${index + 1}`"
          class="flex-1 p-2 border rounded"
          required
        />
        <button
          v-if="options.length > 2"
          @click="removeOption(index)"
          type="button"
          class="text-red-500"
        >
          ×
        </button>
      </div>
      
      <div class="flex space-x-2">
        <button
          @click="addOption"
          type="button"
          class="px-3 py-1 bg-gray-200 rounded"
        >
          + Añadir Opción
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Crear Encuesta
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const question = ref('');
const options = ref([{ text: '' }, { text: '' }]);

const pollStore = usePollStore();

const addOption = (): void => {
  options.value.push({ text: '' });
};

const removeOption = (index: number): void => {
  options.value.splice(index, 1);
};

const handleSubmit = (): void => {
  try {
    pollStore.createPoll(
      question.value,
      options.value.map(opt => opt.text)
    );
    question.value = '';
    options.value = [{ text: '' }, { text: '' }];
  } catch (error) {
    alert((error as Error).message);
  }
};
</script>