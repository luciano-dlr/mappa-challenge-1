<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Respuestas de: {{ form?.title }}</h1>
    
    <div class="mb-6">
      <NuxtLink 
        to="/forms" 
        class="text-blue-500 hover:underline"
      >
        ← Volver a formularios
      </NuxtLink>
    </div>

    <div v-if="form">
      <div v-if="form.responses.length" class="overflow-x-auto">
        <table class="min-w-full bg-white border">
          <thead>
            <tr>
              <th 
                v-for="(question, index) in form.questions" 
                :key="question.id" 
                class="border p-2 text-left bg-gray-50"
              >
                Pregunta {{ index + 1 }}<br>
                <span class="text-sm font-normal">{{ question.text }}</span>
              </th>
            </tr>
          </thead>
     <tbody>
  <tr v-for="(response, rIndex) in form.responses" :key="rIndex">
    <td 
      v-for="question in form.questions" 
      :key="question.id" 
      class="border p-2"
    >
      {{ response.answers[question.id] || '-' }}
    </td>
  </tr>
</tbody>
        </table>
      </div>
      
      <div v-else class="text-center py-8">
        <p class="text-gray-500">No hay respuestas aún</p>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-red-500">Formulario no encontrado</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFormStore } from '~/stores/form';
import type { Form } from '~/stores/form';

const route = useRoute();
const formStore = useFormStore();

const form = computed(() => {
  const formId = Number(route.params.id);
  return formStore.forms.find(f => f.id === formId) || null;
});
</script>