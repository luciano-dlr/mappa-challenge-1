// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],

  components: [
    { path: '~/components/form', prefix: 'Form' },
    { path: '~/components/poll', prefix: 'Poll' }
  ],

  compatibilityDate: '2025-04-24'
})