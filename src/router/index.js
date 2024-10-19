import { createRouter, createWebHistory } from 'vue-router'
import LyricsPage from '../views/LyricsPage.vue'
import VideoPage from '../views/VideoPage.vue'

const routes = [
  { path: '/lyrics', name: 'Lyrics', component: LyricsPage },
  { path: '/video', name: 'Video', component: VideoPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
