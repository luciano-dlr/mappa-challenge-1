
<template>
  <div class="space-y-8">
    <div class="form-creator bg-white p-6 rounded-lg shadow-md">
  <div class="mb-6">
    <h2 class="text-xl font-bold mb-2">Título del formulario</h2>
    <input
      v-model="formTitle"
      placeholder="Ej: Encuesta de satisfacción"
      class="w-full p-2 border rounded-lg text-lg"
    />
  </div>
  
  <div class="questions-list space-y-6">
    <QuestionEditor
      v-for="(q, index) in questions"
      :key="q.id"
      v-model="questions[index]"
      @remove="removeQuestion(index)"
      class="p-4 border rounded-xl bg-gray-50"
    />
  </div>
  
  <div class="flex flex-wrap gap-2 mt-6">
    <button
      @click="addQuestion"
      type="button"
      class="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
    >
      + Nueva Pregunta
    </button>
    
    <button
      @click="createForm"
      :class="{ 'opacity-50 pointer-events-none': !canSubmit }"
      class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
import { useFormStore } from '~/stores/form';
import type { Form, FormQuestion } from '~/stores/form';
const formStore = useFormStore();
const formTitle = ref('');
const questions = ref<FormQuestion[]>([]);


const addQuestion = (): void => {
  questions.value.push({
    id: Math.floor(Math.random() * 1000000), // ID único por pregunta
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
         questions.value.every(q => {
           const hasText = q.text.trim().length > 0;
           const validOptions = q.type !== 'radio' || 
             (q.options && q.options.length >= 2 && 
              q.options.every(opt => opt.trim().length > 0));
           return hasText && validOptions;
         });
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