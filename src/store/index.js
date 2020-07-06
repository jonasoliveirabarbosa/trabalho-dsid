import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedIda: {},
    selectedVolta: {},
    selectedHotel: {},
    usuario: {},
    isLogOn: false,
  },
  mutations: {
    setIda(state, idaData) {
      state.selectedIda = idaData
    },
    setVolta(state, voltaData) {
      state.selectedVolta = voltaData
    },
    setHotel(state, hotelData) {
      state.selectedHotel = hotelData
    },
    setIsLogOn(state, isLogOn) {
      state.isLogOn = isLogOn
    },
    setUsuario(state, usuario) {
      state.usuario = usuario
    },
  },
  actions: {
  },
  modules: {
  },
})
