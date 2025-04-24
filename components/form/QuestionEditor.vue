<template>
  <div class="question-editor space-y-3 p-4 border rounded-lg mb-4">
    <div class="flex justify-between items-start">
      <div class="flex-1 space-y-2">
        <input
          v-model="question.text"
          placeholder="Texto de la pregunta"
          class="w-full p-2 border rounded"
          required
        />
        
        <select v-model="question.type" class="w-full p-2 border rounded">
          <option value="short">Texto corto</option>
          <option value="long">Texto largo</option>
          <option value="number">Número</option>
          <option value="radio">Opción única</option>
        </select>
      </div>
      
      <button
        @click="$emit('remove')"
        type="button"
        class="ml-2 text-red-500"
      >
        ×
      </button>
    </div>
    
    <div v-if="question.type === 'radio'" class="options-section space-y-2">
      <div
        v-for="(option, index) in question.options"
        :key="index"
        class="flex items-center"
      >
        <input
          v-model="question.options![index]"
          placeholder="Opción"
          class="flex-1 p-2 border rounded mr-2"
          required
        />
        <button
          @click="removeOption(index)"
          type="button"
          class="text-red-500"
        >
          ×
        </button>
      </div>
      <button
        @click="addOption"
        type="button"
        class="text-sm text-blue-500"
      >
        + Añadir opción
      </button>
    </div>
    
    <div class="flex items-center justify-between">
      <label class="flex items-center space-x-2">
        <input
          type="checkbox"
          v-model="question.required"
          class="mr-2"
        />
        <span>Requerido</span>
      </label>
      
      <input
        v-model="question.placeholder"
        placeholder="Texto de ayuda"
        class="p-2 border rounded text-sm"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

export interface Question {
  id: number;
  text: string;
  type: 'short' | 'long' | 'number' | 'radio';
  required: boolean;
  placeholder?: string;
  options?: string[];
}

const props = defineProps<{
  modelValue: Question;
}>();

const emit = defineEmits(['update:modelValue', 'remove']);

const question = ref<Question>({ ...props.modelValue });

watch(question, (newVal) => {
  if (newVal.type === 'radio' && !newVal.options) {
    newVal.options = [''];
  }
  emit('update:modelValue', newVal);
}, { deep: true });

const addOption = (): void => {
  if (!question.value.options) {
    question.value.options = [''];
  } else {
    question.value.options.push('');
  }
};

const removeOption = (index: number): void => {
  if (question.value.options?.length === 1) return;
  question.value.options?.splice(index, 1);
};
</script>