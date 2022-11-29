import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AngloView from '../views/AngloView.vue'
import MainView from '../views/MainView.vue'
import AulaView from '../views/AulaView.vue'
import SearchView from '../views/SearchView.vue'
import AgendaView from '../views/AgendaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ROUTE),
  routes: [
    {
      path: '',
      component: HomeView,
      children: [
        {
          path: 'home',
          component: AngloView,
          name: 'home',
          children: [
            {
              path: '',
              component: MainView
            }
          ]
        },
        {
          path: 'aula/:id',
          component: AulaView,
          name: 'Aula',
        },
        {
          path: 'setor/:id',
          component: AulaView,
          name: 'Setor',
        },
        {
          path: 'search',
          component: SearchView
        },
        {
          path: 'agenda',
          component: AgendaView
        }
      ]
    }
  ]
})

export default router
