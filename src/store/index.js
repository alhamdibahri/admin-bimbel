import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/auth'
import VuexPersist from 'vuex-persist'


const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    setPrevUrl: ''
  },
  mutations: {
    setPrevUrl: (state, value) => {
      state.prevUrl = value
    },
    toggleSidebarDesktop (state) {
      const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile (state) {
      const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set (state, [variable, value]) {
      state[variable] = value
    }
  },
  actions: {
    setPrevUrl: ({commit}, value) => {
      commit('setPrevUrl', value)
    },
  },
  getters:{
    prevUrl: state => state.prevUrl,
  },
  modules: {
    auth
  }
})
