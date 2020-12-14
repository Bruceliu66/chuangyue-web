import { Module } from 'vuex'

class AppState {
  expand = true
}

const app: Module<AppState, unknown> = {
  namespaced: true,
  state: new AppState(),
  mutations: {
    setExpand (state: AppState, expand: boolean) {
      state.expand = expand
    }
  },
  getters: {},
  actions: {}
}

export default app
