import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import SingUpPage from '@/views/SingUpPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/sing_up',
    name: 'SingUp',
    component: SingUpPage,
  },
]

const router = new VueRouter({
  routes,
})

export default router
