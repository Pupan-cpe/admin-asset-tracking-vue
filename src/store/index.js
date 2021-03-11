import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({

  namespace: true,
  state: {
    drawer: true,
    test_menu: '',
    dataFloor: []
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
    up(state, val) {
      state.test_menu = val;
    },
    upDateDataFlooor(state, val) {
      state.dataFloor = val

    }
  },
  actions: {
    TOGGLE_DRAWER({ commit }) {
      commit('toggleDrawer');
    }
  },
  getters: {
    DRAWER_STATE(state) {
      return state.drawer;
    }
  }
});
