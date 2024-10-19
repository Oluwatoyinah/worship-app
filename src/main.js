import './assets/main.css'
import 'vue-fast-marquee/style.css'
import Marquee from 'vue-fast-marquee'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).use(Marquee).mount('#app')
