import Vue from 'vue'
import Vuex from 'vuex'
import { namespace } from 'vuex-class'

import app from './modules/app'

Vue.use(Vuex)

export const AppModule = namespace('app')

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    app
  }
})
