
<template>
  <div class="space-y-8">
    <div class="form-creator bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-4">Crear Nuevo Formulario</h2>
      
      <div class="space-y-2 mb-4">
        <label class="block text-sm font-medium">Título del formulario:</label>
        <input
          v-model="formTitle"
          placeholder="Ej: Encuesta de satisfacción"
          class="w-full p-2 border rounded"
        />
      </div>
      
      <div class="questions-list space-y-4">
        <QuestionEditor
          v-for="(q, index) in questions"
          :key="q.id"
          v-model="questions[index]"
          @remove="removeQuestion(index)"
        />
      </div>
      
      <div class="flex space-x-2 mt-4">
        <button
          @click="addQuestion"
          type="button"
          class="px-3 py-1 bg-gray-200 rounded"
        >
          + Añadir Pregunta
        </button>
        
        <button
          @click="createForm"
          type="button"
          class="px-4 py-2 bg-green-500 text-white rounded"
          :disabled="!canSubmit"
        >
          Guardar Formulario
        </button>
      </div>
    </div>
    
    <div v-if="formStore.forms.length" class="existing-forms">
      <h2 class="text-2xl font-bold mb-4">Formularios Existentes</h2>
      
      <div class="grid gap-4">
        <div
          v-for="form in formStore.forms"
          :key="form.id"
          class="form-card bg-white p-4 rounded shadow"
        >
          <h3 class="font-semibold">{{ form.title }}</h3>
          <p class="text-sm text-gray-500">{{ form.questions.length }} preguntas</p>
          <NuxtLink
            :to="`/forms/${form.id}`"
            class="text-blue-500 text-sm"
          >
            Ver/Responder →
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { Form } from '~/stores/form'; // Añade esta línea
const formStore = useFormStore();
const formTitle = ref('');
const questions = ref<Array<{
  id: number;
  text: string;
  type: 'short' | 'long' | 'number' | 'radio';
  required: boolean;
  placeholder?: string;
  options?: string[];
}>>([]);

const addQuestion = (): void => {
  questions.value.push({
    id: Date.now(),
    text: '',
    type: 'short',
    required: false,
  });
};

const removeQuestion = (index: number): void => {
  questions.value.splice(index, 1);
};

const canSubmit = computed(() => {
  return formTitle.value.trim() && 
         questions.value.length > 0 &&
         questions.value.every(q => q.text.trim() && 
          (q.type !== 'radio' || (q.options && q.options.length >= 2)));
});

const createForm = (): void => {
  try {
    const validQuestions = questions.value.map(q => ({
      ...q,
      options: q.type === 'radio' ? q.options : undefined,
       id: Date.now()
    }));
    
    formStore.createForm(formTitle.value, validQuestions);
    formTitle.value = '';
    questions.value = [];
    alert('Formulario creado con éxito!');
  } catch (error) {
    alert((error as Error).message);
  }
};
</script>