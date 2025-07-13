// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: { enabled: true },
    app: {
      head: {
        title: 'Mi Blog',
        htmlAttrs: {
          lang: 'es',
        },
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ]
      }
    },
    modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils'
  ],
  content: {
   build: {
      markdown: {
        highlight: {
          langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml'],
          // OR
          theme: {
            // Default theme (same as single string)
            default: 'catppuccin-mocha',
            // Theme used if `html.dark`
            dark: 'catppuccin-mocha',
            // Theme used if `html.sepia`
            // sepia: 'min-dark'
          }
        }
      }
    }
  },
  css: [
    '@/assets/css/bulma-no-dark-mode.css',
    '@/assets/css/code-theme.css'
  ]
})