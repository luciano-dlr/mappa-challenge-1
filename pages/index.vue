<template>
  <div class="text-center py-12 space-y-6">
    <h1 class="text-3xl font-bold">Bienvenido al Poll and Form Builder</h1>
    <div class="flex justify-center gap-4">
      <NuxtLink 
        to="/polls" 
        class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Ver Encuestas
      </NuxtLink>
      <NuxtLink 
        to="/forms" 
        class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Ver Formularios
      </NuxtLink>
    </div>
  </div>
</template>