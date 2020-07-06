import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import vSelect from 'vue-select'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from 'vee-validate'
import ptBr from 'vee-validate/dist/locale/pt_BR'
import VueTheMask from 'vue-the-mask'
import { required, email, min } from 'vee-validate/dist/rules'
import App from './App'
import router from './router'
import store from './store'

Vue.prototype.$http = axios
Vue.config.productionTip = false

localize('pt_BR', ptBr)
extend('required', required)
extend('email', email)
extend('min', min)
extend('futureDate', {
  validate: (value) => {
    const nowDate = moment()
    const testDate = moment(value, 'YYYY-MM-DD')
    return testDate.diff(nowDate) > 0
  },
  message: 'A data precisa estar no futuro',
})

extend('beforeTarget', {
  params: ['target'],
  validate(value, { target }) {
    if (!target) return true
    const testDate = moment(value, 'YYYY-MM-DD')
    const targetDate = moment(target, 'YYYY-MM-DD')
    return targetDate.diff(testDate) > 0
  },
  message: 'A data de partida precisa ser anterior a data de chegada',
})

extend('hasPassanger', {
  params: ['target'],
  validate: (value, { target }) => Number(target) !== 0 || Number(value) !== 0,
  message: 'A data de partida precisa ser anterior a data de chegada',
})

Vue.use(VueTheMask)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.component('v-select', vSelect)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
