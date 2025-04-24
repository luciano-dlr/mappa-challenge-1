// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],

  components: [
    {
      path: '~/components/form',
      pathPrefix: false,
    },
    {
      path: '~/components/poll',
      pathPrefix: false,
    }
  ],

  compatibilityDate: '2025-04-24'
})