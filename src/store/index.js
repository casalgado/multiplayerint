import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: {},
  },
  mutations: {
    updateState(state, payload) {
      state.players = Object.assign({}, payload);
    },
  },
  actions: {
    updateState({ commit }, payload) {
      commit("updateState", payload);
    },
  },
  modules: {},
});
