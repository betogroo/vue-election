/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'
import { pt } from 'vuetify/locale'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  aliases: {
    VBtnAvatar: VBtn,
  },
  defaults: {
    VBtnAvatar: {
      class: ['rounded-xl', 'text-none', 'pa-2', 'v-btn--avatar'],
      color: 'black',
      variant: 'flat',
    },
    VTextField: {
      variant: 'outlined',
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
  locale: {
    locale: 'pt',
    messages: { pt },
  },
})
