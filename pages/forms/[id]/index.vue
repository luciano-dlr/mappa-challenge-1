<template>
  <div class="form-response container mx-auto p-4">
       <div class="mb-4">
      <NuxtLink 
        to="/forms" 
        class="text-blue-500 hover:underline"
      >
        ← Volver a todos los formularios
      </NuxtLink>
    </div>
    <div v-if="form" class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold mb-6">{{ form.title }}</h1>
      
      <form @submit.prevent="submitForm" class="space-y-6">
        <div v-for="(question, qIndex) in form.questions" :key="question.id" class="question-group">
          <label class="block text-lg font-medium mb-2">
            {{ question.text }}
            <span v-if="question.required" class="text-red-500">*</span>
          </label>
          
          <!-- Short Answer -->
          <input
            v-if="question.type === 'short'"
            v-model="answers[qIndex]"
            type="text"
            :placeholder="question.placeholder || 'Escribe tu respuesta'"
            class="w-full p-2 border rounded"
            :required="question.required"
          />
          
          <!-- Long Answer -->
          <textarea
            v-else-if="question.type === 'long'"
            v-model="answers[qIndex]"
            :placeholder="question.placeholder || 'Escribe tu respuesta'"
            class="w-full p-2 border rounded"
            :required="question.required"
            rows="4"
          ></textarea>
          
          <!-- Number -->
          <input
            v-else-if="question.type === 'number'"
            v-model.number="answers[qIndex]"
            type="number"
            :placeholder="question.placeholder || 'Ingresa un número'"
            class="w-full p-2 border rounded"
            :required="question.required"
          />
          
          <!-- Radio Buttons -->
          <div v-else-if="question.type === 'radio'" class="space-y-2">
            <div v-for="(option, oIndex) in question.options" :key="oIndex" class="flex items-center">
              <input
                type="radio"
                :id="`q${qIndex}-option${oIndex}`"
                v-model="answers[qIndex]"
                :value="option"
                :required="question.required"
                class="mr-2"
              />
              <label :for="`q${qIndex}-option${oIndex}`">{{ option }}</label>
            </div>
          </div>

        </div>
        
        <button
          type="submit"
          class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Enviar Respuestas
        </button>
                  <div class="mt-6 flex justify-between">
<NuxtLink 
  :to="`/forms/${form.id}/responses`"
  class="text-blue-500 hover:underline"
>
  Ver todas las respuestas
</NuxtLink>

</div>
      </form>
    </div>
    
    <div v-else class="text-center py-10">
      <p class="text-xl">Formulario no encontrado</p>
      <NuxtLink to="/forms" class="text-blue-500 mt-4 inline-block">
        Volver a la lista de formularios
      </NuxtLink>
    </div>
    
  </div>
</template>

<script lang="ts" setup>

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useFormStore } from '~/stores/form';
import type { Form } from '~/stores/form';
const route = useRoute();
const formStore = useFormStore();

const form = ref<Form | null>(null);
const answers = ref<(string | number)[]>([]);

onMounted(() => {
  const foundForm = formStore.getFormById(Number(route.params.id));
  if (foundForm) {
    form.value = foundForm;
    answers.value = Array(foundForm.questions.length).fill('');
  }
});

const submitForm = () => {
  if (!form.value) return;
  
  try {
    const response: Record<number, string | number> = {};
    form.value.questions.forEach((q, index) => {
      const answer = answers.value[index];
      
      // Validación requerida
      if (q.required && !answer) {
        throw new Error(`La pregunta "${q.text}" es requerida`);
      }
      
      // Validación específica para radio
      if (q.type === 'radio' && q.required && !answer) {
        throw new Error(`Debes seleccionar una opción en: "${q.text}"`);
      }
      
      response[q.id] = answer;
    });
    
    formStore.submitResponse(form.value.id, response);
    alert('¡Respuestas enviadas con éxito!');
    // navigateTo('/forms');
    navigateTo(`/forms/${form.value.id}/responses`);
  } catch (error) {
    alert((error as Error).message);
  }
};
</script>