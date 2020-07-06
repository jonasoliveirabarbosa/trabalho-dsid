import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/HomePage'
import SingUpPage from '@/views/SingUpPage'
import LogInPage from '@/views/LoginPage'
import DashBoardPage from '@/views/DashBoardPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/log_in',
    name: 'LogIn',
    component: LogInPage,
  },
  {
    path: '/sing_up',
    name: 'SingUp',
    component: SingUpPage,
  },
  {
    path: '/dash',
    name: 'DashBoard',
    component: DashBoardPage,
  },
]

const router = new VueRouter({
  routes,
})

export default router
