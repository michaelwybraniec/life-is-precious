// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n' // Import the i18n configuration
import './style.css' // Assuming you have global styles here

const app = createApp(App)

app.use(i18n) // Use i18n in the Vue app

app.mount('#app')
