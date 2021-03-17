import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({

  namespace: true,
  state: {
    drawer: true,
    building: '',
    dataFloor: [],
    // data_floor1: [],
    data_floor: [],
    building_id: ''
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },

    building_id(state, val) {
      state.building_id = val;
    },

    up(state, val) {
      state.building = val;
    },

    // api_floor(state, val) {
    //   state.data_floor1 = val;

    // },
    upDateDataFlooor(state, val) {
      state.dataFloor = val
    },
    data_floor(state, val) {
      // console.log("test_data=>from side",val)
      state.data_floor = val
    },
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
